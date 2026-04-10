'use client';

export const DUMMY_MEMBERS = [
  {
    id: '1',
    name: 'Arjun Sharma',
    phone: '9876543210',
    email: 'arjun@example.com',
    plan: 'Monthly',
    startDate: '2026-04-01',
    expiryDate: '2026-05-01',
  },
  {
    id: '2',
    name: 'Priya Mehta',
    phone: '9988776655',
    email: 'priya@example.com',
    plan: 'Yearly',
    startDate: '2026-01-01',
    expiryDate: '2027-01-01',
  },
  {
    id: '3',
    name: 'Rohit Verma',
    phone: '9123456789',
    email: 'rohit@example.com',
    plan: 'Quarterly',
    startDate: '2026-03-15',
    expiryDate: '2026-06-13',
  },
  {
    id: '4',
    name: 'Sneha Kapoor',
    phone: '9001122334',
    email: 'sneha@example.com',
    plan: 'Monthly',
    startDate: '2026-04-08',
    expiryDate: '2026-05-08',
  },
];

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

export function loadMembers() {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('gymMembers');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('gymMembers', JSON.stringify(DUMMY_MEMBERS));
  return DUMMY_MEMBERS;
}

export function saveMembers(members) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('gymMembers', JSON.stringify(members));
}
