export default function WhoWeAreSection() {
  const highlights = [
    {
      title: "Product Engineering",
      desc: "From idea to production-ready systems with clear ownership.",
    },
    {
      title: "Scalable Architecture",
      desc: "Designed to grow with users, traffic, and complexity.",
    },
    {
      title: "Modern Tech Stack",
      desc: "React, APIs, cloud-native infrastructure, and automation.",
    },
    {
      title: "Long-term Partnership",
      desc: "Maintainable systems, not short-term hacks.",
    },
  ];

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-24">

        <div className="grid lg:grid-cols-2 gap-20">

          {/* LEFT — STORY */}
          <div className="relative">

            {/* Vertical rail */}
            <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-teal-500/0 via-teal-500 to-teal-500/0" />

            <div className="pl-8">
              <span className="inline-block mb-5 rounded-full bg-teal-100 px-4 py-1 text-sm font-semibold text-teal-700">
                Who we are
              </span>

              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                We engineer systems
                <br /> that scale with clarity
              </h2>

              <p className="mt-6 text-gray-600 leading-relaxed max-w-xl">
                Hoster is a modern software engineering company helping teams
                design, build, and scale reliable digital products. We work
                deeply with stakeholders to turn complex requirements into
                clean, maintainable systems.
              </p>

              <p className="mt-8 text-sm text-gray-500">
                Focused on long-term value, not short-term delivery.
              </p>
            </div>
          </div>

          {/* RIGHT — CAPABILITIES */}
          <div className="relative">

            {highlights.map((item, i) => (
              <div
                key={i}
                className={`relative rounded-2xl border bg-gray-50 p-6 mb-6
                            shadow-sm transition hover:shadow-md
                            ${i % 2 === 1 ? "lg:ml-10" : ""}`}
              >
                {/* Step number */}
                <div className="absolute -left-4 top-6 h-8 w-8 rounded-full
                                bg-teal-600 text-white text-xs font-bold
                                flex items-center justify-center">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <h3 className="font-semibold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}
