export default function WhyHoster() {
  const agency = [
    "Focus on delivery speed",
    "Limited context of the product",
    "Black-box development",
    "Short-term engagement",
  ];

  const hoster = [
    "Focus on long-term product health",
    "Deep understanding of your business",
    "Transparent decisions & trade-offs",
    "Engineering partnership mindset",
  ];

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-28">

        {/* HEADER */}
        <div className="max-w-3xl mb-20">
          <span className="inline-block mb-4 rounded-full bg-teal-100 px-4 py-1 text-sm font-semibold text-teal-700">
            Why Hoster
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Two ways to build software.
            <br />
            We chose the harder one.
          </h2>

          <p className="mt-6 text-gray-600 text-lg">
            Most teams struggle not because of effort, but because of how
            engineering decisions are made. Here’s the difference.
          </p>
        </div>

        {/* COMPARISON */}
        <div className="grid md:grid-cols-2 gap-16">

          {/* AGENCY SIDE */}
          <div>
            <h3 className="text-sm uppercase tracking-wider text-gray-400 font-semibold mb-8">
              Typical agency
            </h3>

            <ul className="space-y-6">
              {agency.map((item, i) => (
                <li
                  key={i}
                  className="text-gray-500 text-lg leading-relaxed"
                >
                  — {item}
                </li>
              ))}
            </ul>
          </div>

          {/* HOSTER SIDE */}
          <div>
            <h3 className="text-sm uppercase tracking-wider text-teal-600 font-semibold mb-8">
              How Hoster works
            </h3>

            <ul className="space-y-6">
              {hoster.map((item, i) => (
                <li
                  key={i}
                  className="text-gray-900 text-lg font-medium leading-relaxed flex items-start gap-3"
                >
                  <span className="mt-1 h-2 w-2 rounded-full bg-teal-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* CLOSING LINE */}
        <div className="mt-24 max-w-2xl">
          <p className="text-xl font-semibold text-gray-900">
            We don’t measure success by features shipped.
          </p>
          <p className="mt-2 text-gray-600">
            We measure it by how easy your product is to evolve six months
            after launch.
          </p>
        </div>

      </div>
    </section>
  );
}
