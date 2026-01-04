export default function CareersValues() {
  const values = [
    {
      title: "Clarity over complexity",
      desc: "If a system is hard to explain, it will be hard to maintain.",
    },
    {
      title: "Ownership mindset",
      desc: "You own what you build — from design decisions to delivery and iteration.",
    },
    {
      title: "Long-term thinking",
      desc: "We optimize for sustainability, scalability, and future teams — not shortcuts.",
    },
  ];

  return (
    <section className="bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* HEADER */}
        <div className="max-w-2xl mb-16">
          <span className="inline-block mb-3 text-sm font-semibold tracking-wide text-teal-600">
            OUR VALUES
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            How we think about
            <br />
            building software
          </h2>

          <p className="mt-4 text-gray-600">
            These principles guide our decisions, our architecture,
            and how we work with each other.
          </p>
        </div>

        {/* VALUES FLOW */}
        <div className="relative space-y-14">
          {/* vertical guide line */}
          <div className="absolute left-5 top-0 h-full w-[2px] bg-gradient-to-b from-teal-500/0 via-teal-500 to-teal-500/0" />

          {values.map((v, i) => (
            <div key={i} className="relative flex gap-8 items-start">
              
              {/* marker */}
              <div className="relative z-10 flex-shrink-0 h-10 w-10 rounded-full bg-white border-2 border-teal-500 text-teal-600 flex items-center justify-center font-semibold">
                {i + 1}
              </div>

              {/* content */}
              <div className="max-w-xl">
                <h3 className="text-xl font-semibold text-gray-900">
                  {v.title}
                </h3>

                <p className="mt-3 text-gray-600 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
