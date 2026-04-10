'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem('gymAuth');
    router.push('/');
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <span className={styles.brandIcon}>💪</span>
        <span className={styles.brandName}>GymPro</span>
      </div>
      <div className={styles.links}>
        <Link href="/dashboard" className={styles.navLink}>
          Dashboard
        </Link>
        <Link href="/add-member" className={styles.navLink}>
          Add Member
        </Link>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </nav>
  );
}
