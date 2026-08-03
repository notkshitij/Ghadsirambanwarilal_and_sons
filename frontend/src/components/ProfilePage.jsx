import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ProfilePage({ onBackToShop, onBackToHome, onNavigate, onCartClick, onLogout }) {
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
      onBackToShop();
    }
  };

  // Mock User Data
  const user = {
    name: 'Devendra Singh',
    email: 'devendra.singh@gmail.com',
    memberSince: 'October 2024',
    membershipTier: 'Royal Gold Elite',
    phone: '+91 9829012345',
    address: '42, Royal Vilas, Malviya Nagar, Jaipur - 302017'
  };

  // Mock Orders list
  const orders = [
    {
      id: 'GBS-2026-4892',
      date: 'June 18, 2026',
      items: '18K Gold Emerald Heritage Necklace',
      amount: '₹3,45,000',
      status: 'Delivered'
    },
    {
      id: 'GBS-2026-2819',
      date: 'April 02, 2026',
      items: 'Classic Polki Diamond Jhumkas',
      amount: '₹1,95,000',
      status: 'Delivered'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#150305] flex flex-col justify-between font-sans">
      <Navbar 
        onCartClick={onCartClick} 
        onBookClick={() => {
          if (onNavigate) onNavigate('appointment');
        }} 
        onShopClick={handleShopClick} 
        onBrandClick={handleBrandClick} 
        alwaysShowBg={true}
        isLoggedIn={true}
        onProfileClick={() => {}}
      />

      <main className="flex-1 w-full max-w-[1000px] mx-auto px-6 md:px-12 pt-36 pb-24">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-[#c89b3c]/20 pb-8 mb-12">
          <div>
            <span className="font-sans text-[0.72rem] font-semibold tracking-[0.2em] text-[#A67C1E] uppercase">
              Your Curated Space
            </span>
            <h1 className="font-display font-light text-3xl md:text-4xl text-[#150305] tracking-wide m-0 mt-1 uppercase">
              {user.name}
            </h1>
            <p className="font-cormorant italic text-[1.1rem] text-neutral-500 m-0 mt-1">
              {user.membershipTier} Member
            </p>
          </div>
          
          <button
            type="button"
            onClick={onLogout}
            className="px-6 py-2.5 border border-red-200 hover:border-red-500 text-red-600 hover:bg-red-50 font-sans text-xs font-semibold tracking-wider uppercase transition-all duration-300 outline-none cursor-pointer"
          >
            Log Out
          </button>
        </div>

        {/* Profile Grid Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Col 1: Account Information */}
          <div className="md:col-span-1 flex flex-col gap-6">
            <h3 className="font-sans text-xs font-semibold tracking-[0.2em] text-[#A67C1E] uppercase m-0 border-b border-neutral-100 pb-2">
              Membership Details
            </h3>
            
            <div className="flex flex-col gap-4">
              <div>
                <span className="block text-[0.7rem] text-neutral-400 uppercase tracking-wider">Email</span>
                <span className="text-sm font-light text-neutral-800">{user.email}</span>
              </div>
              <div>
                <span className="block text-[0.7rem] text-neutral-400 uppercase tracking-wider">Phone</span>
                <span className="text-sm font-light text-neutral-800">{user.phone}</span>
              </div>
              <div>
                <span className="block text-[0.7rem] text-neutral-400 uppercase tracking-wider">Default Address</span>
                <span className="text-sm font-light leading-relaxed text-neutral-600">{user.address}</span>
              </div>
              <div>
                <span className="block text-[0.7rem] text-neutral-400 uppercase tracking-wider">Member Since</span>
                <span className="text-sm font-light text-neutral-800">{user.memberSince}</span>
              </div>
            </div>
          </div>

          {/* Col 2 & 3: Order History */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <h3 className="font-sans text-xs font-semibold tracking-[0.2em] text-[#A67C1E] uppercase m-0 border-b border-neutral-100 pb-2">
              Heritage Order History
            </h3>

            {orders.length > 0 ? (
              <div className="flex flex-col gap-6">
                {orders.map((order) => (
                  <div 
                    key={order.id} 
                    className="border border-[#c89b3c]/15 p-6 transition-all duration-300 hover:shadow-[0_8px_25px_rgba(21,3,5,0.03)]"
                  >
                    <div className="flex justify-between items-start gap-4 mb-4 border-b border-neutral-100 pb-3 flex-wrap">
                      <div>
                        <span className="block text-[0.72rem] text-neutral-400 uppercase tracking-wider">Order Reference</span>
                        <span className="text-sm font-medium text-[#150305]">{order.id}</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-[0.72rem] text-neutral-400 uppercase tracking-wider">Placed On</span>
                        <span className="text-xs font-light text-neutral-600">{order.date}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center gap-4 flex-wrap">
                      <div>
                        <span className="block text-[0.72rem] text-neutral-400 uppercase tracking-wider mb-0.5">Item</span>
                        <span className="text-[0.92rem] font-light text-neutral-800">{order.items}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="block text-[0.72rem] text-neutral-400 uppercase tracking-wider">Price</span>
                          <span className="text-sm font-medium text-[#150305]">{order.amount}</span>
                        </div>
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[0.68rem] font-semibold uppercase tracking-wider">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="font-cormorant italic text-neutral-500 m-0">
                You haven't purchased any items yet.
              </p>
            )}
          </div>

        </div>
      </main>

      <Footer onBrandClick={handleBrandClick} onNavigate={onNavigate} />
    </div>
  );
}
