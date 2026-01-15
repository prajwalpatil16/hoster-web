import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

export default function PricingSection() {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5001/api/public/plans")
            .then(res => res.json())
            .then(data => setPlans(data))
            .catch(err => console.error("Error fetching plans:", err));
    }, []);

    return (
        <section id="pricing" className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-base font-semibold text-teal-600 tracking-wide uppercase">Pricing Plans</h2>
                    <p className="mt-2 text-4xl font-extrabold text-gray-900 sm:text-5xl">
                        Scalable hosting for teams of all sizes.
                    </p>
                    <p className="mt-4 text-xl text-gray-500">
                        Simple, transparent pricing. No hidden fees.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <div key={plan.id} className="flex flex-col bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-xl transition-shadow p-8 relative">
                            {plan.name === 'Professional' && (
                                <div className="absolute top-0 right-10 -translate-y-1/2 bg-teal-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                                    Most Popular
                                </div>
                            )}
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                                <p className="mt-4 text-gray-500 text-sm leading-6">{plan.description}</p>
                                <div className="mt-8 flex items-baseline">
                                    <span className="text-4xl font-extrabold text-gray-900">${plan.price_monthly}</span>
                                    <span className="ml-1 text-xl font-medium text-gray-500">/mo</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-10 flex-1">
                                {(Array.isArray(plan.features) ? plan.features : JSON.parse(plan.features || "[]")).map((feature, i) => (
                                    <li key={i} className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <Check className="h-5 w-5 text-teal-500" />
                                        </div>
                                        <p className="ml-3 text-sm text-gray-600">{feature}</p>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                to="/signup"
                                className={`w-full py-4 px-6 rounded-xl text-center font-bold transition-colors ${plan.name === 'Professional'
                                    ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-lg shadow-teal-200'
                                    : 'bg-gray-50 text-gray-900 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                Get Started
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden opacity-5">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-teal-600 rounded-full blur-[120px]"></div>
            </div>
        </section>
    );
}
