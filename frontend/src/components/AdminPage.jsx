import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import PageLoader from './PageLoader';

export default function AdminPage({ onNavigate }) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Dashboard Metrics State
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [subscribersCount, setSubscribersCount] = useState(0);
  const [subscribersList, setSubscribersList] = useState([]);
  const [isFetchingStats, setIsFetchingStats] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState('');

  // Check if admin is already signed in on initial mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
      if (
        session?.user?.email &&
        adminEmail &&
        session.user.email.toLowerCase() === adminEmail.toLowerCase()
      ) {
        setIsAuthenticated(true);
      }
    });
  }, []);

  // Supabase Auth Sign In
  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: import.meta.env.VITE_ADMIN_EMAIL,
      password: passwordInput,
    });
    setIsLoading(false);
    if (error) {
      setAuthError('Invalid Admin Password. Access Denied.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
    } else {
      setIsAuthenticated(true);
    }
  };

  // Sign out handler
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setPasswordInput('');
    setAuthError('');
  };

  // Fetch Dashboard Statistics
  const fetchDashboardStats = async () => {
    setIsFetchingStats(true);
    try {
      const [usersRes, subsRes] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase
          .from('newsletter_subscribers')
          .select('email, subscribed_at', { count: 'exact' })
          .order('subscribed_at', { ascending: false }),
      ]);

      if (usersRes.count !== null && usersRes.count !== undefined) {
        setTotalUsersCount(usersRes.count);
      }
      if (subsRes.count !== null && subsRes.count !== undefined) {
        setSubscribersCount(subsRes.count);
      }
      if (subsRes.data) {
        setSubscribersList(subsRes.data);
      }
    } catch (err) {
      console.error('Error fetching admin statistics:', err);
    } finally {
      setIsFetchingStats(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardStats();
    }
  }, [isAuthenticated]);

  // Copy all newsletter subscriber emails to clipboard
  const handleCopyAllEmails = async () => {
    if (!subscribersList || subscribersList.length === 0) return;
    const allEmails = subscribersList
      .map((s) => s.email)
      .filter(Boolean)
      .join(', ');

    try {
      await navigator.clipboard.writeText(allEmails);
      setCopyFeedback('All emails copied to clipboard!');
      setTimeout(() => setCopyFeedback(''), 3000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  // Helper date formatter
  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      return new Date(dateStr).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  // =========================================================================
  // VIEW 1: PASSWORD LOCK GATE
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0806] text-[#FAF4EE] flex items-center justify-center p-4 font-sans selection:bg-[#C9AA6B]/30 selection:text-[#FAF4EE] relative overflow-hidden">
        <PageLoader isVisible={isLoading} />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#C9AA6B]/5 rounded-full blur-[140px] pointer-events-none" />

        <div
          className={`w-full max-w-[430px] p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#16120F] to-[#0E0B09] border border-[#2E231A] shadow-2xl relative z-10 transition-transform ${
            isShaking ? 'animate-shake' : ''
          }`}
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#1F1914] border border-[#C9AA6B]/30 flex items-center justify-center shadow-inner">
              <svg className="w-6 h-6 text-[#C9AA6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>

            <p className="font-sans text-[0.68rem] font-semibold tracking-[0.28em] text-[#C9AA6B] uppercase mb-1">
              Admin Portal
            </p>
            <h1 className="font-cormorant text-2xl sm:text-3xl text-[#FAF4EE] m-0 font-light tracking-wide">
              Ghadsiram Banwarilal
            </h1>
            <p className="text-xs text-[#8A7968] font-light mt-1">
              Enter admin password to access control panel
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  if (authError) setAuthError('');
                }}
                placeholder="Enter Admin Password"
                autoFocus
                className="w-full px-4 py-3.5 pr-11 rounded-xl bg-[#0D0A08] border border-[#2E231A] text-sm text-[#FAF4EE] placeholder-[#665545] outline-none focus:border-[#C9AA6B] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7A6A58] hover:text-[#C9AA6B] transition-colors bg-transparent border-none cursor-pointer p-0 text-xs"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            {authError && (
              <p className="text-xs text-[#E57373] bg-[#E57373]/10 border border-[#E57373]/20 py-2 px-3 rounded-lg m-0 text-center font-light">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#C9AA6B] hover:bg-[#d8bc7e] text-[#0D0A08] text-xs font-semibold uppercase tracking-[0.16em] transition-all cursor-pointer shadow-md mt-1"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('home')}
              className="text-xs text-[#8A7968] hover:text-[#C9AA6B] transition-colors bg-transparent border-none cursor-pointer tracking-wider"
            >
              ← Back to Store
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: AUTHENTICATED ADMIN DASHBOARD
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#0D0A08] text-[#FAF4EE] font-sans selection:bg-[#C9AA6B]/30 selection:text-[#FAF4EE] flex flex-col justify-between">
      <div>
        {/* Header */}
        <header className="border-b border-[#2E231A] bg-[#140F0C]/90 backdrop-blur-md sticky top-0 z-40 px-6 sm:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/flowers.png"
              alt="Ghadsiram Logo"
              className="w-7 h-7 object-contain drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]"
            />
            <div>
              <span className="font-display font-light text-base text-[#FAF4EE] uppercase tracking-[0.12em]">
                Ghadsiram Banwarilal &amp; Sons
              </span>
              <span className="hidden sm:inline-block ml-3 px-2 py-0.5 rounded-full bg-[#C9AA6B]/15 border border-[#C9AA6B]/30 text-[#C9AA6B] text-[0.65rem] font-semibold uppercase tracking-wider">
                Admin Console
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('home')}
              className="text-xs text-[#A69280] hover:text-[#C9AA6B] transition-colors bg-transparent border-none cursor-pointer tracking-wider"
            >
              ← Back to Store
            </button>
            <span className="text-[#2E231A]">|</span>
            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-1.5 rounded-lg border border-red-500/40 hover:border-red-400 text-red-400 hover:bg-red-950/30 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer bg-transparent"
            >
              Log Out
            </button>
          </div>
        </header>

        {/* Dashboard Main Content */}
        <main className="max-w-[1200px] mx-auto px-6 sm:px-10 py-10">
          {/* Top Title & Refresh */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <span className="font-sans text-[0.7rem] font-semibold tracking-[0.24em] text-[#C9AA6B] uppercase">
                Executive Overview
              </span>
              <h1 className="font-display font-light text-3xl sm:text-4xl text-[#FAF4EE] uppercase tracking-wide m-0 mt-1">
                Patron &amp; Subscriber Insights
              </h1>
            </div>

            <button
              type="button"
              onClick={fetchDashboardStats}
              disabled={isFetchingStats}
              className="px-4 py-2 rounded-xl bg-[#140F0C] border border-[#2E231A] hover:border-[#C9AA6B] text-xs text-[#D9C8B4] hover:text-[#FAF4EE] transition-colors cursor-pointer flex items-center gap-2"
            >
              <svg
                className={`w-3.5 h-3.5 text-[#C9AA6B] ${isFetchingStats ? 'animate-spin' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh Data
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Card 1: Total Registered Users */}
            <div className="lg:col-span-1 rounded-3xl bg-[#140F0C] border border-[#2E231A] p-7 sm:p-8 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#1F1914] border border-[#C9AA6B]/30 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-[#C9AA6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>

                <span className="font-sans text-[0.72rem] font-semibold tracking-[0.2em] text-[#A69280] uppercase block mb-1">
                  Patron Base
                </span>
                <h3 className="font-display font-light text-2xl text-[#FAF4EE] uppercase m-0 mb-6">
                  Total Registered Users
                </h3>

                <div className="my-4">
                  <span className="font-display font-light text-5xl sm:text-6xl text-[#FAF4EE] tracking-tight">
                    {totalUsersCount}
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-[#2E231A]/60">
                <p className="text-xs text-[#8A7968] font-light leading-relaxed m-0">
                  Total client profiles registered through Google Authenticated membership.
                </p>
              </div>
            </div>

            {/* Card 2: Newsletter Subscribers */}
            <div className="lg:col-span-2 rounded-3xl bg-[#140F0C] border border-[#2E231A] p-7 sm:p-8 shadow-2xl flex flex-col justify-between">
              <div>
                {/* Header with Title, Count, and Copy Button */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-[#2E231A]/60 pb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-sans text-[0.72rem] font-semibold tracking-[0.2em] text-[#A69280] uppercase">
                        The List
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#C9AA6B]/20 text-[#F4E3A1] text-[0.65rem] font-semibold">
                        {subscribersCount} Total
                      </span>
                    </div>
                    <h3 className="font-display font-light text-2xl text-[#FAF4EE] uppercase m-0">
                      Newsletter Subscribers
                    </h3>
                  </div>

                  {/* Copy All Emails Button */}
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    {copyFeedback && (
                      <span className="text-[0.72rem] text-[#81C784] font-medium animate-fade-in">
                        {copyFeedback}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={handleCopyAllEmails}
                      disabled={subscribersList.length === 0}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#C9AA6B] hover:bg-[#d8bc7e] text-[#0D0A08] text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-md disabled:opacity-50 flex items-center justify-center gap-2 border-none"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                        />
                      </svg>
                      Copy All Emails
                    </button>
                  </div>
                </div>

                {/* Subscribers List Table */}
                <div className="overflow-hidden rounded-2xl border border-[#2E231A] bg-[#0D0A08]">
                  <div className="max-h-[360px] overflow-y-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="sticky top-0 z-10 bg-[#191410] border-b border-[#2E231A]">
                        <tr className="text-[#C9AA6B] uppercase tracking-wider text-[0.68rem]">
                          <th className="py-3 px-4 font-semibold">Subscriber Email</th>
                          <th className="py-3 px-4 font-semibold text-right">Subscribed Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#2E231A]/60 text-[#D9C8B4]">
                        {subscribersList.length === 0 ? (
                          <tr>
                            <td colSpan="2" className="py-12 text-center text-[#7A6A58] font-light">
                              {isFetchingStats
                                ? 'Fetching newsletter list...'
                                : 'No newsletter subscribers found.'}
                            </td>
                          </tr>
                        ) : (
                          subscribersList.map((sub, idx) => (
                            <tr
                              key={sub.email || idx}
                              className="hover:bg-white/[0.02] transition-colors"
                            >
                              <td className="py-3 px-4 font-light text-[#FAF4EE] break-all">
                                {sub.email}
                              </td>
                              <td className="py-3 px-4 text-right text-[0.72rem] text-[#8A7968] font-light whitespace-nowrap">
                                {formatDate(sub.subscribed_at)}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#2E231A]/40 flex justify-between items-center text-xs text-[#8A7968]">
                <span>Latest subscribers shown first</span>
                <span>{subscribersList.length} records</span>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#2E231A] py-4 px-6 text-center text-xs text-[#5A4C3D] font-light">
        Ghadsiram Banwarilal &amp; Sons © 2026 • Executive Portal
      </footer>
    </div>
  );
}
