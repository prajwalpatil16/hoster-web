export default function HowWeThink() {
  const principles = [
    {
      id: "01",
      title: "Clarity over complexity",
      desc: "If a system is hard to explain, it will be hard to maintain, debug, and scale.",
    },
    {
      id: "02",
      title: "Engineering before aesthetics",
      desc: "Visual polish comes after structure. Great UI starts with strong systems.",
    },
    {
      id: "03",
      title: "Build for change",
      desc: "Requirements evolve. Architecture should absorb change without rewrites.",
    },
  ];

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Soft background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full bg-teal-300/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT — FLOATING PRINCIPLES */}
        <div className="relative space-y-6">
          {principles.map((p, i) => (
            <div
              key={p.id}
              className={`
                group relative rounded-2xl border bg-gray-50 p-6 shadow-sm
                transition hover:-translate-y-1 hover:shadow-lg
                ${i === 1 ? "ml-8" : ""}
                ${i === 2 ? "ml-4" : ""}
              `}
            >
              {/* index badge */}
              <div className="absolute -top-4 -left-4 h-10 w-10 rounded-xl bg-teal-600 text-white flex items-center justify-center text-sm font-bold shadow-lg">
                {p.id}
              </div>

              <h3 className="text-lg font-semibold text-gray-900">
                {p.title}
              </h3>

              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                {p.desc}
              </p>

              {/* hover accent */}
              <div className="mt-4 h-[2px] w-0 bg-teal-500 transition-all group-hover:w-12" />
            </div>
          ))}
        </div>

        {/* RIGHT — NARRATIVE */}
        <div>
          <span className="inline-flex items-center gap-2 mb-4 text-sm font-semibold text-teal-600">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-600" />
            Our mindset
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            How we think
            <br />
            about building software
          </h2>

          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            Our decisions are driven by engineering discipline, long-term
            maintainability, and respect for change — not trends or shortcuts.
          </p>

          <p className="mt-6 text-sm text-gray-500 max-w-md">
            These principles guide how we design systems and ship products.
          </p>
        </div>

      </div>
    </section>
  );
}
