import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AddressBook from './AddressBook';
import EditProfileModal from './EditProfileModal';
import { supabase } from '../lib/supabaseClient';

export default function ProfilePage({ onBackToShop, onBackToHome, onNavigate, onCartClick, onLogout }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [profileNotice, setProfileNotice] = useState('');

  const handleBrandClick = () => {
    if (onBackToHome) {
      onBackToHome();
    } else if (onNavigate) {
      onNavigate('home');
    } else {
      window.history.pushState(null, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleShopClick = () => {
    if (onNavigate) {
      onNavigate('shop');
    } else {
      if (onBackToShop) onBackToShop();
      else if (onNavigate) onNavigate('shop');
    }
  };

  const fetchAddresses = React.useCallback(async (userId) => {
    const uid = userId || currentUser?.id;
    if (!uid) return;

    try {
      const { data: addressesData, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', uid)
        .order('is_default', { ascending: false })
        .order('created_at', { ascending: false });

      if (!error && addressesData) {
        setAddresses(addressesData);
      }
    } catch (err) {
      console.error('Error fetching addresses:', err);
    }
  }, [currentUser?.id]);

  const loadUserData = React.useCallback(async () => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        setCurrentUser(null);
        setIsLoading(false);
        return;
      }

      setCurrentUser(user);

      // Fetch profile data from 'profiles' table
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (profileData) {
        setProfile(profileData);
      }

      // Fetch addresses for this user
      await fetchAddresses(user.id);
    } catch (err) {
      console.error('Error loading user profile:', err);
    } finally {
      setIsLoading(false);
    }
  }, [fetchAddresses]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const handleProfileUpdated = (updatedProfile) => {
    setProfile((prev) => ({ ...prev, ...updatedProfile }));
    setProfileNotice('Patron profile updated successfully.');
    setTimeout(() => setProfileNotice(''), 4000);
  };

  // Format member display details
  const displayName = 
    profile?.full_name || 
    currentUser?.user_metadata?.full_name || 
    currentUser?.user_metadata?.name || 
    currentUser?.email?.split('@')[0] || 
    'Esteemed Patron';

  const displayEmail = currentUser?.email || '—';
  
  const displayPhone = 
    profile?.phone ? `+91 ${profile.phone}` : 
    addresses.find(a => a.is_default)?.phone ? `+91 ${addresses.find(a => a.is_default)?.phone}` : 
    addresses[0]?.phone ? `+91 ${addresses[0]?.phone}` : 
    'Not provided';

  const defaultAddrObj = addresses.find(a => a.is_default) || addresses[0];
  const defaultAddressSummary = defaultAddrObj
    ? [
        defaultAddrObj.address_line || defaultAddrObj.address,
        defaultAddrObj.city,
        defaultAddrObj.state ? `${defaultAddrObj.state}${defaultAddrObj.pincode ? ` - ${defaultAddrObj.pincode}` : ''}` : defaultAddrObj.pincode
      ].filter(Boolean).join(', ')
    : 'No saved address';

  const memberSince = currentUser?.created_at
    ? new Date(currentUser.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'Recent Patron';

  // Orders list (Heritage Order History)
  const orders = [];

  return (
    <div className="min-h-screen bg-[#0D0A08] text-[#FAF4EE] flex flex-col justify-between font-sans">
      <Navbar 
        onCartClick={onCartClick} 
        onBookClick={() => {
          if (onNavigate) onNavigate('appointment');
        }} 
        onShopClick={handleShopClick} 
        onBrandClick={handleBrandClick} 
        onNavigate={onNavigate}
        alwaysShowBg={true}
        isLoggedIn={!!currentUser}
        onProfileClick={() => {}}
      />

      <main className="flex-1 w-full max-w-[1050px] mx-auto px-6 md:px-12 pt-36 pb-24">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-28 gap-4">
            <div className="w-10 h-10 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
            <p className="font-cormorant italic text-sm text-[#D4AF37] tracking-wider">
              Curating your private heritage profile...
            </p>
          </div>
        ) : !currentUser ? (
          <div className="bg-[#16120F] border border-[#c89b3c]/20 p-12 text-center max-w-lg mx-auto shadow-2xl">
            <h2 className="font-display font-light text-2xl text-[#FAF4EE] uppercase tracking-wide mb-3">
              Patron Sign In Required
            </h2>
            <p className="font-cormorant italic text-sm text-[#A69280] mb-8 leading-relaxed">
              Please sign in to access your bespoke membership, saved delivery addresses, and curated order archives.
            </p>
            <button
              type="button"
              onClick={() => {
                if (onNavigate) onNavigate('login');
              }}
              className="px-8 py-3 bg-gradient-to-r from-[#D4AF37] via-[#F4E3A1] to-[#C89B3C] text-[#0D0A08] font-sans text-xs font-semibold tracking-widest uppercase transition-all shadow-lg border-none cursor-pointer"
            >
              Sign In with Google
            </button>
          </div>
        ) : (
          <>
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-[#c89b3c]/20 pb-8 mb-12">
              <div>
                <span className="font-sans text-[0.72rem] font-semibold tracking-[0.2em] text-[#D4AF37] uppercase">
                  Your Curated Space
                </span>
                <h1 className="font-display font-light text-3xl md:text-4xl text-[#FAF4EE] tracking-wide m-0 mt-1 uppercase">
                  {displayName}
                </h1>
                <p className="font-cormorant italic text-[1.1rem] text-[#D9C8B4] m-0 mt-1">
                  Royal Gold Elite Member
                </p>
              </div>
              
              <button
                type="button"
                onClick={onLogout}
                className="px-6 py-2.5 border border-red-500/40 hover:border-red-400 text-red-400 hover:bg-red-950/30 font-sans text-xs font-semibold tracking-wider uppercase transition-all duration-300 outline-none cursor-pointer"
              >
                Log Out
              </button>
            </div>

            {/* Profile Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              
              {/* Col 1: Account Information */}
              <div className="lg:col-span-1 flex flex-col gap-6">
                <div className="bg-[#16120F] border border-[#c89b3c]/20 p-6 shadow-xl sticky top-28 flex flex-col gap-4">
                  {/* Card Header with Edit Button */}
                  <div className="flex justify-between items-center border-b border-[#c89b3c]/15 pb-2">
                    <h3 className="font-sans text-xs font-semibold tracking-[0.2em] text-[#D4AF37] uppercase m-0">
                      Membership Details
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsEditProfileOpen(true)}
                      className="text-[0.72rem] font-semibold text-[#D4AF37] hover:text-[#F4E3A1] uppercase tracking-wider bg-transparent border-none p-0 cursor-pointer transition-colors flex items-center gap-1.5"
                    >
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                  </div>

                  {/* Feedback notice if saved */}
                  {profileNotice && (
                    <div className="p-2.5 bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-[0.72rem] font-sans">
                      {profileNotice}
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-4">
                    <div>
                      <span className="block text-[0.7rem] text-[#A69280] uppercase tracking-wider">Email</span>
                      <span className="text-sm font-light text-[#FAF4EE] break-all">{displayEmail}</span>
                    </div>
                    <div>
                      <span className="block text-[0.7rem] text-[#A69280] uppercase tracking-wider">Phone</span>
                      <span className="text-sm font-light text-[#FAF4EE]">{displayPhone}</span>
                    </div>
                    <div>
                      <span className="block text-[0.7rem] text-[#A69280] uppercase tracking-wider">Default Address</span>
                      <span className="text-sm font-light leading-relaxed text-[#D9C8B4]">{defaultAddressSummary}</span>
                    </div>
                    <div>
                      <span className="block text-[0.7rem] text-[#A69280] uppercase tracking-wider">Member Since</span>
                      <span className="text-sm font-light text-[#FAF4EE]">{memberSince}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Col 2 & 3: Delivery Addresses & Order History */}
              <div className="lg:col-span-2 flex flex-col gap-12">
                {/* 1. Delivery Addresses Section */}
                <AddressBook 
                  user={currentUser}
                  addresses={addresses}
                  onAddressesUpdated={() => fetchAddresses(currentUser?.id)}
                  onProfileUpdated={handleProfileUpdated}
                />

                {/* 2. Heritage Order History Section */}
                <div className="flex flex-col gap-6">
                  <div className="border-b border-[#c89b3c]/20 pb-2">
                    <h3 className="font-sans text-xs font-semibold tracking-[0.2em] text-[#D4AF37] uppercase m-0">
                      Heritage Order History
                    </h3>
                    <p className="font-cormorant italic text-xs text-[#A69280] m-0 mt-0.5">
                      Your treasured acquisitions and order timeline
                    </p>
                  </div>

                  {orders.length > 0 ? (
                    <div className="flex flex-col gap-5">
                      {orders.map((order) => (
                        <div 
                          key={order.id} 
                          className="bg-[#16120F] border border-[#c89b3c]/20 p-6 transition-all duration-300 hover:border-[#D4AF37]/50 shadow-xl"
                        >
                          <div className="flex justify-between items-start gap-4 mb-4 border-b border-[#c89b3c]/15 pb-3 flex-wrap">
                            <div>
                              <span className="block text-[0.72rem] text-[#A69280] uppercase tracking-wider">Order Reference</span>
                              <span className="text-sm font-medium text-[#FAF4EE]">{order.id}</span>
                            </div>
                            <div className="text-right">
                              <span className="block text-[0.72rem] text-[#A69280] uppercase tracking-wider">Placed On</span>
                              <span className="text-xs font-light text-[#D9C8B4]">{order.date}</span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center gap-4 flex-wrap">
                            <div>
                              <span className="block text-[0.72rem] text-[#A69280] uppercase tracking-wider mb-0.5">Item</span>
                              <span className="text-[0.92rem] font-light text-[#FAF4EE]">{order.items}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <span className="block text-[0.72rem] text-[#A69280] uppercase tracking-wider">Price</span>
                                <span className="text-sm font-medium text-[#F4E3A1]">{order.amount}</span>
                              </div>
                              <span className="px-3 py-1 bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-[0.68rem] font-semibold uppercase tracking-wider">
                                {order.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="font-cormorant italic text-[#A69280] m-0">
                      You haven't purchased any items yet.
                    </p>
                  )}
                </div>
              </div>

            </div>

            {/* Modal for editing basic patron profile details */}
            <EditProfileModal
              isOpen={isEditProfileOpen}
              onClose={() => setIsEditProfileOpen(false)}
              user={currentUser}
              currentName={displayName}
              currentPhone={profile?.phone || ''}
              onProfileUpdated={handleProfileUpdated}
            />
          </>
        )}
      </main>

      <Footer onBrandClick={handleBrandClick} onNavigate={onNavigate} />
    </div>
  );
}
