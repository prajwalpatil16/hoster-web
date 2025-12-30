import { Link } from "react-router-dom";

export default function ProjectsPreview() {
  const projects = [
    {
      title: "Enterprise Dashboard",
      description:
        "A KPI-driven analytics dashboard helping leadership teams make faster, data-backed decisions.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      tech: ["React", "Analytics", "Data viz"],
    },
    {
      title: "SaaS Platform",
      description:
        "A scalable SaaS product with role-based access, billing workflows, and real-time insights.",
      image:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop",
      tech: ["SaaS", "Auth", "Payments"],
    },
    {
      title: "Cloud Migration",
      description:
        "Modernized legacy systems into cloud-native infrastructure with CI/CD and monitoring.",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
      tech: ["Cloud", "CI/CD", "DevOps"],
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 pt-24">

        {/* HEADER */}
        <div className="max-w-2xl mb-14">
          <span className="text-sm font-semibold text-teal-600">
            Case studies
          </span>

          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-gray-900">
            Selected work
          </h2>

          <p className="mt-4 text-gray-600">
            A glimpse into how we help teams solve complex problems through
            disciplined engineering and thoughtful product decisions.
          </p>
        </div>

        {/* SCROLL WRAPPER */}
        <div className="relative">

          {/* SCROLL FADE */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-gray-50 to-transparent z-10" />

          {/* PROJECTS */}
          <div className="flex gap-8 overflow-x-auto pb-6 pr-10 scroll-smooth">
            {projects.map((proj, i) => (
              <article
                key={i}
                className="group min-w-[300px] md:min-w-[360px] bg-white border rounded-2xl overflow-hidden transition hover:-translate-y-1 hover:shadow-xl"
              >
                {/* IMAGE */}
                <div className="overflow-hidden">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {proj.title}
                  </h3>

                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                    {proj.description}
                  </p>

                  {/* TECH */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600 hover:underline"
          >
            View all case studies →
          </Link>
        </div>

      </div>
    </section>
  );
}
