import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/*
  MainLayout
  -----------
  This layout wraps all public-facing pages.
  It ensures consistent navigation and footer
  across the application while keeping routing clean.

  Why this pattern?
  - Centralizes layout concerns
  - Makes it easy to add other layouts later (Auth/Admin)
*/

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
