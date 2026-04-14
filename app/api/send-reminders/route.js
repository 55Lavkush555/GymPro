import { connectDB } from "@/lib/mongodb";
import Member from "@/models/Member";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET() {
  try {
    await connectDB();

    const today = new Date();

    // 📧 transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const members = await Member.find({}); // 🔥 sab lao (filter JS me karenge)

    let sentCount = 0;

    for (let m of members) {
      // 🔥 string → Date convert
      const expiry = new Date(m.expiryDate);

      const diffDays = Math.ceil(
        (expiry - today) / (1000 * 60 * 60 * 24)
      );

      let subject = "";
      let text = "";
      let updateField = "";

      // 🎯 conditions
      if (diffDays === 4 && !m.reminder4Sent) {
        subject = `💪 Hey ${m.name}, your plan ends soon`;
        text = `Hi ${m.name}, your gym membership will expire in 4 days. Renew soon!`;
        updateField = "reminder4Sent";
      } 
      
      else if (diffDays === 1 && !m.reminder1Sent) {
        subject = `⚠️ Last Reminder ${m.name}`;
        text = `Hi ${m.name}, your gym membership expires tomorrow. Renew now!`;
        updateField = "reminder1Sent";
      } 
      
      else if (diffDays === 0 && !m.expiredMailSent) {
        subject = `❌ Membership Expired ${m.name}`;
        text = `Hi ${m.name}, your gym membership expires today. Renew now!`;
        updateField = "expiredMailSent";
      } 
      
      else {
        continue;
      }

      console.log("Sending mail to:", m.email);

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: m.email,
        subject,
        text,
      });

      // 🧠 duplicate stop
      await Member.findByIdAndUpdate(m._id, {
        [updateField]: true,
      });

      sentCount++;

      // 🔥 anti-spam delay
      await new Promise((res) => setTimeout(res, 1500));
    }

    return NextResponse.json({
      message: `Emails sent: ${sentCount}`,
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}