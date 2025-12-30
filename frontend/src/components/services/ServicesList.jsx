export default function ServicesList() {
  const services = [
    {
      id: "01",
      title: "Product Engineering",
      desc: "End-to-end development from idea to production-ready systems.",
      points: [
        "System design & architecture",
        "Frontend & backend development",
        "Testing, deployment & ownership",
      ],
    },
    {
      id: "02",
      title: "Frontend Engineering",
      desc: "Accessible, high-performance interfaces built for real users.",
      points: [
        "React-based applications",
        "Design systems & UI consistency",
        "Performance & accessibility",
      ],
    },
    {
      id: "03",
      title: "Backend & APIs",
      desc: "Scalable backend systems that power reliable products.",
      points: [
        "API & data modeling",
        "Authentication & authorization",
        "Service reliability & scaling",
      ],
    },
    {
      id: "04",
      title: "Cloud & DevOps",
      desc: "Infrastructure designed for long-term reliability and growth.",
      points: [
        "Cloud-native architecture",
        "CI/CD pipelines",
        "Monitoring & performance",
      ],
    },
  ];

  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-24">

        {/* HEADER */}
        <div className="max-w-2xl mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Our core services
          </h2>
          <p className="mt-4 text-gray-600">
            Practical engineering services focused on clarity,
            maintainability, and long-term impact.
          </p>
        </div>

        {/* SERVICES */}
        <div className="space-y-14">
          {services.map((service) => (
            <div
              key={service.id}
              className="group grid md:grid-cols-12 gap-6 items-start"
            >
              {/* LEFT – INDEX */}
              <div className="md:col-span-2">
                <div className="relative">
                  <span className="text-5xl font-extrabold text-gray-200 group-hover:text-teal-500 transition">
                    {service.id}
                  </span>

                  {/* Vertical accent */}
                  <div className="absolute left-1 top-14 h-12 w-[2px] bg-teal-500 opacity-0 group-hover:opacity-100 transition" />
                </div>
              </div>

              {/* RIGHT – CONTENT */}
              <div className="md:col-span-10">
                <div className="rounded-2xl bg-white border p-8 transition
                                group-hover:shadow-xl
                                group-hover:-translate-y-1">

                  <h3 className="text-xl font-semibold text-gray-900">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-gray-600 max-w-2xl">
                    {service.desc}
                  </p>

                  <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm text-gray-700">
                    {service.points.map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2"
                      >
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  {/* Hover indicator */}
                  <div className="mt-6 h-0.5 w-12 bg-teal-500 opacity-0 group-hover:opacity-100 transition" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
