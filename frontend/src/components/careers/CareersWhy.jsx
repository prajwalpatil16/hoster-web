export default function CareersWhy() {
  const highlights = [
    {
      title: "Engineering-first culture",
      desc: "Decisions are driven by long-term system quality, not shortcuts.",
    },
    {
      title: "Ownership over features",
      desc: "You design, build, and evolve what you ship.",
    },
    {
      title: "Clean & readable code",
      desc: "Maintainability matters more than clever hacks.",
    },
    {
      title: "Learning-focused environment",
      desc: "We grow by building real products, not demos.",
    },
  ];

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-20">

        {/* LEFT — STORY */}
        <div className="relative">
          {/* subtle accent */}
          <div className="absolute -left-6 top-2 h-full w-[2px] bg-gradient-to-b from-teal-500/0 via-teal-500 to-teal-500/0" />

          <span className="inline-block mb-4 text-sm font-semibold tracking-wide text-teal-600">
            CAREERS AT HOSTER
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            We don’t hire roles.
            <br />
            We build engineers.
          </h2>

          <p className="mt-6 text-gray-600 max-w-xl leading-relaxed">
            Hoster isn’t a typical agency. We work like engineers embedded
            inside real product teams — thinking deeply about architecture,
            trade-offs, and long-term maintainability.
          </p>

          <p className="mt-4 text-gray-600 max-w-xl leading-relaxed">
            If you care about solving meaningful problems, owning your work,
            and building systems that last, you’ll fit right in.
          </p>
        </div>

        {/* RIGHT — FLOWING HIGHLIGHTS */}
        <div className="space-y-10">
          {highlights.map((item, i) => (
            <div
              key={i}
              className="group flex gap-6 items-start transition"
            >
              {/* index marker */}
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center font-semibold group-hover:bg-teal-100 transition">
                  {i + 1}
                </div>
              </div>

              {/* content */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-600 leading-relaxed max-w-md">
                  {item.desc}
                </p>

                {/* underline accent */}
                <div className="mt-3 h-[2px] w-8 bg-teal-500 opacity-0 group-hover:opacity-100 transition" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
