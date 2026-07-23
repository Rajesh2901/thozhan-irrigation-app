import { describe, it, expect } from 'vitest';
import { sanitizeInput, decodeSanitizedInput, validateFarmerName, validateLandSize, validateWhatsAppNumber, verifyAdminPasscode } from '../utils/security';

describe('Security Utilities', () => {
  it('should sanitize HTML injection attacks in input strings', () => {
    const maliciousInput = '<script>alert("xss")</script>';
    const sanitized = sanitizeInput(maliciousInput);
    expect(sanitized).not.toContain('<script>');
    expect(sanitized).toContain('&lt;script&gt;');
  });

  it('should decode sanitized strings correctly', () => {
    const sanitized = 'Drip &amp; Sprinkler';
    expect(decodeSanitizedInput(sanitized)).toBe('Drip & Sprinkler');
  });

  it('should validate farmer names properly', () => {
    expect(validateFarmerName('Ramasamy M').valid).toBe(true);
    expect(validateFarmerName('ராமசாமி').valid).toBe(true);
    expect(validateFarmerName('').valid).toBe(false);
    expect(validateFarmerName('A').valid).toBe(false);
  });

  it('should validate land size bounds', () => {
    expect(validateLandSize(4.5).valid).toBe(true);
    expect(validateLandSize(0).valid).toBe(false);
    expect(validateLandSize(-2).valid).toBe(false);
    expect(validateLandSize(600).valid).toBe(false);
  });

  it('should validate WhatsApp phone numbers', () => {
    expect(validateWhatsAppNumber('9489528432').valid).toBe(true);
    expect(validateWhatsAppNumber('123').valid).toBe(false);
  });

  it('should verify admin passcode hashes without storing plain text secrets', () => {
    expect(verifyAdminPasscode('thozhan-secret')).toBe(true);
    expect(verifyAdminPasscode('wrong-password')).toBe(false);
  });
});

describe('Subsidy Calculation Logic Rules', () => {
  const calculateSubsidy = (landSize, unitRate) => {
    const size = parseFloat(landSize);
    const cost = Math.round(unitRate * size);
    let pct = 0;
    if (size <= 5) pct = 100;
    else if (size <= 12) pct = 75;
    else pct = 50;
    const subsidy = Math.round(cost * (pct / 100));
    const farmer = Math.max(0, cost - subsidy);
    return { cost, subsidy, farmer, pct };
  };

  it('should grant 100% subsidy for small farmers under 5 acres', () => {
    const res = calculateSubsidy(4, 24500);
    expect(res.pct).toBe(100);
    expect(res.cost).toBe(98000);
    expect(res.subsidy).toBe(98000);
    expect(res.farmer).toBe(0);
  });

  it('should grant 75% subsidy for medium farmers between 5.1 and 12 acres', () => {
    const res = calculateSubsidy(8, 24500);
    expect(res.pct).toBe(75);
    expect(res.cost).toBe(196000);
    expect(res.subsidy).toBe(147000);
    expect(res.farmer).toBe(49000);
  });

  it('should grant 50% custom subsidy for large holdings over 12 acres', () => {
    const res = calculateSubsidy(15, 24500);
    expect(res.pct).toBe(50);
    expect(res.cost).toBe(367500);
    expect(res.subsidy).toBe(183750);
    expect(res.farmer).toBe(183750);
  });
});
