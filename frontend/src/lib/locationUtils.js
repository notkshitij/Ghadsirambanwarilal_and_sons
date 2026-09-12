/**
 * Shared Geolocation & Pincode Lookup Utilities
 */

/**
 * Looks up district/city and state for an Indian 6-digit postal pincode.
 * @param {string} pincode - 6 digit string
 * @returns {Promise<{ success: boolean, city?: string, state?: string, message?: string }>}
 */
export async function lookupPincode(pincode) {
  const cleanPin = (pincode || '').toString().trim().replace(/\D/g, '').slice(0, 6);
  if (cleanPin.length !== 6) {
    return { success: false, message: 'Pincode must be exactly 6 digits.' };
  }

  try {
    const response = await fetch(`https://api.postalpincode.in/pincode/${cleanPin}`);
    if (!response.ok) {
      throw new Error(`Postal API responded with status ${response.status}`);
    }
    const data = await response.json();

    if (data && data[0] && data[0].Status === 'Success' && data[0].PostOffice && data[0].PostOffice.length > 0) {
      const primary = data[0].PostOffice[0];
      return {
        success: true,
        city: primary.District || primary.Division || '',
        state: primary.State || '',
        message: `Matched: ${primary.District || primary.Division}, ${primary.State}`,
      };
    }

    return {
      success: false,
      message: 'Pincode not found in national directory. Please enter City & State manually.',
    };
  } catch (err) {
    console.warn('Pincode lookup error:', err);
    return {
      success: false,
      message: 'Unable to reach postal directory. Please enter City & State manually.',
    };
  }
}

/**
 * Reverse geocodes latitude & longitude into road, locality, city, state, pincode using Nominatim OSM.
 * @param {number} latitude
 * @param {number} longitude
 * @returns {Promise<{ success: boolean, addressLine?: string, city?: string, state?: string, pincode?: string, message?: string }>}
 */
export async function reverseGeocode(latitude, longitude) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
      {
        headers: {
          'Accept-Language': 'en',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Map geocoding service returned status ${response.status}`);
    }

    const data = await response.json();
    const address = data.address || {};

    const road = address.road || address.pedestrian || address.street || '';
    const suburb = address.suburb || address.neighbourhood || address.residential || '';
    const houseNumber = address.house_number || '';
    const addressParts = [houseNumber, road, suburb].filter(Boolean);
    const addressLine = addressParts.length > 0 
      ? addressParts.join(', ') 
      : (data.display_name ? data.display_name.split(',').slice(0, 2).join(',') : '');

    const city = address.city || address.town || address.village || address.municipality || address.county || '';
    const state = address.state || '';
    const pincode = (address.postcode || '').replace(/\D/g, '').slice(0, 6);

    return {
      success: true,
      addressLine,
      city,
      state,
      pincode,
      message: 'Location auto-detected successfully.',
    };
  } catch (err) {
    console.error('Reverse geocode error:', err);
    return {
      success: false,
      message: 'Unable to resolve address from GPS. Please fill in details manually.',
    };
  }
}
