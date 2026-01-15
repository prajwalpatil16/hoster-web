import { Link } from "react-router-dom";

export default function CareersCTA() {
  return (
    <section className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-6 py-28">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT — EDITORIAL MESSAGE */}
          <div>
            <p className="text-sm font-semibold tracking-wide text-teal-600 uppercase">
              Careers at Hoster
            </p>

            <h2 className="mt-6 text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              We hire engineers,
              <br />
              not resumes
            </h2>

            <p className="mt-8 max-w-xl text-lg text-gray-600 leading-relaxed">
              If you enjoy thinking deeply, explaining trade-offs,
              and building systems that last — we’d rather talk
              than post job descriptions.
            </p>

            <p className="mt-4 max-w-xl text-gray-500">
              No deadlines. No pressure. Just a real conversation.
            </p>
          </div>

          {/* RIGHT — ACTION CARD */}
          <div className="relative">

            <div className="group rounded-3xl border bg-gray-50 p-10 transition hover:bg-white hover:shadow-xl">

              <h3 className="text-lg font-semibold text-gray-900">
                Start with a simple message
              </h3>

              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                Tell us what you enjoy building, what frustrates you
                about engineering today, or what you want to grow into.
              </p>

              <div className="mt-8">
                <Link
                  to="/contact?source=careers"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600"
                >
                  Start a conversation
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>

            </div>

            {/* subtle offset line (NOT decorative) */}
            <div className="absolute -left-6 top-8 h-[70%] w-px bg-gray-200" />
          </div>

        </div>

      </div>
    </section>
  );
}
