import { Link } from "react-router-dom";

export default function CareersOpenRoles() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-24">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>
            <span className="inline-block mb-4 text-sm font-semibold tracking-wide text-teal-600">
              CAREERS
            </span>

            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Open roles
            </h2>

            <p className="mt-6 text-gray-600 max-w-xl leading-relaxed">
              We don’t hire based on headcount. We hire when we meet people
              who think clearly, write clean code, and care about building
              things the right way.
            </p>

            <p className="mt-4 text-gray-600 max-w-xl leading-relaxed">
              If you’re a frontend, backend, or full-stack engineer who values
              clarity, ownership, and long-term thinking — we’re always open
              to starting a conversation.
            </p>

            <div className="mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-7 py-3 text-sm font-semibold text-white hover:bg-teal-700 transition"
              >
                Start a conversation →
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative rounded-3xl border bg-gray-50 p-10">

            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              We usually look for
            </h3>

            <ul className="mt-6 space-y-4 text-gray-700 text-sm">
              <li className="flex gap-3">
                <span className="text-teal-600 font-bold">—</span>
                Engineers who explain before they implement
              </li>
              <li className="flex gap-3">
                <span className="text-teal-600 font-bold">—</span>
                Strong fundamentals in systems, not just frameworks
              </li>
              <li className="flex gap-3">
                <span className="text-teal-600 font-bold">—</span>
                Ownership from design through delivery
              </li>
              <li className="flex gap-3">
                <span className="text-teal-600 font-bold">—</span>
                Comfort with evolving requirements
              </li>
            </ul>

            {/* subtle accent */}
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-teal-200/30 blur-2xl" />
          </div>

        </div>

      </div>
    </section>
  );
}
