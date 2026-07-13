import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, ShieldAlert, Heart, MessageSquare, Search, Filter, 
  Trash2, Calendar, User, Mail, Phone, Info, RefreshCw, 
  CheckCircle2, AlertTriangle, Lock, Unlock, TrendingUp, DollarSign, ExternalLink
} from 'lucide-react';
import { Language } from '../types';
import { db } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { mockCampaigns } from '../data';

interface AdminDashboardProps {
  language: Language;
}

interface ContactEntry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: any;
  status?: string;
}

interface ContributionEntry {
  id: string;
  name: string;
  email: string;
  phone: string;
  reason: string;
  paymentMethod: string;
  isDiaspora: boolean;
  selectedCampaignId: string;
  transactionId: string;
  receiptFileName: string | null;
  timestamp: any;
  status?: string; // 'pending' | 'verified' | 'rejected'
}

export default function AdminDashboard({ language }: AdminDashboardProps) {
  // Simple Branch authorization credentials check
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Live collections state
  const [contacts, setContacts] = useState<ContactEntry[]>([]);
  const [contributions, setContributions] = useState<ContributionEntry[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [loadingContributions, setLoadingContributions] = useState(true);
  
  // Filtering & searching state
  const [activeSubTab, setActiveSubTab] = useState<'contributions' | 'contacts'>('contributions');
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [campaignFilter, setCampaignFilter] = useState('all');

  // Modal detail display
  const [selectedContribution, setSelectedContribution] = useState<ContributionEntry | null>(null);
  const [selectedContact, setSelectedContact] = useState<ContactEntry | null>(null);

  // Authenticate Admin access using a simple local branch passcode
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.toLowerCase() === 'adama2026' || passcode === '1234') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError(
        language === 'om' 
          ? 'Sabaaba/Koodiin galchitan sirrii miti. Maaloo (1234) yaalaa.' 
          : language === 'am' 
            ? 'ያስገቡት የይለፍ ቃል የተሳሳተ ነው። እባክዎ "1234" ን ይሞክሩ።' 
            : 'Incorrect authorization passcode. Try "1234" or "adama2026".'
      );
    }
  };

  // Listen to live database snapshot updates for contacts
  useEffect(() => {
    if (!isAuthenticated) return;

    setLoadingContacts(true);
    const q = query(collection(db, 'contacts'), orderBy('timestamp', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: ContactEntry[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        items.push({
          id: doc.id,
          name: data.name || '',
          email: data.email || '',
          subject: data.subject || '',
          message: data.message || '',
          timestamp: data.timestamp,
          status: data.status || 'unread'
        });
      });
      setContacts(items);
      setLoadingContacts(false);
    }, (error) => {
      console.error("Firestore contacts subscription error: ", error);
      setLoadingContacts(false);
    });

    return () => unsubscribe();
  }, [isAuthenticated]);

  // Listen to live database snapshot updates for contributions
  useEffect(() => {
    if (!isAuthenticated) return;

    setLoadingContributions(true);
    const q = query(collection(db, 'contributions'), orderBy('timestamp', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: ContributionEntry[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        items.push({
          id: doc.id,
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          reason: data.reason || '',
          paymentMethod: data.paymentMethod || '',
          isDiaspora: !!data.isDiaspora,
          selectedCampaignId: data.selectedCampaignId || '',
          transactionId: data.transactionId || '',
          receiptFileName: data.receiptFileName || null,
          timestamp: data.timestamp,
          status: data.status || 'pending'
        });
      });
      setContributions(items);
      setLoadingContributions(false);
    }, (error) => {
      console.error("Firestore contributions subscription error: ", error);
      setLoadingContributions(false);
    });

    return () => unsubscribe();
  }, [isAuthenticated]);

  // Handle entry delete
  const handleDeleteEntry = async (collectionName: 'contacts' | 'contributions', id: string) => {
    if (window.confirm(language === 'om' ? 'Galmee kana haquu ni barbaadduu?' : 'Are you sure you want to delete this record from the database?')) {
      try {
        await deleteDoc(doc(db, collectionName, id));
        if (collectionName === 'contacts' && selectedContact?.id === id) setSelectedContact(null);
        if (collectionName === 'contributions' && selectedContribution?.id === id) setSelectedContribution(null);
      } catch (err) {
        alert("Failed to delete record: " + err);
      }
    }
  };

  // Update contribution status (verify/reject)
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'contributions', id), { status: newStatus });
      if (selectedContribution && selectedContribution.id === id) {
        setSelectedContribution(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (err) {
      alert("Failed to update status: " + err);
    }
  };

  // Format firestore timestamps elegantly
  const formatTimestamp = (ts: any) => {
    if (!ts) return 'Just now';
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter lists based on search & filter fields
  const filteredContributions = contributions.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm) ||
      item.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reason.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesPayment = paymentFilter === 'all' || item.paymentMethod === paymentFilter;
    const matchesCampaign = campaignFilter === 'all' || item.selectedCampaignId === campaignFilter;

    return matchesSearch && matchesPayment && matchesCampaign;
  });

  const filteredContacts = contacts.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.message.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  // Calculate high level stats from live data
  const totalDiaspora = contributions.filter(c => c.isDiaspora).length;
  const verifiedCount = contributions.filter(c => c.status === 'verified').length;

  return (
    <section className="bg-gradient-to-br from-white via-emerald-50/15 to-white py-12 md:py-16 shadow-[0_0_50px_rgba(16,185,129,0.05)_inset]" id="admin-portal-dashboard">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
        
        {/* Module Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-block px-3.5 py-1.5 rounded-full bg-white border border-emerald-100 text-[#054823] text-xs font-bold uppercase tracking-widest">
            <span className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 animate-pulse" />
              <span>{language === 'om' ? 'Hordoffii Fandii & Ergaa' : language === 'am' ? 'የዳታቤዝ ቁጥጥር ማዕከል' : 'Live Database Hub'}</span>
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#054823] tracking-tight font-sans">
            {language === 'om' ? 'Koreen Bulchiinsa Fandii Adamaa' : language === 'am' ? 'የቅርንጫፉ የዳታቤዝ እና የፋይናንስ ቁጥጥር' : 'Administrative Database & Submissions Terminal'}
          </h2>
          <p className="text-sm text-gray-650 font-medium max-w-xl mx-auto">
            {language === 'om' ? 'Odeeffannoo gumaachitootaa fi ergaa namootaa haala dhiyootiin fi iftoominaan to\'achuuf qophaaye.' : 
             language === 'am' ? 'ወደ ቅርንጫፉ የገቡ የገንዘብ ድጋፎችን እና መልዕክቶችን በቅጽበት መከታተያ እና ማረጋገጫ መስሪያ መድረክ።' : 
             'Secure operational monitoring of community-contributed funds and direct message queues with real-time Firestore synchronization.'}
          </p>
        </div>

        {/* IF NOT AUTHENTICATED: Show a beautiful cultural secure lock */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto bg-white rounded-3xl border border-emerald-100 p-8 text-center space-y-6 shadow-md">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto text-emerald-800">
              <Lock className="w-8 h-8 animate-pulse" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-emerald-950 uppercase tracking-wide">
                {language === 'om' ? 'Sguraansii Kora Adamaa' : 'Administrative Gatekeeper'}
              </h3>
              <p className="text-xs text-gray-500 font-bold uppercase leading-relaxed">
                {language === 'om' ? 'Lakkofsa iccitii bulchiinsaa galchaa' : language === 'am' ? 'የአዳማ ቅርንጫፍ ቁልፍ ያስገቡ' : 'Access Restricted to Adama Branch Administrators'}
              </p>
              <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100/60 text-[11px] text-emerald-900 font-bold leading-relaxed text-left">
                💡 <strong>Development Preview:</strong> Enter the branch demo passcode <strong>1234</strong> or <strong>adama2026</strong> to unlock and explore live database entries.
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-emerald-950 uppercase tracking-wider">
                  {language === 'om' ? 'Koodii Dabarsaa (Passcode)' : 'Branch Code / PIN'}
                </label>
                <input 
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full text-center tracking-widest font-black text-lg px-4 py-3 rounded-xl border border-emerald-150 focus:outline-[1.5px] focus:outline-emerald-600 bg-emerald-50/10 placeholder-gray-300"
                  placeholder="•••••"
                  autoFocus
                />
                {authError && <p className="text-[10px] text-red-500 font-semibold text-center">{authError}</p>}
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#054823] hover:bg-emerald-950 text-white font-extrabold text-xs py-3.5 rounded-xl cursor-pointer uppercase tracking-widest transition-all shadow-md"
              >
                <Unlock className="w-4 h-4" />
                <span>{language === 'om' ? 'Seeni' : language === 'am' ? 'ግባ' : 'Unlock Dashboard'}</span>
              </button>
            </form>
          </div>
        ) : (
          
          /* AUTHENTICATED DATABASE VIEWER SCREEN */
          <div className="space-y-8">
            
            {/* Top Stat Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-xs space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-bold text-[10px] uppercase tracking-wider">Total Contributions</span>
                  <div className="p-2 bg-emerald-50 rounded-lg text-emerald-700">
                    <Heart className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-emerald-950">{contributions.length}</span>
                  <span className="text-[10px] text-emerald-600 font-extrabold bg-emerald-50 px-2 py-0.5 rounded uppercase">Live</span>
                </div>
                <p className="text-[10.5px] text-gray-400 font-semibold">Solidarity sponsor records</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-xs space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-bold text-[10px] uppercase tracking-wider">Inquiries Received</span>
                  <div className="p-2 bg-emerald-50 rounded-lg text-emerald-700">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-emerald-950">{contacts.length}</span>
                  <span className="text-[10px] text-emerald-600 font-extrabold bg-emerald-50 px-2 py-0.5 rounded uppercase">Live</span>
                </div>
                <p className="text-[10.5px] text-gray-400 font-semibold">General customer inquiries</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-xs space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-bold text-[10px] uppercase tracking-wider">Diaspora Mobilization</span>
                  <div className="p-2 bg-indigo-50 rounded-lg text-indigo-700">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-indigo-950">{totalDiaspora}</span>
                  <span className="text-[10px] text-indigo-600 font-extrabold bg-indigo-50 px-2 py-0.5 rounded uppercase">Global</span>
                </div>
                <p className="text-[10.5px] text-gray-400 font-semibold">Diaspora solidarity backers</p>
              </div>

              <div className="bg-[#054823] p-6 rounded-2xl text-white shadow-md space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-emerald-350 font-bold text-[10px] uppercase tracking-wider">Verification Complete</span>
                  <div className="p-2 bg-white/10 rounded-lg text-emerald-300">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-white">{verifiedCount}</span>
                  <span className="text-[10px] text-emerald-300 font-extrabold bg-white/10 px-2 py-0.5 rounded uppercase">OK</span>
                </div>
                <p className="text-[10.5px] text-emerald-200/80 font-semibold">Receipts cleared by administrators</p>
              </div>

            </div>

            {/* Main view frame with controls & database listings */}
            <div className="bg-white rounded-3xl border border-emerald-100 shadow-xs overflow-hidden">
              
              {/* Dashboard SubTab header switcher */}
              <div className="flex border-b border-emerald-100 bg-emerald-50/25 p-2 gap-2">
                <button
                  onClick={() => { setActiveSubTab('contributions'); setSearchTerm(''); }}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeSubTab === 'contributions' 
                      ? 'bg-white text-[#054823] shadow-xs border border-emerald-100 font-black' 
                      : 'text-gray-500 hover:text-[#054823]'
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  <span>Solidarity Contributions ({filteredContributions.length})</span>
                </button>
                <button
                  onClick={() => { setActiveSubTab('contacts'); setSearchTerm(''); }}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeSubTab === 'contacts' 
                      ? 'bg-white text-[#054823] shadow-xs border border-emerald-100 font-black' 
                      : 'text-gray-500 hover:text-[#054823]'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Contact Inquiries ({filteredContacts.length})</span>
                </button>
              </div>

              {/* Dynamic search & filtration deck */}
              <div className="p-6 border-b border-emerald-50 flex flex-col md:flex-row gap-4 items-center justify-between">
                
                {/* Search bar */}
                <div className="relative w-full md:max-w-md">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-emerald-100 text-xs font-semibold focus:outline-emerald-500 bg-emerald-50/10 placeholder-gray-400"
                    placeholder={
                      activeSubTab === 'contributions' 
                        ? "Search by sponsor name, email, txn ID..." 
                        : "Search by inquirer name, email, subject..."
                    }
                  />
                </div>

                {/* Filters for contributions */}
                {activeSubTab === 'contributions' && (
                  <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase">
                      <Filter className="w-3.5 h-3.5" />
                      <span>Filters:</span>
                    </div>

                    <select
                      value={paymentFilter}
                      onChange={(e) => setPaymentFilter(e.target.value)}
                      className="border border-emerald-100 text-[11px] font-bold uppercase tracking-wide bg-white px-3 py-2 rounded-xl text-emerald-950 focus:outline-none"
                    >
                      <option value="all">All Channels</option>
                      <option value="cbe">CBE Direct</option>
                      <option value="sinqe">Siinqee Bank</option>
                      <option value="cbe_birr">CBE Birr</option>
                      <option value="telebirr">Telebirr</option>
                      <option value="paypal">PayPal Gateway</option>
                    </select>

                    <select
                      value={campaignFilter}
                      onChange={(e) => setCampaignFilter(e.target.value)}
                      className="border border-emerald-100 text-[11px] font-bold uppercase tracking-wide bg-white px-3 py-2 rounded-xl text-emerald-950 max-w-[180px] truncate focus:outline-none"
                    >
                      <option value="all">All Campaigns</option>
                      {mockCampaigns.map(camp => (
                        <option key={camp.id} value={camp.id}>{camp.title[language]}</option>
                      ))}
                    </select>
                  </div>
                )}

              </div>

              {/* LIST VIEWS */}
              <div className="p-6">
                
                {/* 1. CONTRIBUTIONS TABLE/LIST */}
                {activeSubTab === 'contributions' && (
                  <div className="overflow-x-auto">
                    {loadingContributions ? (
                      <div className="py-12 text-center text-gray-400 space-y-2">
                        <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#054823]" />
                        <p className="text-xs font-bold uppercase tracking-widest">Loading contributions from Firestore...</p>
                      </div>
                    ) : filteredContributions.length === 0 ? (
                      <div className="py-12 text-center text-gray-400">
                        <AlertTriangle className="w-8 h-8 mx-auto text-amber-500 mb-2" />
                        <p className="text-xs font-bold uppercase tracking-widest">No contributions found matching search filters.</p>
                      </div>
                    ) : (
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-emerald-100 text-[10px] font-extrabold uppercase tracking-widest text-gray-400">
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4">Backer / Contact</th>
                            <th className="py-3 px-4">Target Priority</th>
                            <th className="py-3 px-4">Transaction Details</th>
                            <th className="py-3 px-4 text-center">Status</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-emerald-50 text-xs text-slate-800 font-semibold font-sans">
                          {filteredContributions.map((item) => {
                            const camp = mockCampaigns.find(c => c.id === item.selectedCampaignId);
                            return (
                              <tr key={item.id} className="hover:bg-emerald-50/30 transition-colors">
                                <td className="py-4 px-4 whitespace-nowrap text-gray-500">
                                  {formatTimestamp(item.timestamp)}
                                </td>
                                <td className="py-4 px-4">
                                  <div className="font-extrabold text-emerald-950">{item.name}</div>
                                  <div className="text-[10px] text-gray-400 font-medium lowercase">{item.email}</div>
                                  <div className="text-[10px] text-gray-400 font-medium">{item.phone}</div>
                                </td>
                                <td className="py-4 px-4 max-w-[180px] truncate">
                                  <span className="font-bold text-slate-900 block truncate">
                                    {camp ? camp.title[language] : 'General Development'}
                                  </span>
                                  {item.isDiaspora && (
                                    <span className="text-[8px] bg-indigo-50 text-indigo-700 border border-indigo-100 font-extrabold px-1.5 py-0.5 rounded uppercase">
                                      Diaspora Fund
                                    </span>
                                  )}
                                </td>
                                <td className="py-4 px-4">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] font-mono bg-emerald-50 border border-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded uppercase shrink-0">
                                      {item.paymentMethod.toUpperCase()}
                                    </span>
                                    <span className="font-mono font-bold text-gray-700 truncate block max-w-[100px]" title={item.transactionId}>
                                      {item.transactionId}
                                    </span>
                                  </div>
                                  {item.receiptFileName && (
                                    <div className="text-[9px] text-[#054823] mt-1 font-bold flex items-center gap-1">
                                      <span>📎 Receipt:</span>
                                      <span className="truncate max-w-[100px]">{item.receiptFileName}</span>
                                    </div>
                                  )}
                                </td>
                                <td className="py-4 px-4 text-center">
                                  <span className={`inline-block text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md ${
                                    item.status === 'verified' 
                                      ? 'bg-emerald-100 text-emerald-800' 
                                      : item.status === 'rejected' 
                                        ? 'bg-red-100 text-red-800' 
                                        : 'bg-amber-100 text-amber-800'
                                  }`}>
                                    {item.status || 'pending'}
                                  </span>
                                </td>
                                <td className="py-4 px-4 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <button
                                      onClick={() => setSelectedContribution(item)}
                                      className="p-1.5 hover:bg-emerald-100 rounded-lg text-emerald-800 transition cursor-pointer"
                                      title="View full detail"
                                    >
                                      <Info className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteEntry('contributions', item.id)}
                                      className="p-1.5 hover:bg-red-50 rounded-lg text-red-600 transition cursor-pointer"
                                      title="Delete record"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}

                {/* 2. CONTACTS TABLE/LIST */}
                {activeSubTab === 'contacts' && (
                  <div className="overflow-x-auto">
                    {loadingContacts ? (
                      <div className="py-12 text-center text-gray-400 space-y-2">
                        <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#054823]" />
                        <p className="text-xs font-bold uppercase tracking-widest">Loading messages from Firestore...</p>
                      </div>
                    ) : filteredContacts.length === 0 ? (
                      <div className="py-12 text-center text-gray-400">
                        <AlertTriangle className="w-8 h-8 mx-auto text-amber-500 mb-2" />
                        <p className="text-xs font-bold uppercase tracking-widest">No inquiry messages found in the database.</p>
                      </div>
                    ) : (
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-emerald-100 text-[10px] font-extrabold uppercase tracking-widest text-gray-400">
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4">Sender Contact</th>
                            <th className="py-3 px-4">Subject</th>
                            <th className="py-3 px-4">Inquiry Excerpt</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-emerald-50 text-xs text-slate-800 font-semibold font-sans">
                          {filteredContacts.map((item) => (
                            <tr key={item.id} className="hover:bg-emerald-50/30 transition-colors">
                              <td className="py-4 px-4 whitespace-nowrap text-gray-500">
                                {formatTimestamp(item.timestamp)}
                              </td>
                              <td className="py-4 px-4">
                                <div className="font-extrabold text-[#054823]">{item.name}</div>
                                <div className="text-[10px] text-gray-400 lowercase font-medium">{item.email}</div>
                              </td>
                              <td className="py-4 px-4 font-bold text-emerald-950 max-w-[150px] truncate" title={item.subject}>
                                {item.subject}
                              </td>
                              <td className="py-4 px-4 max-w-[280px] truncate text-gray-600 font-normal italic" title={item.message}>
                                "{item.message}"
                              </td>
                              <td className="py-4 px-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => setSelectedContact(item)}
                                    className="p-1.5 hover:bg-emerald-100 rounded-lg text-emerald-800 transition cursor-pointer"
                                    title="Read message"
                                  >
                                    <Info className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteEntry('contacts', item.id)}
                                    className="p-1.5 hover:bg-red-50 rounded-lg text-red-600 transition cursor-pointer"
                                    title="Delete inquiry"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}

              </div>

            </div>

            {/* DETAIL MODAL OVERLAYS */}
            <AnimatePresence>
              
              {/* Contribution detail modal */}
              {selectedContribution && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
                  <motion.div
                    className="bg-white rounded-3xl border border-emerald-100 max-w-lg w-full overflow-hidden shadow-2xl text-left"
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  >
                    <div className="p-6 bg-emerald-950 text-white flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-emerald-300 animate-pulse" />
                        <h4 className="font-extrabold uppercase tracking-widest text-xs">Solidarity Contribution Record</h4>
                      </div>
                      <button 
                        onClick={() => setSelectedContribution(null)}
                        className="text-white/75 hover:text-white font-bold bg-white/10 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="p-6 space-y-6 text-xs text-slate-800 font-semibold font-sans">
                      
                      <div className="grid grid-cols-2 gap-4 border-b border-emerald-50 pb-4">
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase font-bold block">Contributor Fullname</span>
                          <span className="text-sm font-black text-emerald-950">{selectedContribution.name}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase font-bold block">Timestamp</span>
                          <span className="text-gray-700 block">{formatTimestamp(selectedContribution.timestamp)}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 border-b border-emerald-50 pb-4">
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase font-bold block">Email Address</span>
                          <span className="text-gray-700 block select-all">{selectedContribution.email}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase font-bold block">Mobile Phone</span>
                          <span className="text-gray-700 block select-all">{selectedContribution.phone}</span>
                        </div>
                      </div>

                      <div className="border-b border-emerald-50 pb-4">
                        <span className="text-[10px] text-gray-400 uppercase font-bold block">Campaign Purpose</span>
                        <span className="text-gray-800 font-bold">
                          {mockCampaigns.find(c => c.id === selectedContribution.selectedCampaignId)?.title[language] || 'General Development Funds'}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 border-b border-emerald-50 pb-4 bg-emerald-50/20 p-3 rounded-xl border border-emerald-100">
                        <div>
                          <span className="text-[10px] text-emerald-800 uppercase font-bold block">Transaction Code</span>
                          <span className="font-mono text-sm font-black text-emerald-950 select-all">{selectedContribution.transactionId}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-emerald-800 uppercase font-bold block">Routing Gateway</span>
                          <span className="font-bold text-emerald-900 block uppercase">{selectedContribution.paymentMethod.replace('_', ' ')}</span>
                        </div>
                      </div>

                      {selectedContribution.receiptFileName && (
                        <div className="border-b border-emerald-50 pb-4">
                          <span className="text-[10px] text-gray-400 uppercase font-bold block">Uploaded Receipt Filename</span>
                          <span className="text-gray-700 block italic">📎 {selectedContribution.receiptFileName}</span>
                        </div>
                      )}

                      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">Solidarity Motivation Reason</span>
                        <p className="text-slate-800 leading-relaxed font-normal mt-1">"{selectedContribution.reason}"</p>
                      </div>

                      {/* Admin Decision actions */}
                      <div className="flex gap-3 justify-between items-center pt-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateStatus(selectedContribution.id, 'verified')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[10px] uppercase tracking-wider px-4 py-2.5 rounded-xl cursor-pointer transition-all shadow-xs"
                          >
                            Verify Receipt
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(selectedContribution.id, 'rejected')}
                            className="border border-red-200 hover:bg-red-55 text-red-600 font-extrabold text-[10px] uppercase tracking-wider px-4 py-2.5 rounded-xl cursor-pointer transition-all"
                          >
                            Mark Invalid
                          </button>
                        </div>

                        <button
                          onClick={() => handleDeleteEntry('contributions', selectedContribution.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2.5 rounded-xl cursor-pointer transition-all"
                          title="Permanent Delete"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>

                    </div>
                  </motion.div>
                </div>
              )}

              {/* Contact Inquiry detail modal */}
              {selectedContact && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
                  <motion.div
                    className="bg-white rounded-3xl border border-emerald-100 max-w-lg w-full overflow-hidden shadow-2xl text-left"
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  >
                    <div className="p-6 bg-emerald-950 text-white flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-emerald-300" />
                        <h4 className="font-extrabold uppercase tracking-widest text-xs">Customer Message Viewer</h4>
                      </div>
                      <button 
                        onClick={() => setSelectedContact(null)}
                        className="text-white/75 hover:text-white font-bold bg-white/10 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="p-6 space-y-6 text-xs text-slate-800 font-semibold font-sans">
                      
                      <div className="grid grid-cols-2 gap-4 border-b border-emerald-50 pb-4">
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase font-bold block">Sender Name</span>
                          <span className="text-sm font-black text-emerald-950">{selectedContact.name}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase font-bold block">Sent Time</span>
                          <span className="text-gray-700 block">{formatTimestamp(selectedContact.timestamp)}</span>
                        </div>
                      </div>

                      <div className="border-b border-emerald-50 pb-4">
                        <span className="text-[10px] text-gray-400 uppercase font-bold block">Email Contact</span>
                        <span className="text-gray-800 font-extrabold text-sm select-all lowercase">{selectedContact.email}</span>
                      </div>

                      <div className="border-b border-emerald-50 pb-4">
                        <span className="text-[10px] text-gray-400 uppercase font-bold block">Subject Topic</span>
                        <span className="text-gray-800 text-sm font-black">{selectedContact.subject}</span>
                      </div>

                      <div className="bg-emerald-50/20 p-4 rounded-xl border border-emerald-100 text-gray-800 font-normal leading-relaxed text-sm">
                        <span className="text-[10px] text-emerald-800 font-bold block uppercase tracking-wider mb-1.5">Inquiry Message description</span>
                        "{selectedContact.message}"
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <span className="text-[9.5px] text-emerald-600 font-bold uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-md">
                          Verified Safe Storage
                        </span>

                        <button
                          onClick={() => handleDeleteEntry('contacts', selectedContact.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2.5 rounded-xl cursor-pointer transition-all flex items-center gap-1.5 font-extrabold uppercase tracking-wider text-[10px]"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete inquiry</span>
                        </button>
                      </div>

                    </div>
                  </motion.div>
                </div>
              )}

            </AnimatePresence>

          </div>
        )}

      </div>
    </section>
  );
}
