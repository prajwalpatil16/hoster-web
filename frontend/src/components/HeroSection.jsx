import heroImage from "../assets/images/hero.jpg";
import { companyInfo } from "../data/company";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gray-50">

      {/* Soft background shapes */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-teal-300/30 blur-3xl" />
        <div className="absolute top-24 right-[-240px] h-[620px] w-[620px] rounded-full bg-cyan-300/30 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-12 grid lg:grid-cols-2 gap-14 items-center">

        {/* LEFT CONTENT */}
        <div>
          <span className="inline-block rounded-full bg-teal-100 px-4 py-1 text-sm font-semibold text-teal-700 mb-4">
            Modern Problems · Modern Platform
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Build smarter digital
            <br />
            products with confidence
          </h1>

          <p className="mt-4 text-lg text-gray-600 max-w-xl">
            {companyInfo.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/signup"
              className="rounded-full bg-teal-500 px-7 py-3 text-sm font-semibold text-white hover:bg-teal-600 transition"
            >
              Get started
            </a>

            <a
              href="/projects"
              className="text-sm font-semibold text-teal-600 hover:underline"
            >
              View demo →
            </a>
          </div>

          {/* Trust metrics */}
          <div className="mt-8 flex gap-10">
            <Metric value="120+" label="Projects" />
            <Metric value="9+" label="Years" />
            <Metric value="30%" label="Growth" />
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-[280px] sm:w-[340px] md:w-[400px] lg:w-[420px]">

            <img
              src={heroImage}
              alt="Product dashboard preview"
              className="w-full rounded-2xl shadow-lg"
            />

            <div className="mt-4 bg-white rounded-xl shadow-md p-4">
              <p className="text-sm font-semibold text-gray-800">
                Productivity boost
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Teams ship features faster with better clarity and alignment.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

/* Metric helper */
function Metric({ value, label }) {
  return (
    <div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}
