import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { supabase } from '../lib/supabaseClient';

export default function ContactPage({ onBackToShop, onBackToHome, onNavigate, onCartClick }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState({});

  const handleBrandClick = () => {
    if (onBackToHome) onBackToHome();
    else if (onNavigate) onNavigate('home');
  };

  const handleShopClick = () => {
    if (onNavigate) onNavigate('shop');
    else if (onBackToShop) onBackToShop();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (submitError) setSubmitError('');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
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
    setSubmitError('');

    try {
      const { error } = await supabase.from('contact_messages').insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
      ]);

      if (error) {
        console.error('Error submitting contact message:', error);
        setSubmitError('Something went wrong, please try again.');
      } else {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err) {
      console.error('Unexpected error submitting contact message:', err);
      setSubmitError('Something went wrong, please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `w-full bg-[#0D0A08] border ${errors[field] ? 'border-red-500' : 'border-[#2E231A] focus:border-[#C9AA6B]'} rounded-lg py-3 px-4 text-sm text-[#FAF4EE] placeholder-[#4A3C30] font-sans outline-none transition-colors`;

  return (
    <div className="min-h-screen bg-[#0D0A08] text-[#FAF4EE] flex flex-col justify-between font-sans">
      <Navbar
        onCartClick={onCartClick}
        onBookClick={() => { if (onNavigate) onNavigate('appointment'); }}
        onShopClick={handleShopClick}
        onBrandClick={handleBrandClick}
        onNavigate={onNavigate}
        alwaysShowBg={true}
      />

      <main className="flex-1 w-full max-w-[1100px] mx-auto px-6 md:px-8 pt-40 pb-16 md:pb-20">

        {isSubmitted && (
          <div className="bg-[#16120F] border border-emerald-500/30 rounded-lg p-5 text-center mb-10">
            <p className="font-cormorant text-2xl font-light text-emerald-400 mb-1">Message Sent!</p>
            <p className="font-sans text-xs font-light text-[#D9C8B4]">
              Thank you — a real person from our studio will get back to you soon.
            </p>
          </div>
        )}

        {submitError && (
          <div className="bg-[#16120F] border border-red-500/30 rounded-lg p-5 text-center mb-10">
            <p className="font-cormorant text-2xl font-light text-red-400 mb-1">Unable to Send</p>
            <p className="font-sans text-xs font-light text-[#D9C8B4]">
              {submitError}
            </p>
          </div>
        )}

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* LEFT: Info */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="font-sans text-[0.68rem] font-semibold tracking-[0.28em] text-[#C9AA6B] uppercase mb-4">
                Contact
              </p>
              <h1 className="font-cormorant font-light text-5xl md:text-6xl leading-[1.1] text-[#FAF4EE] m-0 mb-5">
                Get in touch
              </h1>
              <p className="font-sans text-sm font-light text-[#7A6A58] leading-[1.8] m-0 max-w-[380px]">
                Questions about a piece, a custom commission, or sizing?
                Write to us — a real person from the studio will reply.
              </p>
            </div>

            {/* Info rows */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="font-sans text-[0.65rem] font-semibold tracking-[0.22em] text-[#C9AA6B] uppercase mb-1.5">
                  Email
                </p>
                <a
                  href="mailto:ghadsirambanwarilalandsons@gmail.com"
                  className="font-sans text-sm font-light text-[#FAF4EE] no-underline"
                >
                  ghadsirambanwarilalandsons@gmail.com
                </a>
              </div>

              <div>
                <p className="font-sans text-[0.65rem] font-semibold tracking-[0.22em] text-[#C9AA6B] uppercase mb-1.5">
                  Studio
                </p>
                <p className="font-sans text-sm font-light text-[#FAF4EE] m-0 leading-[1.6]">
                  306, Shree Shiv Nagar, Nayla Road,<br />
                  Jaisinghpura Khor, Jaipur – 302027
                </p>
              </div>

              <div>
                <p className="font-sans text-[0.65rem] font-semibold tracking-[0.22em] text-[#C9AA6B] uppercase mb-1.5">
                  Hours
                </p>
                <p className="font-sans text-sm font-light text-[#FAF4EE] m-0">
                  Mon–Fri · 10am – 6pm
                </p>
              </div>

              <div>
                <p className="font-sans text-[0.65rem] font-semibold tracking-[0.22em] text-[#C9AA6B] uppercase mb-1.5">
                  Phone
                </p>
                <a
                  href="tel:+919521466069"
                  className="font-sans text-sm font-light text-[#FAF4EE] no-underline"
                >
                  +91 9521466069
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: Form Card */}
          <div className="bg-[#16120F] border border-[#2A1F16] rounded-2xl p-7 md:p-9 flex flex-col gap-5">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-[0.65rem] font-semibold tracking-[0.2em] text-[#7A6A58] uppercase">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={inputClass('name')}
                />
                {errors.name && <span className="text-[10px] text-red-400">{errors.name}</span>}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-[0.65rem] font-semibold tracking-[0.2em] text-[#7A6A58] uppercase">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                  className={inputClass('email')}
                />
                {errors.email && <span className="text-[10px] text-red-400">{errors.email}</span>}
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-[0.65rem] font-semibold tracking-[0.2em] text-[#7A6A58] uppercase">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className={inputClass('subject')}
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-[0.65rem] font-semibold tracking-[0.2em] text-[#7A6A58] uppercase">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us a little more..."
                  rows={4}
                  className={`${inputClass('message')} resize-none`}
                />
                {errors.message && <span className="text-[10px] text-red-400">{errors.message}</span>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-lg font-sans text-xs font-semibold tracking-[0.2em] uppercase border-none cursor-pointer mt-1 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
                style={{ background: '#C9AA6B', color: '#0D0A08' }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

        </div>
      </main>

      {/* Ornamental Divider */}
      <div className="w-full flex items-center gap-0 px-0">
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#2E231A] to-[#3A2A1E]" />
        <span className="text-[#C9AA6B] text-xs px-4 select-none opacity-80">◆</span>
        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#2E231A] to-[#3A2A1E]" />
      </div>

      {/* Call To Action Banner — Find the one you keep */}
      <section className="w-full bg-[#0D0A08] py-20 md:py-28 px-4 flex flex-col items-center justify-center text-center">
        <h2 className="font-cormorant font-normal text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#FAF4EE] m-0 mb-8 leading-[1.05]">
          Find the one<br />
          you keep.
        </h2>
        <button
          onClick={handleShopClick}
          className="bg-[#C9AA6B] hover:bg-[#D4B879] text-[#14100C] font-sans text-[0.72rem] md:text-xs font-semibold tracking-[0.22em] uppercase px-8 py-3.5 rounded transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border-none cursor-pointer"
        >
          Shop The Collection
        </button>
      </section>

      <Footer onBrandClick={handleBrandClick} onNavigate={onNavigate} />
    </div>
  );
}
