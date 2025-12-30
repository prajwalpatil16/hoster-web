export default function ContactForm() {
  return (
    <section className="bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT — FORM */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl">
          <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Start a conversation
          </h3>

          <p className="mt-3 text-gray-600">
            Share a few details about your project and we’ll guide you
            with clarity and honesty.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Form submit placeholder");
            }}
            className="mt-8 space-y-5"
          >
            {/* NAME + EMAIL */}
            <div className="grid sm:grid-cols-2 gap-4">
              <input className="input" placeholder="Full name" required />
              <input type="email" className="input" placeholder="Email address" required />
            </div>

            {/* COMPANY */}
            <input className="input" placeholder="Company (optional)" />

            {/* MESSAGE */}
            <textarea
              rows="4"
              className="input resize-none"
              placeholder="Briefly describe your project"
              required
            />

            {/* CTA */}
            <button
              type="submit"
              className="w-full rounded-full bg-teal-600 py-3 text-sm font-semibold text-white hover:bg-teal-700 transition"
            >
              Send inquiry
            </button>

            <p className="text-xs text-gray-500 text-center">
              We usually respond within 24–48 hours
            </p>
          </form>
        </div>

        {/* RIGHT — VALUE + ANIMATION */}
        <div className="relative">

          {/* Animated vertical accent */}
          <div className="absolute -left-6 top-0 h-full w-[2px] bg-gradient-to-b from-teal-400/0 via-teal-400 to-teal-400/0 animate-pulse" />

          <h4 className="text-xl font-semibold text-gray-900">
            What happens next?
          </h4>

          <p className="mt-4 text-gray-600 max-w-md">
            We don’t jump into code blindly. Our process is structured,
            transparent, and focused on long-term success.
          </p>

          <ul className="mt-8 space-y-5 text-sm text-gray-700">
            <li className="flex gap-3">
              <span className="text-teal-600 font-bold">01</span>
              <span>We review your requirements and constraints</span>
            </li>
            <li className="flex gap-3">
              <span className="text-teal-600 font-bold">02</span>
              <span>You get a clear technical direction & roadmap</span>
            </li>
            <li className="flex gap-3">
              <span className="text-teal-600 font-bold">03</span>
              <span>We align on scope, timeline, and next steps</span>
            </li>
          </ul>

          {/* Subtle floating badge */}
          <div className="mt-10 inline-block rounded-xl bg-teal-50 px-5 py-3 text-sm text-teal-700 animate-[float_6s_ease-in-out_infinite]">
            ✔ Trusted by growing teams worldwide
          </div>
        </div>

      </div>
    </section>
  );
}
