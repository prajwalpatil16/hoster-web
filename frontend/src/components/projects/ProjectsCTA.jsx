import { Link } from "react-router-dom";

export default function ProjectsCTA() {
  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">

        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Want to see deeper technical details?
        </h2>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          We’re happy to share architecture decisions, trade-offs,
          and real outcomes behind our work.
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Link
            to="/contact"
            className="rounded-full bg-teal-600 px-8 py-3 text-sm font-semibold text-white hover:bg-teal-700 transition"
          >
            Request full case studies
          </Link>

          <Link
            to="/services"
            className="rounded-full border border-gray-300 px-8 py-3 text-sm font-semibold text-gray-700 hover:border-teal-600 hover:text-teal-600 transition"
          >
            See how we work
          </Link>
        </div>

      </div>
    </section>
  );
}
