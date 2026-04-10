'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import { loadMembers, saveMembers, calcExpiry } from '../../lib/members';
import styles from './add-member.module.css';

export default function AddMemberPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    plan: 'Monthly',
    startDate: new Date().toISOString().split('T')[0],
  });
  const [expiryDate, setExpiryDate] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('gymAuth') !== 'true') {
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    if (form.startDate && form.plan) {
      setExpiryDate(calcExpiry(form.startDate, form.plan));
    }
  }, [form.startDate, form.plan]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const members = loadMembers();
    const newMember = {
      id: Date.now().toString(),
      ...form,
      expiryDate,
    };
    const updated = [...members, newMember];
    saveMembers(updated);
    setSuccess(true);
    setForm({
      name: '',
      phone: '',
      email: '',
      plan: 'Monthly',
      startDate: new Date().toISOString().split('T')[0],
    });
    setTimeout(() => setSuccess(false), 3000);
  }

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Add New Member</h2>
            <p>Fill in the details to register a new gym member</p>
          </div>

          {success && (
            <div className={styles.successMsg}>
              Member added successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
              <div className={styles.field}>
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  required
                />
              </div>
              <div className={styles.field}>
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="e.g. 9876543210"
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="e.g. john@example.com"
                required
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.field}>
                <label>Membership Plan</label>
                <select name="plan" value={form.plan} onChange={handleChange}>
                  <option value="Monthly">Monthly (+30 days)</option>
                  <option value="Quarterly">Quarterly (+90 days)</option>
                  <option value="Yearly">Yearly (+365 days)</option>
                </select>
              </div>
              <div className={styles.field}>
                <label>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label>Expiry Date (auto-calculated)</label>
              <input
                type="date"
                value={expiryDate}
                readOnly
                className={styles.readOnly}
              />
            </div>

            <div className={styles.formActions}>
              <button type="button" onClick={() => router.push('/dashboard')} className={styles.cancelBtn}>
                Back to Dashboard
              </button>
              <button type="submit" className={styles.submitBtn}>
                Add Member
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
