'use client';


export function calcExpiry(startDate, plan) {
  const start = new Date(startDate);
  let days = 30;
  if (plan === 'Quarterly') days = 90;
  if (plan === 'Yearly') days = 365;
  const expiry = new Date(start);
  expiry.setDate(expiry.getDate() + days);
  return expiry.toISOString().split('T')[0];
}

export function getMemberStatus(expiryDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(expiryDate);
  expiry.setHours(0, 0, 0, 0);
  const diffMs = expiry - today;
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return 'Expired';
  if (diffDays <= 3) return 'Expiring Soon';
  return 'Active';
}

