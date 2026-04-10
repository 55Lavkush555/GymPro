# 🏋️ Gym Management System (Demo)

A simple and modern Gym Management System built using **Next.js (App Router)** with **JavaScript** and **Vanilla CSS**. This project is designed as a demo for gym owners to manage members and track membership status easily.

🔗 **Live Demo:** https://gym-pro-eosin.vercel.app/

---

## 🚀 Features

### 🔐 Authentication

* Simple password-based login
* Protected dashboard (unauthorized users redirected)
* Auth state stored in localStorage

---

### 👥 Member Management

* Add new members with:

  * Name
  * Phone
  * Email
  * Plan (Monthly, Quarterly, Yearly)
  * Start Date
* Automatic expiry date calculation

---

### 📊 Dashboard

* View all members in card layout
* Each card displays:

  * Full member details
  * Membership status

---

### 🟢 Status Indicators

* 🟢 Active → More than 3 days left
* 🟡 Expiring Soon → Within 3 days
* 🔴 Expired → Membership ended

---

### 📂 Smart Filtering Tabs

* All Members
* Active Members
* Expiring Soon
* Expired Members

---

### 🔍 Search

* Real-time search by member name
* Works with filters

---

### ✏️ Edit & 🗑️ Delete

* Edit member details easily
* Auto-update expiry on changes
* Delete members with confirmation

---

### 📈 Stats Overview

* Total members count
* Active / Expiring / Expired counts

---

### 🚪 Logout

* Secure logout
* Clears authentication from localStorage

---

## 🛠️ Tech Stack

* **Next.js 13+ (App Router)**
* **JavaScript (No TypeScript)**
* **Vanilla CSS**
* **localStorage (No backend)**

---

## 📁 Project Structure

```
/app
  /dashboard
  /add-member
  page.js
  layout.js

/components
  MemberCard.js
  Navbar.js
  Form.js

/utils
  dateUtils.js
  statusUtils.js
```

---

## ⚙️ How It Works

* Data is stored in **localStorage**
* On first load, dummy members are added
* Expiry date is calculated automatically based on plan
* Status is derived dynamically from current date

---

## 📌 Note

This is a **demo project** and does not include a backend or database. It is intended for showcasing functionality and UI/UX.

---

## 💡 Future Improvements

* Email / WhatsApp notifications for expiring memberships
* Backend integration (Firebase / Node.js)
* Admin dashboard with analytics
* Multi-user support

---

## 👨‍💻 Author

Built with ❤️ by a passionate developer.

---

## ⭐ If you like this project

Give it a ⭐ on GitHub and share your feedback!
