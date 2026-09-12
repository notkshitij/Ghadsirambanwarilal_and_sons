import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { lookupPincode, reverseGeocode } from '../lib/locationUtils';

export default function CompleteProfilePage({ onComplete, onLogout }) {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    phone: '',
    addressLine: '',
    landmark: '',
    pincode: '',
    city: '',
    state: '',
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [isLookingUpPin, setIsLookingUpPin] = useState(false);
  const [formError, setFormError] = useState('');
  const [locationNotice, setLocationNotice] = useState({ type: '', message: '' });

  useEffect(() => {
    let isMounted = true;
    supabase.auth.getUser().then(({ data: { user: currentUser } }) => {
      if (isMounted && currentUser) {
        setUser(currentUser);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }

    if (name === 'pincode') {
      const clean = value.replace(/\D/g, '').slice(0, 6);
      if (clean.length === 6) {
        handlePincodeLookup(clean);
      }
    }
  };

  const handlePincodeLookup = async (pin) => {
    setIsLookingUpPin(true);
    setLocationNotice({ type: '', message: '' });

    const result = await lookupPincode(pin);
    setIsLookingUpPin(false);

    if (result.success) {
      setFormData((prev) => ({
        ...prev,
        city: result.city || prev.city,
        state: result.state || prev.state,
      }));
      setLocationNotice({
        type: 'success',
        message: result.message,
      });
    } else if (result.message) {
      setLocationNotice({
        type: 'info',
        message: result.message,
      });
    }
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setLocationNotice({
        type: 'error',
        message: 'Geolocation is not supported by your browser.',
      });
      return;
    }

    setIsLocating(true);
    setLocationNotice({ type: 'info', message: 'Requesting GPS coordinates...' });

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocationNotice({ type: 'info', message: 'Resolving address from map...' });

        const result = await reverseGeocode(latitude, longitude);
        setIsLocating(false);

        if (result.success) {
          setFormData((prev) => ({
            ...prev,
            addressLine: result.addressLine || prev.addressLine,
            city: result.city || prev.city,
            state: result.state || prev.state,
            pincode: result.pincode || prev.pincode,
          }));
          setLocationNotice({
            type: 'success',
            message: result.message,
          });
        } else {
          setLocationNotice({
            type: 'error',
            message: result.message,
          });
        }
      },
      (err) => {
        setIsLocating(false);
        let msg = 'Could not retrieve your location.';
        if (err.code === err.PERMISSION_DENIED) {
          msg = 'Location permission was denied. Please fill in details manually.';
        } else if (err.code === err.TIMEOUT) {
          msg = 'Location request timed out. Please enter manually.';
        }
        setLocationNotice({ type: 'error', message: msg });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const validate = () => {
    const errors = {};

    const cleanPhone = formData.phone.trim().replace(/\D/g, '');
    if (!cleanPhone) {
      errors.phone = 'Mobile number is required';
    } else if (cleanPhone.length !== 10) {
      errors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.addressLine.trim()) {
      errors.addressLine = 'Address line / House No. & Street is required';
    }

    const cleanPin = formData.pincode.trim().replace(/\D/g, '');
    if (!cleanPin) {
      errors.pincode = 'Pincode is required';
    } else if (cleanPin.length !== 6) {
      errors.pincode = 'Pincode must be exactly 6 digits';
    }

    if (!formData.city.trim()) {
      errors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      errors.state = 'State is required';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (!user?.id) {
      setFormError('Authentication session not found. Please log in again.');
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    try {
      const cleanPhone = formData.phone.trim().replace(/\D/g, '');
      const cleanPin = formData.pincode.trim().replace(/\D/g, '');

      // 1. Upsert into profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          phone: cleanPhone,
        });

      if (profileError) {
        throw new Error(`Profile update failed: ${profileError.message}`);
      }

      // 2. Insert primary delivery address
      const { error: addressError } = await supabase
        .from('addresses')
        .insert([
          {
            user_id: user.id,
            label: 'Home',
            address_line: formData.addressLine.trim(),
            landmark: formData.landmark.trim() || null,
            pincode: cleanPin,
            city: formData.city.trim(),
            state: formData.state.trim(),
            is_default: true,
          },
        ]);

      if (addressError) {
        throw new Error(`Address creation failed: ${addressError.message}`);
      }

      // 3. Notify parent component to refresh state and release gate
      if (onComplete) {
        await onComplete();
      }
    } catch (err) {
      console.error('Error completing profile:', err);
      setFormError(err.message || 'Failed to complete profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayName = 
    user?.user_metadata?.full_name || 
    user?.user_metadata?.name || 
    user?.email?.split('@')[0] || 
    'Esteemed Patron';

  const userEmail = user?.email || '';

  return (
    <div className="w-full min-h-screen bg-[#0D0A08] flex flex-col justify-between text-[#FAF4EE] font-sans relative overflow-x-hidden">
      {/* Background Subtle Heritage Vignette */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#16120F]/60 via-[#0D0A08] to-[#0D0A08] pointer-events-none z-0" />

      {/* Top Bar with Brand & Log Out option only */}
      <header className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-8 pb-4 flex justify-between items-center border-b border-[#c89b3c]/20">
        <div className="flex items-center gap-3">
          <img
            src="/flowers.png"
            alt="Ghadsiram Logo"
            className="w-8 h-8 object-contain drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]"
          />
          <span className="font-display font-light text-sm md:text-base tracking-[0.14em] text-[#FAF4EE] uppercase">
            Ghadsiram Banwarilal &amp; Sons
          </span>
        </div>

        {onLogout && (
          <button
            type="button"
            onClick={onLogout}
            className="text-[0.72rem] text-[#A69280] hover:text-red-400 uppercase tracking-wider bg-transparent border-none p-0 cursor-pointer transition-colors"
          >
            Log Out
          </button>
        )}
      </header>

      {/* Main Content Form Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[560px] bg-[#16120F] border border-[#c89b3c]/35 shadow-2xl p-7 md:p-10 my-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <span className="font-sans text-[0.7rem] font-semibold tracking-[0.24em] text-[#D4AF37] uppercase">
              Welcome to the House of Heritage
            </span>
            <h1 className="font-display font-light text-2xl md:text-3xl text-[#FAF4EE] tracking-[0.06em] uppercase m-0 mt-1">
              Complete Your Profile
            </h1>
            <p className="font-cormorant italic text-sm text-[#D9C8B4] m-0 mt-2 max-w-md mx-auto">
              Welcome, <span className="text-[#FAF4EE] font-medium">{displayName}</span> ({userEmail}). Please provide your contact &amp; primary delivery details to unlock your curated shopping space.
            </p>
          </div>

          {/* Form Error Message */}
          {formError && (
            <div className="mb-6 p-3.5 bg-red-950/50 border border-red-500/50 text-red-300 text-xs font-sans">
              {formError}
            </div>
          )}

          {/* Location status notice */}
          {locationNotice.message && (
            <div
              className={`mb-6 p-3 text-xs font-sans border ${
                locationNotice.type === 'success'
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                  : locationNotice.type === 'error'
                  ? 'bg-red-950/40 border-red-500/50 text-red-300'
                  : 'bg-[#0D0A08] border-[#c89b3c]/40 text-[#F4E3A1]'
              }`}
            >
              {locationNotice.message}
            </div>
          )}

          {/* GPS Auto-detect banner */}
          <div className="mb-6 p-3.5 bg-[#0D0A08] border border-[#c89b3c]/25 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#16120F] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <div className="text-left">
                <span className="block text-xs font-medium text-[#FAF4EE]">Auto-Fill Address via GPS</span>
                <span className="block text-[0.68rem] text-[#A69280]">Fills street, city, state &amp; pincode</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleUseLocation}
              disabled={isLocating}
              className="w-full sm:w-auto px-3.5 py-1.5 border border-[#D4AF37] hover:bg-[#D4AF37]/10 text-[#D4AF37] hover:text-[#F4E3A1] font-sans text-[0.7rem] font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 shrink-0"
            >
              {isLocating ? (
                <>
                  <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Locating...
                </>
              ) : (
                'Use Current Location'
              )}
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Mobile Number */}
            <div className="flex flex-col">
              <label className="text-[0.7rem] uppercase tracking-wider text-[#A69280] mb-1">
                Mobile Number *
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-xs text-[#A69280] select-none font-sans">+91</span>
                <input
                  type="tel"
                  name="phone"
                  maxLength="10"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="10-digit mobile number"
                  className={`w-full bg-[#0D0A08] border ${
                    fieldErrors.phone ? 'border-red-500' : 'border-[#c89b3c]/30 focus:border-[#D4AF37]'
                  } py-2.5 pl-11 pr-3 text-xs text-[#FAF4EE] placeholder-[#665a50] font-sans outline-none transition-colors`}
                />
              </div>
              {fieldErrors.phone && (
                <span className="text-[10px] text-red-400 mt-1">{fieldErrors.phone}</span>
              )}
            </div>

            {/* Address Line / Street */}
            <div className="flex flex-col">
              <label className="text-[0.7rem] uppercase tracking-wider text-[#A69280] mb-1">
                Address Line / House No. &amp; Street *
              </label>
              <textarea
                name="addressLine"
                rows="2"
                value={formData.addressLine}
                onChange={handleInputChange}
                placeholder="House/Flat number, Building name, Street name"
                className={`w-full bg-[#0D0A08] border ${
                  fieldErrors.addressLine ? 'border-red-500' : 'border-[#c89b3c]/30 focus:border-[#D4AF37]'
                } py-2.5 px-3 text-xs text-[#FAF4EE] placeholder-[#665a50] font-sans outline-none transition-colors resize-none`}
              />
              {fieldErrors.addressLine && (
                <span className="text-[10px] text-red-400 mt-1">{fieldErrors.addressLine}</span>
              )}
            </div>

            {/* Landmark (Optional) */}
            <div className="flex flex-col">
              <label className="text-[0.7rem] uppercase tracking-wider text-[#A69280] mb-1">
                Landmark <span className="lowercase text-[#665a50]">(optional)</span>
              </label>
              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleInputChange}
                placeholder="e.g. Near City Palace, Behind Grand Hotel"
                className="w-full bg-[#0D0A08] border border-[#c89b3c]/30 focus:border-[#D4AF37] py-2.5 px-3 text-xs text-[#FAF4EE] placeholder-[#665a50] font-sans outline-none transition-colors"
              />
            </div>

            {/* Pincode, City, State Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Pincode */}
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[0.7rem] uppercase tracking-wider text-[#A69280]">
                    Pincode *
                  </label>
                  {isLookingUpPin && (
                    <span className="text-[9px] text-[#D4AF37] animate-pulse">Checking...</span>
                  )}
                </div>
                <input
                  type="text"
                  name="pincode"
                  maxLength="6"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  onBlur={() => handlePincodeLookup(formData.pincode)}
                  placeholder="6 Digits"
                  className={`w-full bg-[#0D0A08] border ${
                    fieldErrors.pincode ? 'border-red-500' : 'border-[#c89b3c]/30 focus:border-[#D4AF37]'
                  } py-2.5 px-3 text-xs text-[#FAF4EE] placeholder-[#665a50] font-sans outline-none transition-colors`}
                />
                {fieldErrors.pincode && (
                  <span className="text-[10px] text-red-400 mt-1">{fieldErrors.pincode}</span>
                )}
              </div>

              {/* City */}
              <div className="flex flex-col">
                <label className="text-[0.7rem] uppercase tracking-wider text-[#A69280] mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className={`w-full bg-[#0D0A08] border ${
                    fieldErrors.city ? 'border-red-500' : 'border-[#c89b3c]/30 focus:border-[#D4AF37]'
                  } py-2.5 px-3 text-xs text-[#FAF4EE] placeholder-[#665a50] font-sans outline-none transition-colors`}
                />
                {fieldErrors.city && (
                  <span className="text-[10px] text-red-400 mt-1">{fieldErrors.city}</span>
                )}
              </div>

              {/* State */}
              <div className="flex flex-col">
                <label className="text-[0.7rem] uppercase tracking-wider text-[#A69280] mb-1">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="State"
                  className={`w-full bg-[#0D0A08] border ${
                    fieldErrors.state ? 'border-red-500' : 'border-[#c89b3c]/30 focus:border-[#D4AF37]'
                  } py-2.5 px-3 text-xs text-[#FAF4EE] placeholder-[#665a50] font-sans outline-none transition-colors`}
                />
                {fieldErrors.state && (
                  <span className="text-[10px] text-red-400 mt-1">{fieldErrors.state}</span>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6 pt-4 border-t border-[#c89b3c]/20">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#F4E3A1] to-[#C89B3C] hover:brightness-110 text-[#0D0A08] font-sans text-xs font-semibold tracking-[0.2em] uppercase transition-all shadow-xl border-none cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Saving Profile Details...
                  </>
                ) : (
                  'Complete Profile & Enter Boutique'
                )}
              </button>
            </div>
          </form>

        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 py-6 text-center text-xs text-[#A69280] font-cormorant italic">
        Ghadsiram Banwarilal &amp; Sons &mdash; Handcrafted Heritage Jewellery since 1928.
      </footer>
    </div>
  );
}
