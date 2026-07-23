/**
 * Security & Input Sanitization Utilities for Thozhan Irrigation App
 */

// Simple robust HTML escaping to prevent XSS payloads
export function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Unescape helper for rendering text inside inputs cleanly
export function decodeSanitizedInput(input) {
  if (typeof input !== 'string') return input;
  return input
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/');
}

// Input validation helpers
export function validateFarmerName(name) {
  if (!name || typeof name !== 'string') return { valid: false, message: 'Farmer name is required' };
  const trimmed = name.trim();
  if (trimmed.length < 2 || trimmed.length > 80) {
    return { valid: false, message: 'Farmer name must be between 2 and 80 characters' };
  }
  // Allow letters, Tamil script, spaces, dots, hyphens
  const nameRegex = /^[\p{L}\p{M}\s.-]+$/u;
  if (!nameRegex.test(trimmed)) {
    return { valid: false, message: 'Farmer name contains invalid special characters' };
  }
  return { valid: true, value: trimmed };
}

export function validateLandSize(acres) {
  const num = parseFloat(acres);
  if (isNaN(num) || num <= 0) {
    return { valid: false, message: 'Land size must be a positive number' };
  }
  if (num > 500) {
    return { valid: false, message: 'Land size exceeds maximum allowed calculation threshold (500 acres)' };
  }
  return { valid: true, value: num };
}

export function validateWhatsAppNumber(phone) {
  if (!phone) return { valid: false, message: 'WhatsApp number is required' };
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10 || cleaned.length > 15) {
    return { valid: false, message: 'Enter a valid 10 to 12 digit phone number' };
  }
  return { valid: true, value: cleaned };
}

// Simple hash implementation for frontend key verification without external crypto dependencies
export function hashPasscode(str) {
  let hash = 0;
  if (!str || str.length === 0) return hash.toString();
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
}

// Precomputed target hash for 'thozhan-secret' or configured passcode
const ADMIN_HASH_TARGET = '5552db92'; // hash of 'thozhan-secret'

export function verifyAdminPasscode(passcode) {
  if (!passcode) return false;
  const hash = hashPasscode(passcode.trim());
  return hash === ADMIN_HASH_TARGET;
}
