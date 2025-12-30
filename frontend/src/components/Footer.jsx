import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">

      {/* CTA SECTION */}
      <div className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Let’s build something great together
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-400">
            We help startups and enterprises design, build, and scale
            high-quality digital products.
          </p>

          <Link
            to="/contact"
            className="inline-block mt-8 rounded-full bg-teal-500 px-8 py-3 text-sm font-semibold text-white hover:bg-teal-600 transition"
          >
            Start a project
          </Link>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 sm:grid-cols-2 md:grid-cols-4">

        {/* Brand */}
        <div>
          <h3 className="text-xl font-bold text-teal-500">
            Hoster<span className="text-white">.</span>
          </h3>
          <p className="mt-4 text-sm leading-relaxed">
            A modern digital engineering company building scalable,
            reliable, and user-focused software solutions.
          </p>

          {/* Social icons */}
          <div className="mt-6 flex gap-4">
            <SocialIcon href="#" label="Facebook">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </SocialIcon>
            <SocialIcon href="#" label="Instagram">
              <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z" />
              <circle cx="12" cy="12" r="3" />
              <circle cx="17.5" cy="6.5" r="1.5" />
            </SocialIcon>
            <SocialIcon href="#" label="LinkedIn">
              <path d="M4 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM2 8h4v12H2zM8 8h4v2h.1a4 4 0 0 1 3.9-2c4.2 0 5 2.8 5 6.5V20h-4v-5.5c0-1.3 0-3-2-3s-2.3 1.5-2.3 2.9V20H8z" />
            </SocialIcon>
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-4 uppercase">
            Company
          </h4>
          <ul className="space-y-3 text-sm">
            <li><Link className="hover:text-teal-400" to="/about">About</Link></li>
            <li><Link className="hover:text-teal-400" to="/projects">Projects</Link></li>
            <li><Link className="hover:text-teal-400" to="/services">Services</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-4 uppercase">
            Support
          </h4>
          <ul className="space-y-3 text-sm">
            <li><Link className="hover:text-teal-400" to="/contact">Contact</Link></li>
            <li><Link className="hover:text-teal-400" to="/privacy">Privacy</Link></li>
            <li><Link className="hover:text-teal-400" to="/terms">Terms</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-4 uppercase">
            Contact
          </h4>
          <p className="text-sm">hello@hoster.example</p>
          <p className="mt-1 text-sm">+1 (415) 555-0123</p>
          <p className="mt-2 text-sm">Working with clients worldwide</p>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-gray-800 py-6 text-center text-xs text-gray-500">
        © 2025 Hoster Technologies. All rights reserved.
      </div>
    </footer>
  );
}

/* Reusable social icon */
function SocialIcon({ href, children, label }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-300 hover:bg-teal-500 hover:text-white transition"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-4 w-4"
      >
        {children}
      </svg>
    </a>
  );
}
