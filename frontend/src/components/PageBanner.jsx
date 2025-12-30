export default function PageBanner({
  title,
  description,
  backgroundImage,
}) {
  return (
    <section
      className="relative h-[220px] md:h-[260px] flex items-end"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 pb-10 text-white">
        <h1 className="text-2xl md:text-3xl font-extrabold">
          {title}
        </h1>

        {description && (
          <p className="mt-2 max-w-2xl text-sm md:text-base text-white/80">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
