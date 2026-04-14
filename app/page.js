'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('gymAuth') === 'true') {
      router.push('/dashboard');
      router.refresh()
    }
  }, [router]);

  function handleLogin(e) {
    e.preventDefault();
    if (password === 'gym123') {
      localStorage.setItem('gymAuth', 'true');
      router.push('/dashboard');
    } else {
      setError('Incorrect password. Please try again.');
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>💪</span>
          <h1 className={styles.logoText}>GymPro</h1>
          <p className={styles.logoSub}>Gym Management System</p>
        </div>
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Admin Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Enter password"
              className={styles.input}
              autoFocus
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.loginBtn}>
            Login
          </button>
        </form>
        <p className={styles.hint}>Demo password: gym123</p>
      </div>
    </div>
  );
}
