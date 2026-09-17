import React, { useState } from 'react';
import Navbar from './Navbar';
import appointmentBg from '../assets/appointment_bg.jpg';

export default function AppointmentPage({ onNavigate, onCartClick }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    preferredDate: '',
    enquiry: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBrandClick = () => {
    if (onNavigate) {
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
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile number is required';
    } else if (!/^[0-9+\-\s]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.enquiry.trim()) {
      newErrors.enquiry = 'Please share your enquiry or preferred jewellery items';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 350);
  };

  return (
    <div className="h-screen max-h-[100dvh] w-full relative flex flex-col justify-between overflow-hidden font-sans text-[#FAF4EE] bg-[#0D0A08]">
      
      {/* Background Image Layer (Custom Jewelry Box & Necklace Background) */}
      <div 
        className="fixed inset-0 w-full h-full bg-no-repeat bg-cover pointer-events-none z-0 transition-opacity duration-700 bg-[center_30%] md:bg-[75%_center]"
        style={{ 
          backgroundImage: `url(${appointmentBg})`,
        }}
      />

      {/* Cinematic Gradient Overlays for Readability & Luxury Aesthetics */}
      <div className="block md:hidden fixed inset-0 bg-gradient-to-b from-[#0D0A08]/92 via-[#0D0A08]/80 to-[#0D0A08]/96 pointer-events-none z-0" />
      <div className="hidden md:block fixed inset-0 bg-gradient-to-r from-[#0D0A08]/98 via-[#0D0A08]/85 to-[#0D0A08]/30 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(13,10,8,0.55)_100%)] pointer-events-none z-0" />

      {/* Navigation Bar */}
      <Navbar 
        onCartClick={onCartClick} 
        onShopClick={() => onNavigate ? onNavigate('shop') : (window.location.href = '/shop')} 
        onBrandClick={handleBrandClick} 
        onNavigate={onNavigate}
        alwaysShowBg={true} 
      />

      {/* Main Appointment Section - Fits Screen Without Scrolling */}
      <div className="relative w-full flex-1 flex flex-col justify-center items-center md:items-start z-10 pt-16 md:pt-20 pb-4 px-4 sm:px-6 overflow-y-auto md:overflow-hidden">
        <main 
          className="w-full mx-auto md:mx-0 md:ml-[8%] lg:ml-[10%] relative z-10 transition-all duration-300 my-auto"
          style={{ maxWidth: '520px' }}
        >
          {!isSubmitted ? (
            <div className="flex flex-col items-start w-full bg-[#14100D]/92 backdrop-blur-xl border border-[#C9AA6B]/30 p-5 sm:p-7 md:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.7)]">
              
              {/* Header Title & Subtitle (No back-to-home button) */}
              <span className="font-sans text-[0.6rem] sm:text-[0.66rem] font-semibold tracking-[0.24em] text-[#C9AA6B] uppercase mb-1">
                Private Atelier Consultation
              </span>
              <h1 className="font-cormorant font-light text-2xl sm:text-3xl tracking-[0.04em] text-left m-0 mb-1 text-[#FAF4EE]">
                Book An Appointment
              </h1>
              <p className="font-sans text-[0.74rem] sm:text-[0.78rem] font-light tracking-wide text-[#D9C8B4] text-left m-0 mb-4 sm:mb-5 leading-relaxed">
                Experience bespoke heritage jewellery. Reserve a private consultation with our master artisans.
              </p>

              {/* Booking Form */}
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 sm:gap-3.5" noValidate>
                {/* Full Name */}
                <div className="flex flex-col w-full relative">
                  <label className="text-[0.65rem] tracking-[0.12em] uppercase text-[#A69280] mb-1 font-medium">
                    Full Name <span className="text-[#C9AA6B]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Radhika Singhania"
                    autoComplete="name"
                    required
                    className={`w-full bg-[#0D0A08]/60 border ${
                      errors.name ? 'border-red-400' : 'border-[#C9AA6B]/30 focus:border-[#D4AF37]'
                    } py-2.5 px-3 text-base sm:text-sm text-[#FAF4EE] placeholder-[#6E5D4F] font-sans outline-none rounded-none transition-colors focus:ring-1 focus:ring-[#D4AF37]/40`}
                  />
                  {errors.name && <span className="text-[10px] text-red-400 mt-0.5 font-light">{errors.name}</span>}
                </div>

                {/* Mobile & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                  {/* Mobile No */}
                  <div className="flex flex-col w-full relative">
                    <label className="text-[0.65rem] tracking-[0.12em] uppercase text-[#A69280] mb-1 font-medium">
                      Mobile No <span className="text-[#C9AA6B]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      autoComplete="tel"
                      required
                      className={`w-full bg-[#0D0A08]/60 border ${
                        errors.phone ? 'border-red-400' : 'border-[#C9AA6B]/30 focus:border-[#D4AF37]'
                      } py-2.5 px-3 text-base sm:text-sm text-[#FAF4EE] placeholder-[#6E5D4F] font-sans outline-none rounded-none transition-colors focus:ring-1 focus:ring-[#D4AF37]/40`}
                    />
                    {errors.phone && <span className="text-[10px] text-red-400 mt-0.5 font-light">{errors.phone}</span>}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col w-full relative">
                    <label className="text-[0.65rem] tracking-[0.12em] uppercase text-[#A69280] mb-1 font-medium">
                      Email Address <span className="text-[#C9AA6B]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      autoComplete="email"
                      required
                      className={`w-full bg-[#0D0A08]/60 border ${
                        errors.email ? 'border-red-400' : 'border-[#C9AA6B]/30 focus:border-[#D4AF37]'
                      } py-2.5 px-3 text-base sm:text-sm text-[#FAF4EE] placeholder-[#6E5D4F] font-sans outline-none rounded-none transition-colors focus:ring-1 focus:ring-[#D4AF37]/40`}
                    />
                    {errors.email && <span className="text-[10px] text-red-400 mt-0.5 font-light">{errors.email}</span>}
                  </div>
                </div>

                {/* Location & Preferred Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                  <div className="flex flex-col w-full relative">
                    <label className="text-[0.65rem] tracking-[0.12em] uppercase text-[#A69280] mb-1 font-medium">
                      City / Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Mumbai, Jaipur, Delhi"
                      className="w-full bg-[#0D0A08]/60 border border-[#C9AA6B]/30 focus:border-[#D4AF37] py-2.5 px-3 text-base sm:text-sm text-[#FAF4EE] placeholder-[#6E5D4F] font-sans outline-none rounded-none transition-colors focus:ring-1 focus:ring-[#D4AF37]/40"
                    />
                  </div>

                  <div className="flex flex-col w-full relative">
                    <label className="text-[0.65rem] tracking-[0.12em] uppercase text-[#A69280] mb-1 font-medium">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="w-full bg-[#0D0A08]/60 border border-[#C9AA6B]/30 focus:border-[#D4AF37] py-2.5 px-3 text-base sm:text-sm text-[#FAF4EE] placeholder-[#6E5D4F] font-sans outline-none rounded-none transition-colors focus:ring-1 focus:ring-[#D4AF37]/40"
                    />
                  </div>
                </div>

                {/* Enquiry */}
                <div className="flex flex-col w-full relative">
                  <label className="text-[0.65rem] tracking-[0.12em] uppercase text-[#A69280] mb-1 font-medium">
                    Consultation Details <span className="text-[#C9AA6B]">*</span>
                  </label>
                  <textarea
                    name="enquiry"
                    value={formData.enquiry}
                    onChange={handleChange}
                    placeholder="Tell us what you are looking for (e.g. Bridal Kundan set, Polki necklace, customization)..."
                    rows="2"
                    required
                    className={`w-full bg-[#0D0A08]/60 border ${
                      errors.enquiry ? 'border-red-400' : 'border-[#C9AA6B]/30 focus:border-[#D4AF37]'
                    } py-2 px-3 text-base sm:text-sm text-[#FAF4EE] placeholder-[#6E5D4F] font-sans outline-none rounded-none transition-colors resize-none focus:ring-1 focus:ring-[#D4AF37]/40`}
                  />
                  {errors.enquiry && <span className="text-[10px] text-red-400 mt-0.5 font-light">{errors.enquiry}</span>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-1 bg-gradient-to-r from-[#D4AF37] via-[#F4E3A1] to-[#C89B3C] hover:brightness-110 active:scale-[0.99] text-[#0D0A08] font-sans text-xs tracking-[0.18em] uppercase py-3.5 border-none cursor-pointer transition-all font-semibold select-none shadow-[0_4px_16px_rgba(201,170,107,0.3)] disabled:opacity-75"
                >
                  {isSubmitting ? 'Submitting Request...' : 'Schedule Private Appointment'}
                </button>
              </form>
            </div>
          ) : (
            /* Confirmation State */
            <div className="text-center py-8 sm:py-10 px-5 sm:px-8 w-full border border-[#C9AA6B]/40 bg-[#14100D]/95 backdrop-blur-xl shadow-2xl rounded-none text-[#FAF4EE]">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full border border-[#D4AF37]/50 flex items-center justify-center bg-[#D4AF37]/10 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-[#D4AF37] fill-none stroke-[1.6]" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>

              <span className="font-sans text-[0.62rem] font-semibold tracking-[0.24em] text-[#C9AA6B] uppercase mb-1 block">
                Appointment Received
              </span>
              <h2 className="font-cormorant font-normal text-2xl sm:text-3xl text-[#FAF4EE] m-0 mb-2 tracking-wide">
                Consultation Request Confirmed
              </h2>
              <p className="font-sans text-xs sm:text-sm font-light text-[#D9C8B4] mb-5 leading-relaxed max-w-sm mx-auto">
                Thank you, <span className="text-[#FAF4EE] font-medium">{formData.name}</span>. Our concierge team will reach out to you within 24 hours to finalize your private consultation time.
              </p>

              {/* Summary Details */}
              <div className="border border-[#C9AA6B]/25 bg-[#0D0A08]/80 p-3.5 sm:p-4 mb-5 text-left text-xs divide-y divide-[#C9AA6B]/15 font-sans">
                <div className="flex justify-between py-1.5">
                  <span className="text-[#A69280]">Name</span>
                  <span className="font-medium text-[#FAF4EE]">{formData.name}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#A69280]">Mobile</span>
                  <span className="font-medium text-[#FAF4EE]">{formData.phone}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#A69280]">Email</span>
                  <span className="font-medium text-[#FAF4EE] truncate max-w-[200px]">{formData.email}</span>
                </div>
                {formData.location && (
                  <div className="flex justify-between py-1.5">
                    <span className="text-[#A69280]">Location</span>
                    <span className="font-medium text-[#FAF4EE]">{formData.location}</span>
                  </div>
                )}
                {formData.preferredDate && (
                  <div className="flex justify-between py-1.5">
                    <span className="text-[#A69280]">Preferred Date</span>
                    <span className="font-medium text-[#C9AA6B]">{formData.preferredDate}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate ? onNavigate('shop') : (window.location.href = '/shop')}
                  className="w-full bg-gradient-to-r from-[#D4AF37] via-[#F4E3A1] to-[#C89B3C] hover:brightness-110 text-[#0D0A08] font-sans text-xs tracking-[0.16em] uppercase py-3 border-none cursor-pointer transition-all font-semibold shadow-md"
                >
                  Return to Shop
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', phone: '', email: '', location: '', preferredDate: '', enquiry: '' });
                  }}
                  className="w-full bg-transparent hover:bg-white/5 border border-[#C9AA6B]/30 text-[#C9AA6B] font-sans text-xs tracking-[0.16em] uppercase py-3 cursor-pointer transition-all font-medium"
                >
                  Book Another
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* No Footer rendered on this page as requested */}
    </div>
  );
}
