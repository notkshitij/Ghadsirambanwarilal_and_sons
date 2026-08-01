import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ContactPage({ onBackToShop, onNavigate, onCartClick }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    agree: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleBrandClick = () => {
    if (onNavigate) {
      onNavigate('shop');
    } else {
      onBackToShop();
    }
  };

  const handleTermsLinkClick = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('terms');
    } else {
      window.history.pushState(null, '', '/terms');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.message.trim()) newErrors.message = 'Message description is required';
    if (!formData.agree) newErrors.agree = 'You must agree to the Terms & Conditions';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telephone number is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
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
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      agree: false
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-between font-sans">
      <Navbar 
        onCartClick={onCartClick} 
        onBookClick={() => {
          if (onNavigate) onNavigate('appointment');
        }} 
        onShopClick={handleBrandClick} 
        onBrandClick={handleBrandClick} 
        alwaysShowBg={true} 
      />

      <main className="flex-1 w-full max-w-[1100px] mx-auto px-6 md:px-8 pt-36 pb-24 text-neutral-800 leading-relaxed">
        {/* Frame-bordered Title Header */}
        <div className="relative py-10 px-8 mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4 select-none">
          {/* L-shaped corner frames */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-neutral-200" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-neutral-200" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-neutral-200" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-neutral-200" />
          
          <h1 className="font-cormorant font-light text-4xl md:text-5xl tracking-[0.16em] text-neutral-900 m-0 uppercase">
            Contact Us
          </h1>
          <p className="font-sans text-xs md:text-sm font-light tracking-wider text-neutral-400 m-0 md:text-right">
            Reach Out Anytime, We're Here to Help.
          </p>
        </div>

        {isSubmitted && (
          <div className="bg-[#fcfbfa] border border-emerald-100 rounded-sm p-6 text-center mb-12 shadow-[0_4px_20px_rgba(16,185,129,0.02)]">
            <p className="font-cormorant text-2xl font-light text-emerald-800 mb-2">Message Sent Successfully</p>
            <p className="font-sans text-xs font-light text-neutral-500 m-0 leading-relaxed">
              Thank you! Our customer support representatives will review your details and get back to you shortly.
            </p>
          </div>
        )}

        {/* 3-column contact info row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1: Address */}
          <div className="bg-[#fcfbfa] hover:bg-[#faf9f8] border border-neutral-100 rounded-sm py-8 px-6 text-center transition-colors duration-300 flex flex-col items-center justify-center min-h-[110px]">
            <p className="font-sans text-xs md:text-sm font-light text-neutral-600 m-0 tracking-wide leading-relaxed">
              38, Shri Ram Colony, Sindhi Camp, Jaipur, Rajasthan, 302016
            </p>
          </div>

          {/* Card 2: Email */}
          <div className="bg-[#fcfbfa] hover:bg-[#faf9f8] border border-neutral-100 rounded-sm py-8 px-6 text-center transition-colors duration-300 flex flex-col items-center justify-center min-h-[110px]">
            <a 
              href="mailto:ghadsirambanwarilalandsons@gmail.com" 
              className="font-sans text-xs md:text-sm font-light text-neutral-600 hover:text-gold-dark transition-colors duration-200 no-underline tracking-wide break-all"
            >
              ghadsirambanwarilalandsons@gmail.com
            </a>
          </div>

          {/* Card 3: Phone */}
          <div className="bg-[#fcfbfa] hover:bg-[#faf9f8] border border-neutral-100 rounded-sm py-8 px-6 text-center transition-colors duration-300 flex flex-col items-center justify-center min-h-[110px]">
            <a 
              href="tel:+919772222279" 
              className="font-sans text-xs md:text-sm font-light text-neutral-600 hover:text-gold-dark transition-colors duration-200 no-underline tracking-widest"
            >
              +91 9772222279
            </a>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <h2 className="font-sans text-base font-normal tracking-[0.12em] text-neutral-900 uppercase m-0">
              Social Media
            </h2>
            <span className="text-[#c89b3c] text-sm">&bull;</span>
          </div>

          {/* 2-column social link cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Card 1: Instagram */}
            <a 
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#fcfbfa] hover:bg-[#faf9f8] border border-neutral-100 rounded-sm py-8 px-4 text-center transition-all duration-300 hover:-translate-y-1 font-sans text-xs md:text-sm font-light text-neutral-600 hover:text-neutral-900 no-underline tracking-wider"
            >
              Instagram
            </a>

            {/* Card 2: Facebook */}
            <a 
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#fcfbfa] hover:bg-[#faf9f8] border border-neutral-100 rounded-sm py-8 px-4 text-center transition-all duration-300 hover:-translate-y-1 font-sans text-xs md:text-sm font-light text-neutral-600 hover:text-neutral-900 no-underline tracking-wider"
            >
              Facebook
            </a>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="flex flex-col gap-6 mt-12">
          <div className="flex items-center gap-3">
            <h2 className="font-sans text-base font-normal tracking-[0.12em] text-neutral-900 uppercase m-0">
              Write Us a Message
            </h2>
            <span className="text-[#c89b3c] text-sm">&bull;</span>
          </div>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
            {/* Full Name */}
            <div className="flex flex-col w-full">
              <label htmlFor="name" className="font-sans text-xs font-normal tracking-wide text-neutral-500 mb-1.5 uppercase">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Jane Smith"
                required
                className={`w-full bg-white border ${errors.name ? 'border-red-500' : 'border-neutral-200/80 focus:border-black'} py-3.5 px-4 text-sm text-neutral-800 placeholder-neutral-300 font-sans outline-none rounded-none transition-colors`}
              />
              {errors.name && <span className="text-[10px] text-red-500 mt-1 font-light">{errors.name}</span>}
            </div>

            {/* Email & Telephone Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="flex flex-col w-full">
                <label htmlFor="email" className="font-sans text-xs font-normal tracking-wide text-neutral-500 mb-1.5 uppercase">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="janesmith@email.com"
                  required
                  className={`w-full bg-white border ${errors.email ? 'border-red-500' : 'border-neutral-200/80 focus:border-black'} py-3.5 px-4 text-sm text-neutral-800 placeholder-neutral-300 font-sans outline-none rounded-none transition-colors`}
                />
                {errors.email && <span className="text-[10px] text-red-500 mt-1 font-light">{errors.email}</span>}
              </div>

              {/* Telephone */}
              <div className="flex flex-col w-full">
                <label htmlFor="phone" className="font-sans text-xs font-normal tracking-wide text-neutral-500 mb-1.5 uppercase">
                  Telephone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+01 999 888 777"
                  required
                  className={`w-full bg-white border ${errors.phone ? 'border-red-500' : 'border-neutral-200/80 focus:border-black'} py-3.5 px-4 text-sm text-neutral-800 placeholder-neutral-300 font-sans outline-none rounded-none transition-colors`}
                />
                {errors.phone && <span className="text-[10px] text-red-500 mt-1 font-light">{errors.phone}</span>}
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col w-full">
              <label htmlFor="message" className="font-sans text-xs font-normal tracking-wide text-neutral-500 mb-1.5 uppercase">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type Your Message..."
                required
                rows={5}
                className={`w-full bg-white border ${errors.message ? 'border-red-500' : 'border-neutral-200/80 focus:border-black'} py-3.5 px-4 text-sm text-neutral-800 placeholder-neutral-300 font-sans outline-none rounded-none resize-none transition-colors h-36`}
              />
              {errors.message && <span className="text-[10px] text-red-500 mt-1 font-light">{errors.message}</span>}
            </div>

            {/* Checkbox agreement */}
            <div className="flex flex-col w-full">
              <div className="flex items-center gap-2.5 mt-2 select-none">
                <input 
                  type="checkbox" 
                  id="agree" 
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  required
                  className="w-4 h-4 border border-neutral-300 rounded-none cursor-pointer focus:ring-0" 
                />
                <label htmlFor="agree" className="font-sans text-xs font-light text-neutral-500 cursor-pointer">
                  I agree with <a href="/terms" onClick={handleTermsLinkClick} className="text-[#c89b3c] hover:underline font-normal">Terms &amp; Conditions</a>
                </label>
              </div>
              {errors.agree && <span className="text-[10px] text-red-500 mt-1.5 font-light">{errors.agree}</span>}
            </div>

            {/* Send Button */}
            <button
              type="submit"
              className="w-full bg-[#111] hover:bg-[#c89b3c] text-white font-sans text-xs font-semibold tracking-[0.2em] uppercase py-4 border-none cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg rounded-none mt-4"
            >
              Send
            </button>
          </form>
        </div>
      </main>

      <Footer onBrandClick={handleBrandClick} onNavigate={onNavigate} />
    </div>
  );
}
