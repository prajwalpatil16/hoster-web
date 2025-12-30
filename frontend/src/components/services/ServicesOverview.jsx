export default function ServicesOverview() {
  const focusAreas = [
    {
      title: "Early-stage startups",
      desc: "Validate ideas, ship MVPs, and build strong technical foundations.",
    },
    {
      title: "Scaling SaaS products",
      desc: "Improve performance, reliability, and developer velocity.",
    },
    {
      title: "Internal enterprise tools",
      desc: "Design systems that simplify workflows and reduce operational friction.",
    },
    {
      title: "Cloud-native platforms",
      desc: "Architect secure, scalable infrastructure built for growth.",
    },
  ];

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* LEFT CONTENT */}
          <div className="relative">
            {/* Vertical accent */}
            <div className="absolute -left-6 top-2 h-full w-[3px] bg-gradient-to-b from-teal-500/0 via-teal-500 to-teal-500/0" />

            <span className="inline-block mb-5 rounded-full bg-teal-100 px-4 py-1 text-sm font-semibold text-teal-700">
              What we do
            </span>

            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Engineering services
              <br />
              built for real-world products
            </h2>

            <p className="mt-6 text-gray-600 max-w-xl leading-relaxed">
              We help startups and growing teams design, build, and scale
              reliable digital products. Our work emphasizes clarity,
              maintainability, and long-term business value — not shortcuts.
            </p>

            <p className="mt-6 text-sm text-gray-500">
              We partner closely with product teams, founders, and engineering
              leaders from idea to scale.
            </p>
          </div>

          {/* RIGHT CONTENT */}
          <div className="space-y-6">
            {focusAreas.map((item, i) => (
              <div
                key={i}
                className="group relative pl-6"
              >
                {/* Accent dot */}
                <div className="absolute left-0 top-2 h-2 w-2 rounded-full bg-teal-500" />

                <h3 className="font-semibold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm text-gray-600 leading-relaxed max-w-md">
                  {item.desc}
                </p>

                {/* Hover underline */}
                <div className="mt-3 h-[2px] w-10 bg-teal-500 opacity-0 group-hover:opacity-100 transition" />
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
