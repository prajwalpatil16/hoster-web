import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const linkClass = (path) =>
    `block px-3 py-2 text-sm font-medium transition
     ${
       pathname === path
         ? "text-teal-600"
         : "text-gray-700 hover:text-teal-600"
     }`;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b">
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-teal-600">Hoster</span>
            <span className="text-3xl font-bold text-gray-900">.</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={linkClass("/")}>Home</Link>
            <Link to="/services" className={linkClass("/services")}>Services</Link>
            <Link to="/projects" className={linkClass("/projects")}>Projects</Link>
            <Link to="/about" className={linkClass("/about")}>About</Link>
            <Link to="/careers" className={linkClass("/careers")}>Careers</Link>
            <Link to="/contact" className={linkClass("/contact")}>Contact</Link>
            
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              to="/contact"
              className="rounded-full bg-teal-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-teal-600 transition"
            >
              Get Start
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden rounded-lg p-2 text-gray-700 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-6 py-6 space-y-3">
            <Link onClick={() => setOpen(false)} to="/" className={linkClass("/")}>Home</Link>
            <Link onClick={() => setOpen(false)} to="/services" className={linkClass("/services")}>Services</Link>
            <Link onClick={() => setOpen(false)} to="/projects" className={linkClass("/projects")}>Projects</Link>
            <Link onClick={() => setOpen(false)} to="/about" className={linkClass("/about")}>About</Link>
            <Link onClick={() => setOpen(false)} to="/contact" className={linkClass("/contact")}>Contact</Link>
            <Link onClick={() => setOpen(false)} to="/careers" className={linkClass("/careers")}>Careers</Link>

            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="block mt-4 rounded-full bg-teal-500 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-teal-600"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
