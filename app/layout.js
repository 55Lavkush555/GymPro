import "./globals.css";

export const metadata = {
  title: "GymPro - Gym Management System",
  description: "Manage your gym members efficiently",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
