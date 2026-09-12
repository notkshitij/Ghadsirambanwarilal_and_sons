import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { lookupPincode, reverseGeocode } from '../lib/locationUtils';

export default function AddressBook({ 
  user, 
  addresses = [], 
  onAddressesUpdated 
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [isLookingUpPincode, setIsLookingUpPincode] = useState(false);
  const [formError, setFormError] = useState('');
  const [locationNotice, setLocationNotice] = useState({ type: '', message: '' });
  const [deletingId, setDeletingId] = useState(null);

  const initialFormState = {
    label: 'Home',
    addressLine: '',
    landmark: '',
    pincode: '',
    city: '',
    state: '',
    isDefault: false,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [fieldErrors, setFieldErrors] = useState({});

  const openAddModal = () => {
    setEditingAddress(null);
    setFormData({
      ...initialFormState,
      isDefault: addresses.length === 0, // Default to true if first address
    });
    setFieldErrors({});
    setFormError('');
    setLocationNotice({ type: '', message: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (addr) => {
    setEditingAddress(addr);
    setFormData({
      label: addr.label || 'Home',
      addressLine: addr.address_line || addr.address || '',
      landmark: addr.landmark || '',
      pincode: addr.pincode || '',
      city: addr.city || '',
      state: addr.state || '',
      isDefault: !!addr.is_default,
    });
    setFieldErrors({});
    setFormError('');
    setLocationNotice({ type: '', message: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAddress(null);
    setFieldErrors({});
    setFormError('');
    setLocationNotice({ type: '', message: '' });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }

    // Auto lookup pincode when exactly 6 digits are entered
    if (name === 'pincode') {
      const cleanPin = value.replace(/\D/g, '').slice(0, 6);
      if (cleanPin.length === 6) {
        handleLookupPincode(cleanPin);
      }
    }
  };

  // Pincode Lookup Handler
  const handleLookupPincode = async (pin) => {
    setIsLookingUpPincode(true);
    setLocationNotice({ type: '', message: '' });

    const result = await lookupPincode(pin);
    setIsLookingUpPincode(false);

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

  // OpenStreetMap Nominatim Geolocation
  const handleUseCurrentLocation = () => {
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
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocationNotice({ type: 'info', message: 'Fetching address details from map...' });

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
      (error) => {
        setIsLocating(false);
        let errorMsg = 'Could not retrieve your location.';
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = 'Location permission was denied. Please allow location access or fill manually.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMsg = 'Location information is unavailable.';
        } else if (error.code === error.TIMEOUT) {
          errorMsg = 'Location request timed out. Please try again or type manually.';
        }
        setLocationNotice({
          type: 'error',
          message: errorMsg,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.addressLine.trim()) {
      errors.addressLine = 'Address line / house & street is required';
    }

    const cleanPin = formData.pincode.trim().replace(/\D/g, '');
    if (!cleanPin) {
      errors.pincode = 'Pincode is required';
    } else if (cleanPin.length !== 6) {
      errors.pincode = 'Pincode must be 6 digits';
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

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!user?.id) {
      setFormError('User session expired. Please log in again.');
      return;
    }

    setIsSaving(true);
    setFormError('');

    try {
      const cleanPin = formData.pincode.trim().replace(/\D/g, '');

      // 1. If setting as default, set all other addresses for this user to is_default = false
      if (formData.isDefault) {
        const { error: resetDefaultError } = await supabase
          .from('addresses')
          .update({ is_default: false })
          .eq('user_id', user.id);

        if (resetDefaultError) {
          console.warn('Could not reset other defaults:', resetDefaultError.message);
        }
      }

      // 2. Insert or update the address row
      const addressPayload = {
        user_id: user.id,
        label: formData.label,
        address_line: formData.addressLine.trim(),
        landmark: formData.landmark.trim() || null,
        pincode: cleanPin,
        city: formData.city.trim(),
        state: formData.state.trim(),
        is_default: formData.isDefault || addresses.length === 0,
      };

      if (editingAddress?.id) {
        const { error: updateError } = await supabase
          .from('addresses')
          .update(addressPayload)
          .eq('id', editingAddress.id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('addresses')
          .insert([addressPayload]);

        if (insertError) throw insertError;
      }

      // 3. Refresh parent address list and close modal
      if (onAddressesUpdated) {
        await onAddressesUpdated();
      }

      closeModal();
    } catch (err) {
      console.error('Error saving address:', err);
      setFormError(err.message || 'Failed to save address. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (!window.confirm('Are you sure you want to remove this delivery address?')) {
      return;
    }

    setDeletingId(addressId);
    try {
      const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', addressId);

      if (error) throw error;

      if (onAddressesUpdated) {
        await onAddressesUpdated();
      }
    } catch (err) {
      console.error('Error deleting address:', err);
      alert(err.message || 'Failed to delete address.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleSetDefault = async (addressId) => {
    try {
      // Set all to false first
      await supabase
        .from('addresses')
        .update({ is_default: false })
        .eq('user_id', user.id);

      // Set this one to true
      const { error } = await supabase
        .from('addresses')
        .update({ is_default: true })
        .eq('id', addressId);

      if (error) throw error;

      if (onAddressesUpdated) {
        await onAddressesUpdated();
      }
    } catch (err) {
      console.error('Error updating default address:', err);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#c89b3c]/20 pb-3">
        <div>
          <h3 className="font-sans text-xs font-semibold tracking-[0.2em] text-[#D4AF37] uppercase m-0">
            Delivery Addresses
          </h3>
          <p className="font-cormorant italic text-xs text-[#A69280] m-0 mt-0.5">
            Manage your saved delivery destinations
          </p>
        </div>
        
        <button
          type="button"
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#D4AF37] via-[#F4E3A1] to-[#C89B3C] hover:brightness-110 text-[#0D0A08] font-sans text-[0.72rem] font-semibold tracking-wider uppercase transition-all duration-300 shadow-md border-none cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add New Address
        </button>
      </div>

      {/* Address Cards Grid */}
      {addresses && addresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {addresses.map((addr) => {
            const isDefault = !!addr.is_default;
            const label = addr.label || 'Home';
            const addressLine = addr.address_line || addr.address || '';
            const landmark = addr.landmark;
            const city = addr.city || '';
            const state = addr.state || '';
            const pincode = addr.pincode || '';

            return (
              <div
                key={addr.id}
                className={`relative flex flex-col justify-between bg-[#16120F] border ${
                  isDefault ? 'border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.12)]' : 'border-[#c89b3c]/20 hover:border-[#c89b3c]/50'
                } p-5 transition-all duration-300 shadow-xl`}
              >
                <div>
                  {/* Top Bar: Label & Badges */}
                  <div className="flex justify-between items-center mb-3">
                    <span className="px-2.5 py-0.5 bg-[#0D0A08] border border-[#c89b3c]/30 text-[#D4AF37] text-[0.68rem] font-medium tracking-wider uppercase font-sans">
                      {label}
                    </span>
                    {isDefault && (
                      <span className="px-2.5 py-0.5 bg-gradient-to-r from-[#D4AF37]/20 to-[#c89b3c]/20 border border-[#D4AF37] text-[#F4E3A1] text-[0.65rem] font-semibold tracking-widest uppercase">
                        ★ Default
                      </span>
                    )}
                  </div>

                  {/* Full Address details */}
                  <div className="text-xs font-light text-[#A69280] leading-relaxed mb-4">
                    <p className="m-0 text-[#FAF4EE] font-normal text-[0.85rem]">{addressLine}</p>
                    {landmark && (
                      <p className="m-0 text-[0.72rem] text-[#A69280] italic mt-0.5">
                        Landmark: {landmark}
                      </p>
                    )}
                    <p className="m-0 mt-1 text-[#D9C8B4]">
                      {city}{city && state ? ', ' : ''}{state} {pincode ? `- ${pincode}` : ''}
                    </p>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-[#c89b3c]/15 text-xs">
                  <div>
                    {!isDefault && (
                      <button
                        type="button"
                        onClick={() => handleSetDefault(addr.id)}
                        className="text-[0.7rem] text-[#A69280] hover:text-[#D4AF37] underline underline-offset-2 transition-colors bg-transparent border-none p-0 cursor-pointer"
                      >
                        Set as default
                      </button>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => openEditModal(addr)}
                      className="text-[0.72rem] font-semibold text-[#D4AF37] hover:text-[#F4E3A1] uppercase tracking-wider bg-transparent border-none p-0 cursor-pointer transition-colors"
                    >
                      Edit
                    </button>
                    <span className="text-[#c89b3c]/30">|</span>
                    <button
                      type="button"
                      disabled={deletingId === addr.id}
                      onClick={() => handleDeleteAddress(addr.id)}
                      className="text-[0.72rem] font-semibold text-red-400/80 hover:text-red-400 uppercase tracking-wider bg-transparent border-none p-0 cursor-pointer transition-colors disabled:opacity-50"
                    >
                      {deletingId === addr.id ? 'Removing...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-[#16120F] border border-[#c89b3c]/20 p-8 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full border border-[#c89b3c]/30 flex items-center justify-center mb-3 text-[#D4AF37]/60">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p className="font-display text-sm text-[#FAF4EE] m-0 mb-1">
            No Saved Delivery Addresses
          </p>
          <p className="font-cormorant italic text-xs text-[#A69280] max-w-sm m-0 mb-5">
            Add your primary shipping destination for smooth and secure heritage deliveries.
          </p>
          <button
            type="button"
            onClick={openAddModal}
            className="px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] via-[#F4E3A1] to-[#C89B3C] text-[#0D0A08] font-sans text-xs font-semibold tracking-wider uppercase transition-all shadow border-none cursor-pointer"
          >
            + Add First Address
          </button>
        </div>
      )}

      {/* Add / Edit Address Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D0A08]/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#16120F] border border-[#c89b3c]/40 shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-[#c89b3c]/20 pb-4 mb-6">
              <div>
                <span className="font-sans text-[0.68rem] font-semibold tracking-[0.2em] text-[#D4AF37] uppercase">
                  {editingAddress ? 'Modify Address' : 'New Destination'}
                </span>
                <h3 className="font-display font-light text-2xl text-[#FAF4EE] uppercase m-0 mt-0.5">
                  {editingAddress ? 'Edit Delivery Address' : 'Add Delivery Address'}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="text-[#A69280] hover:text-[#FAF4EE] bg-transparent border-none cursor-pointer p-1 text-xl leading-none"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Error or Notice Banners */}
            {formError && (
              <div className="mb-5 p-3 bg-red-950/40 border border-red-500/50 text-red-300 text-xs font-sans">
                {formError}
              </div>
            )}

            {locationNotice.message && (
              <div
                className={`mb-5 p-3 text-xs font-sans border ${
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

            {/* Location Detection Button */}
            <div className="mb-6 p-4 bg-[#0D0A08] border border-[#c89b3c]/25 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#16120F] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <div>
                  <span className="block text-xs font-medium text-[#FAF4EE]">Auto-Detect Location</span>
                  <span className="block text-[0.7rem] text-[#A69280]">Fill street, city & state via GPS</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleUseCurrentLocation}
                disabled={isLocating}
                className="w-full sm:w-auto px-4 py-2 border border-[#D4AF37] hover:bg-[#D4AF37]/10 text-[#D4AF37] hover:text-[#F4E3A1] font-sans text-[0.72rem] font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLocating ? (
                  <>
                    <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
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
            <form onSubmit={handleSaveAddress} className="flex flex-col gap-4">
              {/* Label Selection (Home / Work / Other) */}
              <div className="flex flex-col">
                <label className="text-[0.7rem] uppercase tracking-wider text-[#A69280] mb-1.5">
                  Address Type (Label)
                </label>
                <div className="flex gap-3">
                  {['Home', 'Work', 'Other'].map((lbl) => (
                    <label
                      key={lbl}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 border cursor-pointer transition-colors text-xs uppercase tracking-wider ${
                        formData.label === lbl
                          ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#FAF4EE] font-semibold'
                          : 'bg-[#0D0A08] border-[#c89b3c]/30 text-[#A69280] hover:border-[#c89b3c]/60'
                      }`}
                    >
                      <input
                        type="radio"
                        name="label"
                        value={lbl}
                        checked={formData.label === lbl}
                        onChange={handleInputChange}
                        className="hidden"
                      />
                      {lbl}
                    </label>
                  ))}
                </div>
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
                  placeholder="Flat / House no, Building name, Street address"
                  className={`w-full bg-[#0D0A08] border ${
                    fieldErrors.addressLine ? 'border-red-500' : 'border-[#c89b3c]/30 focus:border-[#D4AF37]'
                  } py-2.5 px-3 text-xs text-[#FAF4EE] placeholder-[#665a50] font-sans outline-none transition-colors resize-none`}
                />
                {fieldErrors.addressLine && (
                  <span className="text-[10px] text-red-400 mt-1">{fieldErrors.addressLine}</span>
                )}
              </div>

              {/* Landmark */}
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
                    {isLookingUpPincode && (
                      <span className="text-[9px] text-[#D4AF37] animate-pulse">Checking...</span>
                    )}
                  </div>
                  <input
                    type="text"
                    name="pincode"
                    maxLength="6"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    onBlur={() => lookupPincode(formData.pincode)}
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

              {/* Set as Default checkbox */}
              <label className="flex items-center gap-2.5 mt-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleInputChange}
                  className="w-4 h-4 accent-[#D4AF37] cursor-pointer"
                />
                <span className="text-xs text-[#D9C8B4] font-sans">
                  Set as default delivery address
                </span>
              </label>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-[#c89b3c]/20">
                <button
                  type="button"
                  onClick={closeModal}
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
                    'Save Address'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
