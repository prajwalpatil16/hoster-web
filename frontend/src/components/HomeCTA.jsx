import { Link } from "react-router-dom";

export default function HomeCTASection() {
  return (
    <section className="relative overflow-hidden bg-gray-50">
      
      {/* Decorative grid + glow */}
      <div className="pointer-events-none absolute inset-0">
        {/* Soft glow */}
        <div className="absolute -right-40 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-teal-400/20 blur-3xl" />
        
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — MESSAGE */}
          <div>
            <span className="inline-block mb-4 text-sm font-semibold text-teal-600">
              Let’s work together
            </span>

            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Ready to build something
              <br /> meaningful?
            </h2>

            <p className="mt-6 text-gray-600 max-w-xl">
              Whether you’re launching a new product or modernizing an
              existing system, we help teams move forward with clarity,
              speed, and confidence.
            </p>
          </div>

          {/* RIGHT — ACTION */}
          <div className="relative rounded-3xl bg-white p-10 shadow-xl">

            {/* Accent bar */}
            <div className="absolute left-0 top-8 h-20 w-[4px] rounded-full bg-teal-600" />

            <h3 className="text-xl font-semibold text-gray-900">
              Start with a conversation
            </h3>

            <p className="mt-4 text-sm text-gray-600">
              Tell us about your goals and challenges.
              We’ll help you define the right technical approach.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="rounded-full bg-teal-600 px-8 py-3 text-sm font-semibold text-white hover:bg-teal-700 transition"
              >
                Contact us
              </Link>

              <Link
                to="/projects"
                className="rounded-full border border-gray-300 px-8 py-3 text-sm font-semibold text-gray-700 hover:border-teal-600 hover:text-teal-600 transition"
              >
                View our work
              </Link>
            </div>

            <p className="mt-6 text-xs text-gray-500">
              Typical response time: 24–48 hours
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
