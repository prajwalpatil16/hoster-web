export default function ContactHighlights() {
  const items = [
    {
      title: "Clear communication",
      desc: "You’ll always understand what we’re building and why it matters.",
    },
    {
      title: "Engineering-first mindset",
      desc: "Clean architecture, maintainable code, and long-term thinking.",
    },
    {
      title: "Fast & thoughtful response",
      desc: "We respond within 24–48 hours with clear next steps.",
    },
  ];

  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-6 py-14">

        <div className="grid gap-8 md:grid-cols-3">
          {items.map((item, i) => (
            <div key={i}>
              <h3 className="text-base font-semibold text-gray-900 border-b-2 border-teal-500 pb-2">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
