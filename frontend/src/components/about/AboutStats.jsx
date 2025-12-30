export default function AboutStats() {
  const stats = [
    { value: "9+", label: "Years experience" },
    { value: "120+", label: "Projects delivered" },
    { value: "30%", label: "Avg. growth impact" },
  ];

  return (
    <section className="bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-16 grid sm:grid-cols-3 gap-8 text-center">

        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-3xl font-extrabold text-gray-900">
              {s.value}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              {s.label}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}
