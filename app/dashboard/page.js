'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import { getMemberStatus, calcExpiry } from '../../lib/members';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  const router = useRouter();
  const [members, setMembers] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [editMember, setEditMember] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('gymAuth') !== 'true') {
      router.push('/');
      return;
    }
    (async () => {
      let a = await fetch("/api/members").then(res => res.json()).catch(() => null)
      setMembers(a || []);
    })();

  }, [router]);

  const filtered = members.filter((m) => {
    const status = getMemberStatus(m.expiryDate);
    const matchTab =
      activeTab === 'All' ||
      (activeTab === 'Active' && status === 'Active') ||
      (activeTab === 'Expiring Soon' && status === 'Expiring Soon') ||
      (activeTab === 'Expired' && status === 'Expired');
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const counts = {
    total: members.length,
    active: members.filter((m) => getMemberStatus(m.expiryDate) === 'Active').length,
    expiring: members.filter((m) => getMemberStatus(m.expiryDate) === 'Expiring Soon').length,
    expired: members.filter((m) => getMemberStatus(m.expiryDate) === 'Expired').length,
  };

  function openEdit(member) {
    setEditMember(member);
    setEditForm({ ...member });
  }

  function closeEdit() {
    setEditMember(null);
    setEditForm({});
  }

  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditForm((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === 'plan' || name === 'startDate') {
        const plan = name === 'plan' ? value : prev.plan;
        const startDate = name === 'startDate' ? value : prev.startDate;
        if (plan && startDate) {
          updated.expiryDate = calcExpiry(startDate, plan);
        }
      }
      return updated;
    });
  }

  async function saveEdit(e) {
    e.preventDefault();

    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify(editForm);

    let response = await fetch(`/api/member/${editForm._id}`, {
      method: "PUT",
      body: bodyContent,
      headers: headersList
    });

    (async () => {
      let a = await fetch("/api/members").then(res => res.json()).catch(() => null)
      setMembers(a || []);
    })()
    closeEdit();
  }
  
  function confirmDelete(id) {
    setDeleteConfirm(id);
  }

  async function doDelete() {
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)"
    }
    
    let response = await fetch(`/api/member/${deleteConfirm}`, {
      method: "DELETE",
      headers: headersList
    });
    
    (async () => {
      let a = await fetch("/api/members").then(res => res.json()).catch(() => null)
      setMembers(a || []);
    })()
    setDeleteConfirm(null);
  }

  function statusDot(status) {
    if (status === 'Active') return styles.dotGreen;
    if (status === 'Expiring Soon') return styles.dotYellow;
    return styles.dotRed;
  }

  function statusBadge(status) {
    if (status === 'Active') return styles.badgeActive;
    if (status === 'Expiring Soon') return styles.badgeExpiring;
    return styles.badgeExpired;
  }

  const TABS = ['All', 'Active', 'Expiring Soon', 'Expired'];

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.pageTitle}>Member Dashboard</h2>

        <div className={styles.statsGrid}>
          <div className={`${styles.statCard} ${styles.statTotal}`}>
            <span className={styles.statNum}>{counts.total}</span>
            <span className={styles.statLabel}>Total Members</span>
          </div>
          <div className={`${styles.statCard} ${styles.statActive}`}>
            <span className={styles.statNum}>{counts.active}</span>
            <span className={styles.statLabel}>Active</span>
          </div>
          <div className={`${styles.statCard} ${styles.statExpiring}`}>
            <span className={styles.statNum}>{counts.expiring}</span>
            <span className={styles.statLabel}>Expiring Soon</span>
          </div>
          <div className={`${styles.statCard} ${styles.statExpired}`}>
            <span className={styles.statNum}>{counts.expired}</span>
            <span className={styles.statLabel}>Expired</span>
          </div>
        </div>

        <div className={styles.controls}>
          <div className={styles.tabs}>
            {TABS.map((tab) => (
              <button
                key={tab}
                className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        {filtered.length === 0 ? (
          <div className={styles.empty}>No members found.</div>
        ) : (
          <div className={styles.cardGrid}>
            {filtered.map((member) => {
              const status = getMemberStatus(member.expiryDate);
              return (
                <div key={member._id} className={styles.memberCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.memberName}>
                      <span className={`${styles.dot} ${statusDot(status)}`} />
                      {member.name}
                    </div>
                    <span className={`${styles.badge} ${statusBadge(status)}`}>{status}</span>
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>📞 Phone</span>
                      <span>{member.phone}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>✉️ Email</span>
                      <span>{member.email}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>🏋️ Plan</span>
                      <span>{member.plan}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>📅 Start</span>
                      <span>{member.startDate}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>⏳ Expiry</span>
                      <span>{member.expiryDate}</span>
                    </div>
                  </div>
                  <div className={styles.cardActions}>
                    <button className={styles.editBtn} onClick={() => openEdit(member)}>
                      Edit
                    </button>
                    <button className={styles.deleteBtn} onClick={() => confirmDelete(member._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {editMember && (
        <div className={styles.modalOverlay} onClick={closeEdit}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Edit Member</h3>
              <button className={styles.closeBtn} onClick={closeEdit}>✕</button>
            </div>
            <form onSubmit={saveEdit} className={styles.editForm}>
              <div className={styles.formField}>
                <label>Name</label>
                <input name="name" value={editForm.name || ''} onChange={handleEditChange} required />
              </div>
              <div className={styles.formField}>
                <label>Phone</label>
                <input name="phone" value={editForm.phone || ''} onChange={handleEditChange} required />
              </div>
              <div className={styles.formField}>
                <label>Email</label>
                <input type="email" name="email" value={editForm.email || ''} onChange={handleEditChange} required />
              </div>
              <div className={styles.formField}>
                <label>Plan</label>
                <select name="plan" value={editForm.plan || ''} onChange={handleEditChange}>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
              <div className={styles.formField}>
                <label>Start Date</label>
                <input type="date" name="startDate" value={editForm.startDate || ''} onChange={handleEditChange} required />
              </div>
              <div className={styles.formField}>
                <label>Expiry Date (auto-calculated)</label>
                <input type="date" name="expiryDate" value={editForm.expiryDate || ''} readOnly className={styles.readOnly} />
              </div>
              <div className={styles.modalActions}>
                <button type="button" onClick={closeEdit} className={styles.cancelBtn}>Cancel</button>
                <button type="submit" className={styles.saveBtn}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className={styles.modalOverlay} onClick={() => setDeleteConfirm(null)}>
          <div className={styles.confirmModal} onClick={(e) => e.stopPropagation()}>
            <h3>Delete Member?</h3>
            <p>Are you sure you want to delete this member? This action cannot be undone.</p>
            <div className={styles.confirmActions}>
              <button onClick={() => setDeleteConfirm(null)} className={styles.cancelBtn}>Cancel</button>
              <button onClick={doDelete} className={styles.deleteConfirmBtn}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
