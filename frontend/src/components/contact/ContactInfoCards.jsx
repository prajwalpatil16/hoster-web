import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactInfoCards() {
  const items = [
    { icon: Mail, title: "Email", value: "hello@hoster.example" },
    { icon: Phone, title: "Phone", value: "+1 (415) 555-0123" },
    { icon: MapPin, title: "Office", value: "San Francisco, CA" },
  ];

  return (
    <section className="bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-12">

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 border-t border-b border-teal-500 py-8">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-teal-100 flex items-center justify-center text-teal-600">
                  <Icon className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
