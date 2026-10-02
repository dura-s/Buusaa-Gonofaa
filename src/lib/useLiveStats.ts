import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import { mockCampaigns } from '../data';
import { DonationCamp, Giver } from '../types';

export interface ActivityItem {
  id: string;
  type: 'contribution' | 'contact';
  name: string;
  detail: string;
  amount?: number;
  dateStr: string;
  rawDate: number;
}

export interface LiveStatsData {
  contributionsCount: number;
  contactsCount: number;
  totalLiveRecords: number;
  totalContributionsEtb: number;
  agriContributionsCount: number;
  womenContributionsCount: number;

  activeMembersFormatted: string;
  activeMembersRaw: number;

  activeFarmsFormatted: string;
  activeFarmsRaw: number;

  womenEntrepreneursFormatted: string;
  womenEntrepreneursRaw: number;

  emergencyDisbursementsFormatted: string;
  emergencyDisbursementsMillion: string;
  emergencyDisbursementsRaw: number;

  campaigns: DonationCamp[];
  recentActivities: ActivityItem[];
  loading: boolean;
  error: string | null;
}

// All metrics start from zero and read directly from Firestore database
const BASE_ACTIVE_MEMBERS = 0;
const BASE_ACTIVE_FARMS = 0;
const BASE_WOMEN_ENTERPRISES = 0;
const BASE_DISBURSEMENTS_ETB = 0;

export function useLiveStats(): LiveStatsData {
  const [contributions, setContributions] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 1. Real-time listener for Contributions collection
    const unsubContributions = onSnapshot(
      collection(db, 'contributions'),
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setContributions(items);
        setLoading(false);
      },
      (err) => {
        console.error('Error listening to contributions:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    // 2. Real-time listener for Contacts collection
    const unsubContacts = onSnapshot(
      collection(db, 'contacts'),
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setContacts(items);
      },
      (err) => {
        console.error('Error listening to contacts:', err);
      }
    );

    return () => {
      unsubContributions();
      unsubContacts();
    };
  }, []);

  // Compute live contribution metrics
  const contributionsCount = contributions.length;
  const contactsCount = contacts.length;
  const totalLiveRecords = contributionsCount + contactsCount;

  // Total ETB paid out / collected from real contributions
  const totalContributionsEtb = contributions.reduce((sum, item) => {
    const val = Number(item.amount);
    return sum + (isNaN(val) ? 0 : val);
  }, 0);

  // Subsidized agricultural units based on agricultural campaigns (e.g. c1) or general count
  const agriContributionsCount = contributions.filter(
    (item) => item.selectedCampaignId === 'c1' || (item.reason && /qonna|farm|crop|seed|midhaan/i.test(item.reason))
  ).length;

  // Women-led enterprise & social protection units based on c2 or general count
  const womenContributionsCount = contributions.filter(
    (item) => item.selectedCampaignId === 'c2' || (item.reason && /dubart|women|family|fayyaa/i.test(item.reason))
  ).length;

  // Scaled live totals starting strictly from zero
  const activeMembersRaw = BASE_ACTIVE_MEMBERS + totalLiveRecords;
  const activeMembersFormatted = activeMembersRaw.toLocaleString();

  const activeFarmsRaw = BASE_ACTIVE_FARMS + agriContributionsCount;
  const activeFarmsFormatted = activeFarmsRaw.toLocaleString();

  const womenEntrepreneursRaw = BASE_WOMEN_ENTERPRISES + womenContributionsCount;
  const womenEntrepreneursFormatted = womenEntrepreneursRaw.toLocaleString();

  const emergencyDisbursementsRaw = BASE_DISBURSEMENTS_ETB + totalContributionsEtb;
  const emergencyDisbursementsFormatted = emergencyDisbursementsRaw.toLocaleString() + ' ETB';
  const emergencyDisbursementsMillion = emergencyDisbursementsRaw >= 1000000
    ? (emergencyDisbursementsRaw / 1000000).toFixed(2) + ' Million ETB'
    : emergencyDisbursementsRaw.toLocaleString() + ' ETB';

  // Build unified recent activities feed (contributions + contacts)
  const recentActivities: ActivityItem[] = [];

  contributions.forEach((c) => {
    let rawDate = 0;
    let dateStr = 'Recently';
    if (c.timestamp?.seconds) {
      rawDate = c.timestamp.seconds * 1000;
      dateStr = new Date(rawDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
    const amt = Number(c.amount) || 0;
    recentActivities.push({
      id: c.id,
      type: 'contribution',
      name: c.name || 'Anonymous Contributor',
      detail: amt > 0 ? `${amt.toLocaleString()} ETB contribution` : 'Relief solidarity contribution',
      amount: amt,
      dateStr,
      rawDate
    });
  });

  contacts.forEach((ct) => {
    let rawDate = 0;
    let dateStr = 'Recently';
    if (ct.timestamp?.seconds) {
      rawDate = ct.timestamp.seconds * 1000;
      dateStr = new Date(rawDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
    recentActivities.push({
      id: ct.id,
      type: 'contact',
      name: ct.name || 'Community Member',
      detail: ct.subject ? `Inquiry: ${ct.subject}` : 'Contacted branch administration',
      dateStr,
      rawDate
    });
  });

  // Sort activities newest first
  recentActivities.sort((a, b) => b.rawDate - a.rawDate);

  // Compute live campaigns connected to Firestore database starting from zero
  const liveCampaigns: DonationCamp[] = mockCampaigns.map((baseCamp) => {
    // Collect real contributions for this specific campaign from Firestore
    const campContributions = contributions.filter((c) => {
      if (c.selectedCampaignId) {
        return c.selectedCampaignId === baseCamp.id;
      }
      return baseCamp.id === 'c1'; // Default first campaign if untagged
    });

    const raisedAmount = campContributions.reduce((sum, c) => {
      const val = Number(c.amount);
      return sum + (isNaN(val) ? 0 : val);
    }, 0);

    const contributorsCount = campContributions.length;

    // Build real verified givers list from Firestore contributions
    const givers: Giver[] = campContributions
      .map((c) => {
        let dateStr = new Date().toISOString().split('T')[0];
        let timestampMs = 0;
        if (c.timestamp?.seconds) {
          timestampMs = c.timestamp.seconds * 1000;
          dateStr = new Date(timestampMs).toISOString().split('T')[0];
        }
        return {
          id: c.id,
          name: c.name || 'Anonymous Contributor',
          isAnonymous: !c.name,
          amount: Number(c.amount) || 0,
          date: dateStr,
          paymentMethod: c.paymentMethod || 'cbe',
          _rawTime: timestampMs
        };
      })
      .sort((a, b) => b._rawTime - a._rawTime)
      .map(({ _rawTime, ...g }) => g);

    return {
      ...baseCamp,
      raisedAmount,
      contributorsCount,
      givers
    };
  });

  return {
    contributionsCount,
    contactsCount,
    totalLiveRecords,
    totalContributionsEtb,
    agriContributionsCount,
    womenContributionsCount,

    activeMembersFormatted,
    activeMembersRaw,

    activeFarmsFormatted,
    activeFarmsRaw,

    womenEntrepreneursFormatted,
    womenEntrepreneursRaw,

    emergencyDisbursementsFormatted,
    emergencyDisbursementsMillion,
    emergencyDisbursementsRaw,

    campaigns: liveCampaigns,
    recentActivities: recentActivities.slice(0, 10),
    loading,
    error
  };
}
