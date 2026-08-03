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
    <div className="min-h-screen relative flex flex-col justify-between overflow-x-hidden font-sans text-black bg-[#f4dbb7]">
      {/* Full-viewport cover background image */}
      <div 
        className="fixed inset-0 w-full h-full bg-no-repeat bg-center bg-cover pointer-events-none z-0"
        style={{ 
          backgroundImage: `url(${appointmentBg})`, 
        }}
      />

      {/* Scrollable Form Content */}
      <div className="relative w-full flex-1 flex flex-col justify-center z-10">

        <main 
          className="w-full md:mx-0 md:ml-[12%] px-6 relative z-10"
          style={{ maxWidth: '480px', paddingTop: '6rem', paddingBottom: '6rem' }}
        >
        {!isSubmitted ? (
          <div className="flex flex-col items-start w-full">
            {/* Elegant Back Navigation Link */}
            <button 
              type="button" 
              onClick={handleBrandClick}
              className="flex items-center gap-1.5 text-[0.72rem] tracking-[0.14em] text-neutral-500 hover:text-black uppercase bg-transparent border-none cursor-pointer p-0 mb-6 font-sans font-medium transition-colors duration-300"
            >
              ← Back to Home
            </button>

            {/* Header Section */}
            <h1 className="font-cormorant font-normal text-3xl md:text-[2.15rem] tracking-[0.06em] text-left m-0 mb-3 text-neutral-800 uppercase">
              Book An Appointment
            </h1>
            <p className="font-sans text-[0.75rem] font-medium tracking-wide text-neutral-500 text-left m-0 mb-10 leading-relaxed">
              Book an appointment with us. Get the best advice &amp; consultation.
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
                  className={`w-full bg-transparent border-b ${errors.name ? 'border-red-500' : 'border-neutral-300 focus:border-black'} py-3 px-1 text-sm text-neutral-800 placeholder-neutral-400 font-sans outline-none rounded-none transition-colors`}
                />
                {errors.name && <span className="text-[10px] text-red-500 mt-1 font-light">{errors.name}</span>}
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
                  className={`w-full bg-transparent border-b ${errors.phone ? 'border-red-500' : 'border-neutral-300 focus:border-black'} py-3 px-1 text-sm text-neutral-850 placeholder-neutral-400 font-sans outline-none rounded-none transition-colors`}
                />
                {errors.phone && <span className="text-[10px] text-red-500 mt-1 font-light">{errors.phone}</span>}
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
                  className={`w-full bg-transparent border-b ${errors.email ? 'border-red-500' : 'border-neutral-300 focus:border-black'} py-3 px-1 text-sm text-neutral-850 placeholder-neutral-400 font-sans outline-none rounded-none transition-colors`}
                />
                {errors.email && <span className="text-[10px] text-red-500 mt-1 font-light">{errors.email}</span>}
              </div>

              {/* Your location */}
              <div className="flex flex-col w-full relative">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Your location"
                  className="w-full bg-transparent border-b border-neutral-300 focus:border-black py-3 px-1 text-sm text-neutral-850 placeholder-neutral-400 font-sans outline-none rounded-none transition-colors"
                />
              </div>

              {/* Enquiry* */}
              <div className="flex flex-col w-full relative">
                <textarea
                  name="enquiry"
                  value={formData.enquiry}
                  onChange={handleChange}
                  placeholder="Enquiry*"
                  rows="4"
                  required
                  className={`w-full bg-transparent border-b ${errors.enquiry ? 'border-red-500' : 'border-neutral-300 focus:border-black'} py-3 px-1 text-sm text-neutral-850 placeholder-neutral-400 font-sans outline-none rounded-none transition-colors resize-y`}
                />
                {errors.enquiry && <span className="text-[10px] text-red-500 mt-1 font-light">{errors.enquiry}</span>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full text-white font-sans text-xs tracking-[0.16em] uppercase py-3.5 mt-4 border-none cursor-pointer transition-colors font-semibold select-none"
                style={{ backgroundColor: '#1a1a1a' }}
              >
                Send
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-12 px-6 max-w-[500px] mx-auto border border-neutral-200 bg-white shadow-md rounded-none animate-hero-fade-in-up-1 text-black">
            {/* Success Checkmark Icon */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-neutral-200 flex items-center justify-center bg-neutral-50">
              <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-black fill-none stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>

            <h2 className="font-cormorant font-normal text-2xl uppercase tracking-wider text-neutral-800 m-0 mb-3">
              Request Sent
            </h2>
            <p className="font-sans text-xs font-light text-neutral-500 mb-8 leading-relaxed">
              Thank you for booking with us. Our consultant will contact you via email or phone shortly to confirm your scheduled appointment slot.
            </p>

            {/* Summary Details */}
            <div className="border border-neutral-100 bg-neutral-50 p-5 mb-8 text-left text-xs divide-y divide-neutral-200/60 font-sans">
              <div className="flex justify-between py-2.5">
                <span className="text-neutral-500">Name</span>
                <span className="font-medium text-neutral-800">{formData.name}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-neutral-500">Mobile</span>
                <span className="font-medium text-neutral-800">{formData.phone}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-neutral-500">Email</span>
                <span className="font-medium text-neutral-800">{formData.email}</span>
              </div>
              {formData.location && (
                <div className="flex justify-between py-2.5">
                  <span className="text-neutral-500">Location</span>
                  <span className="font-medium text-neutral-800">{formData.location}</span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={onBackToShop}
              className="w-full text-white font-sans text-xs tracking-[0.14em] uppercase py-3.5 border-none cursor-pointer transition-colors"
              style={{ backgroundColor: '#1a1a1a' }}
            >
              Return to Shop
            </button>
          </div>
        )}
      </main>
      </div>

    </div>
  );
}
