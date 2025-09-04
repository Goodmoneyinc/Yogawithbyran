import React from 'react';
import { Check, Star, Crown, Calendar } from 'lucide-react';

const plans = [
  {
    id: 'monthly',
    name: "Monthly Access",
    price: "$20",
    period: "per month",
    description: "Complete yoga experience with everything you need",
    popular: false,
    savings: null,
    features: [
      "Access to ALL online courses",
      "New content weekly",
      "Premium community access",
      "One-on-one consultation",
      "Priority email support",
      "Downloadable resources",
      "Progress tracking",
      "Early access to workshops",
      "Exclusive merchandise discounts"
    ]
  },
  {
    id: '6month',
    name: "6-Month Package",
    price: "$99",
    period: "for 6 months",
    description: "Save $21 with our 6-month commitment plan",
    popular: true,
    savings: "Save $21",
    features: [
      "Access to ALL online courses",
      "New content weekly",
      "Premium community access",
      "One-on-one consultation",
      "Priority email support",
      "Downloadable resources",
      "Progress tracking",
      "Early access to workshops",
      "Exclusive merchandise discounts",
      "Bonus: Monthly live Q&A sessions",
      "Bonus: Personalized practice plan"
    ]
  },
  {
    id: 'yearly',
    name: "Annual Membership",
    price: "$199",
    period: "per year",
    description: "Best value - save $41 with our annual plan",
    popular: false,
    savings: "Save $41",
    features: [
      "Access to ALL online courses",
      "New content weekly",
      "Premium community access",
      "One-on-one consultation",
      "Priority email support",
      "Downloadable resources",
      "Progress tracking",
      "Early access to workshops",
      "Exclusive merchandise discounts",
      "Bonus: Monthly live Q&A sessions",
      "Bonus: Personalized practice plan",
      "Bonus: Annual retreat discount (20% off)",
      "Bonus: Exclusive annual member gifts"
    ]
  }
];

export default function SubscriptionPlans() {
  return (
    <section id="plans" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-medium text-stone-800 mb-4">Choose Your Journey</h2>
          <p className="text-xl font-body font-light text-stone-600 max-w-3xl mx-auto">
            Select the perfect plan for your yoga practice. All plans include lifetime access to courses 
            and exclusive member benefits.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                plan.popular
                  ? 'bg-gradient-to-br from-sage-50 to-stone-50 border-2 border-sage-500 transform scale-105'
                  : 'bg-white border border-gray-200 hover:border-sage-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-sage-600 text-white text-center py-3 text-sm font-medium">
                  <div className="flex items-center justify-center space-x-1">
                    <Crown className="h-4 w-4" />
                    <span className="font-body">Most Popular</span>
                  </div>
                </div>
              )}
              
              {plan.savings && !plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-amber-500 text-white text-center py-3 text-sm font-medium">
                  <div className="flex items-center justify-center space-x-1">
                    <Star className="h-4 w-4" />
                    <span className="font-body">{plan.savings}</span>
                  </div>
                </div>
              )}
              
              <div className={`p-8 ${plan.popular || plan.savings ? 'pt-16' : ''}`}>
                <h3 className="text-2xl font-heading font-medium text-stone-800 mb-2 text-center">
                  {plan.name}
                </h3>
                <p className="font-body text-stone-600 mb-6 text-center text-sm">
                  {plan.description}
                </p>
                
                <div className="mb-8 text-center">
                  <span className="text-4xl font-heading font-semibold text-stone-800">
                    {plan.price}
                  </span>
                  <span className="font-body text-stone-600 ml-2 text-lg">
                    {plan.period}
                  </span>
                  {plan.savings && (
                    <div className="mt-2">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {plan.savings}
                      </span>
                    </div>
                  )}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-sage-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className={`font-body text-stone-700 text-sm ${
                        feature.startsWith('Bonus:') ? 'font-medium text-sage-700' : ''
                      }`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-4 px-6 rounded-lg font-body font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  plan.popular
                    ? 'bg-sage-600 text-white hover:bg-sage-700'
                    : 'bg-stone-600 text-white hover:bg-stone-700'
                }`}>
                  {plan.id === 'monthly' ? 'Start Monthly' : 
                   plan.id === '6month' ? 'Choose 6 Months' : 
                   'Choose Annual'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-sage-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="flex items-center justify-center space-x-2">
                <Calendar className="h-5 w-5 text-sage-600" />
                <span className="font-body text-stone-700">Cancel anytime</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Star className="h-5 w-5 text-sage-600" />
                <span className="font-body text-stone-700">No commitment</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Check className="h-5 w-5 text-sage-600" />
                <span className="font-body text-stone-700">30-day guarantee</span>
              </div>
            </div>
            <p className="text-sm font-body text-stone-600">
              Need a custom plan for your business or organization? 
              <a href="#contact" className="text-sage-600 hover:underline ml-1">Contact us</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}