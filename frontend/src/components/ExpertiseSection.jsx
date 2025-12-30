export default function ExpertiseSection() {
  const expertise = [
    {
      title: "Frontend Engineering",
      desc: "Accessible, performant user interfaces built with React.",
      icon: (
        <path d="M3 4h18v12H3zM7 20h10" />
      ),
    },
    {
      title: "Backend Systems",
      desc: "Scalable APIs, services, and data pipelines.",
      icon: (
        <path d="M4 7h16M4 12h16M4 17h16" />
      ),
    },
    {
      title: "Cloud Infrastructure",
      desc: "Secure, observable systems on modern cloud platforms.",
      icon: (
        <path d="M3 15a4 4 0 0 1 4-4 5 5 0 0 1 9.6-1.6A4 4 0 0 1 21 13a4 4 0 0 1-4 4H7a4 4 0 0 1-4-2z" />
      ),
    },
    {
      title: "UX & Design Systems",
      desc: "Consistency, usability, and long-term maintainability.",
      icon: (
        <path d="M4 4h16v16H4zM9 9h6v6H9z" />
      ),
    },
  ];

  return (
    <section className="bg-teal-50">
     <div className="max-w-7xl mx-auto px-6 pt-12 pb-20">


        {/* HEADER */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Core capabilities
          </h2>
          <p className="mt-4 text-gray-600">
            Our expertise spans the full product lifecycle — from interface
            design to scalable infrastructure.
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {expertise.map((item, i) => (
            <div
              key={i}
              className="bg-white border rounded-xl p-8 shadow-sm hover:shadow-md transition"
            >
              {/* ICON */}
              <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5"
                >
                  {item.icon}
                </svg>
              </div>

              <h3 className="font-semibold text-gray-900">
                {item.title}
              </h3>

              <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
