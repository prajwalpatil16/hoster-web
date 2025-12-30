export default function ProcessSection() {
  const steps = [
    {
      step: "01",
      title: "Discover",
      desc: "Understand business goals, users, and constraints before committing to solutions.",
    },
    {
      step: "02",
      title: "Design",
      desc: "Define architecture, user flows, and technical strategy with clarity.",
    },
    {
      step: "03",
      title: "Build",
      desc: "Implement clean, maintainable code with modern engineering practices.",
    },
    {
      step: "04",
      title: "Scale",
      desc: "Optimize performance, reliability, and infrastructure for growth.",
    },
  ];

  return (
    <section className="relative bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="max-w-2xl mb-16">
          <span className="inline-block mb-4 text-sm font-semibold text-teal-600">
            Our process
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            How we work
          </h2>

          <p className="mt-4 text-gray-600">
            A structured, transparent approach that reduces risk and delivers
            predictable outcomes.
          </p>
        </div>

        {/* PROCESS FLOW */}
        <div className="relative grid gap-12 lg:grid-cols-4">

          {/* Vertical connector (desktop only) */}
          <div className="hidden lg:block absolute top-6 left-0 right-0 h-[2px] bg-gradient-to-r from-teal-500/0 via-teal-500 to-teal-500/0" />

          {steps.map((item) => (
            <div
              key={item.step}
              className="relative bg-white rounded-2xl border p-8 shadow-sm hover:shadow-md transition"
            >
              {/* Step indicator */}
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-600">
                  {item.step}
                </div>
                <div className="h-[2px] flex-1 bg-teal-100 lg:hidden" />
              </div>

              <h3 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h3>

              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                {item.desc}
              </p>

              {/* Subtle hover accent */}
              <div className="mt-6 h-[2px] w-8 bg-teal-500 opacity-0 group-hover:opacity-100 transition" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
