import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import appointmentBg from '../assets/appointment.png';

export default function AppointmentPage({ onBackToShop, onBackToHome, onNavigate, onCartClick }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    enquiry: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Mobile number is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.enquiry.trim()) newErrors.enquiry = 'Enquiry description is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-x-hidden font-sans text-[#FAF4EE] bg-[#0D0A08]">
      {/* Full-viewport cover background image */}
      <div 
        className="fixed inset-0 w-full h-full bg-no-repeat bg-center bg-cover pointer-events-none z-0 opacity-40"
        style={{ 
          backgroundImage: `url(${appointmentBg})`, 
        }}
      />
      <div className="fixed inset-0 bg-gradient-to-r from-[#0D0A08] via-[#0D0A08]/90 to-[#0D0A08]/60 pointer-events-none z-0" />

      <Navbar 
        onCartClick={onCartClick} 
        onBookClick={() => onNavigate('appointment')} 
        onShopClick={() => onNavigate('shop')} 
        onBrandClick={handleBrandClick} 
        onNavigate={onNavigate}
        alwaysShowBg={true} 
      />

      {/* Scrollable Form Content */}
      <div className="relative w-full flex-1 flex flex-col justify-center z-10 pt-28 pb-20">
        <main 
          className="w-full md:mx-0 md:ml-[10%] px-6 relative z-10"
          style={{ maxWidth: '520px' }}
        >
        {!isSubmitted ? (
          <div className="flex flex-col items-start w-full bg-[#16120F]/90 backdrop-blur-md border border-[#c89b3c]/25 p-8 md:p-10 shadow-2xl">
            {/* Elegant Back Navigation Link */}
            <button 
              type="button" 
              onClick={handleBrandClick}
              className="flex items-center gap-1.5 text-[0.72rem] tracking-[0.14em] text-[#D4AF37] hover:text-[#F4E3A1] uppercase bg-transparent border-none cursor-pointer p-0 mb-6 font-sans font-medium transition-colors duration-300"
            >
              ← Back to Home
            </button>

            {/* Header Section */}
            <h1 className="font-display font-light text-2xl md:text-3xl tracking-[0.06em] text-left m-0 mb-2 text-[#FAF4EE] uppercase">
              Book An Appointment
            </h1>
            <p className="font-sans text-[0.78rem] font-light tracking-wide text-[#D9C8B4] text-left m-0 mb-8 leading-relaxed">
              Book a bespoke consultation with our master jewellery experts.
            </p>

            {/* Underlined Minimalist Form */}
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
              {/* Full Name */}
              <div className="flex flex-col w-full relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name*"
                  required
                  className={`w-full bg-transparent border-b ${errors.name ? 'border-red-500' : 'border-[#c89b3c]/30 focus:border-[#D4AF37]'} py-3 px-1 text-sm text-[#FAF4EE] placeholder-[#A69280] font-sans outline-none rounded-none transition-colors`}
                />
                {errors.name && <span className="text-[10px] text-red-400 mt-1 font-light">{errors.name}</span>}
              </div>

              {/* Mobile no */}
              <div className="flex flex-col w-full relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Mobile no*"
                  required
                  className={`w-full bg-transparent border-b ${errors.phone ? 'border-red-500' : 'border-[#c89b3c]/30 focus:border-[#D4AF37]'} py-3 px-1 text-sm text-[#FAF4EE] placeholder-[#A69280] font-sans outline-none rounded-none transition-colors`}
                />
                {errors.phone && <span className="text-[10px] text-red-400 mt-1 font-light">{errors.phone}</span>}
              </div>

              {/* Email* */}
              <div className="flex flex-col w-full relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email*"
                  required
                  className={`w-full bg-transparent border-b ${errors.email ? 'border-red-500' : 'border-[#c89b3c]/30 focus:border-[#D4AF37]'} py-3 px-1 text-sm text-[#FAF4EE] placeholder-[#A69280] font-sans outline-none rounded-none transition-colors`}
                />
                {errors.email && <span className="text-[10px] text-red-400 mt-1 font-light">{errors.email}</span>}
              </div>

              {/* Your location */}
              <div className="flex flex-col w-full relative">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Your location"
                  className="w-full bg-transparent border-b border-[#c89b3c]/30 focus:border-[#D4AF37] py-3 px-1 text-sm text-[#FAF4EE] placeholder-[#A69280] font-sans outline-none rounded-none transition-colors"
                />
              </div>

              {/* Enquiry* */}
              <div className="flex flex-col w-full relative">
                <textarea
                  name="enquiry"
                  value={formData.enquiry}
                  onChange={handleChange}
                  placeholder="Enquiry Details*"
                  rows="3"
                  required
                  className={`w-full bg-transparent border-b ${errors.enquiry ? 'border-red-500' : 'border-[#c89b3c]/30 focus:border-[#D4AF37]'} py-3 px-1 text-sm text-[#FAF4EE] placeholder-[#A69280] font-sans outline-none rounded-none transition-colors resize-y`}
                />
                {errors.enquiry && <span className="text-[10px] text-red-400 mt-1 font-light">{errors.enquiry}</span>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#D4AF37] via-[#F4E3A1] to-[#C89B3C] hover:brightness-110 text-[#0D0A08] font-sans text-xs tracking-[0.16em] uppercase py-4 mt-4 border-none cursor-pointer transition-all font-semibold select-none shadow-lg"
              >
                Schedule Appointment
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-12 px-8 max-w-[500px] mx-auto border border-[#c89b3c]/30 bg-[#16120F] shadow-2xl rounded-none animate-hero-fade-in-up-1 text-[#FAF4EE]">
            {/* Success Checkmark Icon */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-[#D4AF37]/50 flex items-center justify-center bg-[#D4AF37]/10">
              <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-[#D4AF37] fill-none stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>

            <h2 className="font-cormorant font-normal text-2xl uppercase tracking-wider text-[#FAF4EE] m-0 mb-3">
              Request Sent
            </h2>
            <p className="font-sans text-xs font-light text-[#D9C8B4] mb-8 leading-relaxed">
              Thank you for booking with us. Our luxury jewelry consultant will contact you via email or phone shortly to confirm your scheduled appointment slot.
            </p>

            {/* Summary Details */}
            <div className="border border-[#c89b3c]/20 bg-[#0D0A08] p-5 mb-8 text-left text-xs divide-y divide-[#c89b3c]/15 font-sans">
              <div className="flex justify-between py-2.5">
                <span className="text-[#A69280]">Name</span>
                <span className="font-medium text-[#FAF4EE]">{formData.name}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-[#A69280]">Mobile</span>
                <span className="font-medium text-[#FAF4EE]">{formData.phone}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-[#A69280]">Email</span>
                <span className="font-medium text-[#FAF4EE]">{formData.email}</span>
              </div>
              {formData.location && (
                <div className="flex justify-between py-2.5">
                  <span className="text-[#A69280]">Location</span>
                  <span className="font-medium text-[#FAF4EE]">{formData.location}</span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => onNavigate('shop')}
              className="w-full bg-gradient-to-r from-[#D4AF37] via-[#F4E3A1] to-[#C89B3C] hover:brightness-110 text-[#0D0A08] font-sans text-xs tracking-[0.14em] uppercase py-3.5 border-none cursor-pointer transition-all font-semibold"
            >
              Return to Shop
            </button>
          </div>
        )}
      </main>
      </div>

      <Footer onBrandClick={handleBrandClick} onNavigate={onNavigate} />
    </div>
  );
}
