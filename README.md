# 🏋️ Gym Pro - Member Management System

A modern web application to manage gym members, track memberships, and send automated email reminders before expiry.

---

🌐 Live Demo

👉 https://gym-pro-eosin.vercel.app

---

🚀 Features

- 📋 Add, update, delete members (CRUD)
- 🔍 Search members by name
- 📊 Dashboard with member overview
- 📅 Membership expiry tracking
- 📧 Automated email reminders before expiry
- ⚡ Fast and responsive UI

---

🛠️ Tech Stack

- Frontend: Next.js
- Backend: Next.js API Routes
- Database: MongoDB
- Email Service: Nodemailer (Gmail SMTP)
- Deployment: Vercel

---

📁 Project Structure

app/
 ├── api/
 │   ├── members/
 │   ├── member/[id]/
 │   └── send-reminders/
 ├── dashboard/
 └── page.js

lib/
 └── mongodb.js

models/
 └── Member.js

---

⚙️ Environment Variables

Create a ".env.local" file:

MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

---

▶️ Run Locally

npm install
npm run dev

App runs on:

http://localhost:3000

---

🌐 API Endpoints

Get All Members

GET /api/members

Create Member

POST /api/members

Get Single Member

GET /api/member/:id

Update Member

PUT /api/member/:id

Delete Member

DELETE /api/member/:id

Send Reminder Emails

GET /api/send-reminders

---

⏰ Cron Job (Vercel)

{
  "crons": [
    {
      "path": "/api/send-reminders",
      "schedule": "30 3 * * *"
    }
  ]
}

«Runs daily at 9:00 AM IST»

---

📧 Email Automation

- Automatically sends reminder emails
- Targets members whose membership is about to expire
- Uses Gmail App Password for secure authentication

---

💰 Pricing Model (Optional)

- ₹399/month per gym
- Scalable for multiple clients

---

🔥 Status

✅ Live & Deployed
✅ Cron Job Working
✅ Email Automation Active
✅ Ready for Real Clients

---

👨‍💻 Author

Built by Lavkush 🚀

---

⭐ Note

This project is built for real-world usage and can be sold to gym owners to manage memberships and automate reminders efficiently.

---
