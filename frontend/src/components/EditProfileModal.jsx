import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function EditProfileModal({
  isOpen,
  onClose,
  user,
  currentName,
  currentPhone,
  onProfileUpdated,
}) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setFullName(currentName || '');
      // Clean leading +91 or non-digits if present
      const cleanPhone = (currentPhone || '').replace(/\+91\s?/, '').replace(/\D/g, '');
      setPhone(cleanPhone);
      setFieldErrors({});
      setErrorMsg('');
    }
  }, [isOpen, currentName, currentPhone]);

  if (!isOpen) return null;

  const validate = () => {
    const errors = {};
    if (!fullName.trim()) {
      errors.fullName = 'Full Name is required';
    }

    const clean = phone.trim().replace(/\D/g, '');
    if (clean && clean.length !== 10) {
      errors.phone = 'Please enter a valid 10-digit mobile number';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (!user?.id) {
      setErrorMsg('User session expired. Please log in again.');
      return;
    }

    setIsSaving(true);
    setErrorMsg('');

    try {
      const cleanPhone = phone.trim().replace(/\D/g, '');
      const trimmedName = fullName.trim();

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: trimmedName,
          phone: cleanPhone || null,
        });

      if (error) throw error;

      if (onProfileUpdated) {
        onProfileUpdated({
          full_name: trimmedName,
          phone: cleanPhone || null,
        });
      }

      onClose();
    } catch (err) {
      console.error('Error updating profile:', err);
      setErrorMsg(err.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D0A08]/85 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-[#16120F] border border-[#c89b3c]/40 shadow-2xl p-6 sm:p-8">
        {/* Modal Header */}
        <div className="flex justify-between items-start border-b border-[#c89b3c]/20 pb-4 mb-6">
          <div>
            <span className="font-sans text-[0.68rem] font-semibold tracking-[0.2em] text-[#D4AF37] uppercase">
              Patron Information
            </span>
            <h3 className="font-display font-light text-2xl text-[#FAF4EE] uppercase m-0 mt-0.5">
              Edit Profile
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#A69280] hover:text-[#FAF4EE] bg-transparent border-none cursor-pointer p-1 text-xl leading-none"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Error Notice */}
        {errorMsg && (
          <div className="mb-5 p-3 bg-red-950/40 border border-red-500/50 text-red-300 text-xs font-sans">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSave} className="flex flex-col gap-5">
          {/* Full Name */}
          <div className="flex flex-col">
            <label className="text-[0.7rem] uppercase tracking-wider text-[#A69280] mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (fieldErrors.fullName) setFieldErrors((prev) => ({ ...prev, fullName: '' }));
              }}
              placeholder="Your full name"
              className={`w-full bg-[#0D0A08] border ${
                fieldErrors.fullName ? 'border-red-500' : 'border-[#c89b3c]/30 focus:border-[#D4AF37]'
              } py-2.5 px-3 text-xs text-[#FAF4EE] placeholder-[#665a50] font-sans outline-none transition-colors`}
            />
            {fieldErrors.fullName && (
              <span className="text-[10px] text-red-400 mt-1">{fieldErrors.fullName}</span>
            )}
          </div>

          {/* Mobile Number */}
          <div className="flex flex-col">
            <label className="text-[0.7rem] uppercase tracking-wider text-[#A69280] mb-1">
              Mobile Number <span className="lowercase text-[#665a50]">(optional)</span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-xs text-[#A69280] select-none font-sans">+91</span>
              <input
                type="tel"
                name="phone"
                maxLength="10"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (fieldErrors.phone) setFieldErrors((prev) => ({ ...prev, phone: '' }));
                }}
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

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 mt-3 pt-4 border-t border-[#c89b3c]/20">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-5 py-2.5 border border-[#c89b3c]/30 hover:border-[#c89b3c]/60 text-[#D9C8B4] font-sans text-xs tracking-wider uppercase transition-colors cursor-pointer bg-transparent"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] via-[#F4E3A1] to-[#C89B3C] hover:brightness-110 text-[#0D0A08] font-sans text-xs font-semibold tracking-wider uppercase transition-all shadow-lg border-none cursor-pointer disabled:opacity-50 flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
