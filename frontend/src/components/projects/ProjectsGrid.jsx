import { projects } from "../../data/projects";

export default function ProjectsGrid() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.id}
              className="group bg-white border rounded-2xl overflow-hidden transition
                         hover:-translate-y-1 hover:shadow-xl"
            >
              {/* IMAGE */}
              <div className="relative overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
                />

                {/* META BADGE */}
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700">
                  {p.industry}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6">

                {/* TITLE ROW */}
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {p.title}
                  </h3>
                  <span className="text-xs text-gray-400">
                    {p.year}
                  </span>
                </div>

                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {p.description}
                </p>

                {/* OUTCOME */}
                <p className="mt-4 text-sm font-medium text-gray-800">
                  <span className="text-teal-600">Outcome:</span>{" "}
                  {p.outcome}
                </p>

                {/* TAGS */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-teal-200 bg-teal-50
                                 px-3 py-1 text-xs font-medium text-teal-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-6 text-sm font-semibold text-teal-600
                                opacity-0 group-hover:opacity-100 transition">
                  View case study →
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
