import React from 'react';
import { Check, Star } from 'lucide-react';

const plan = {
  name: "All Access",
  price: "$20",
  period: "per month",
  description: "Complete yoga experience with everything you need",
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
};

export default function SubscriptionPlans() {
  return (
    <section id="plans" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-medium text-stone-800 mb-4">Join the Community</h2>
          <p className="text-xl font-body font-light text-stone-600 max-w-3xl mx-auto">
            Get unlimited access to everything with our comprehensive yoga subscription. 
            Includes lifetime access to all courses and exclusive member benefits.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="relative rounded-2xl shadow-xl overflow-hidden bg-gradient-to-br from-sage-50 to-stone-50 border-2 border-sage-500 hover:shadow-2xl transition-shadow">
            <div className="absolute top-0 left-0 right-0 bg-sage-600 text-white text-center py-3 text-sm font-medium">
              <div className="flex items-center justify-center space-x-1">
                <Star className="h-4 w-4" />
                <span className="font-body">Everything Included</span>
              </div>
            </div>
            
            <div className="p-8 pt-16">
              <h3 className="text-3xl font-heading font-medium text-stone-800 mb-2 text-center">{plan.name}</h3>
              <p className="font-body text-stone-600 mb-8 text-center">{plan.description}</p>
              
              <div className="mb-8 text-center">
                <span className="text-5xl font-heading font-semibold text-stone-800">{plan.price}</span>
                <span className="font-body text-stone-600 ml-2 text-lg">{plan.period}</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="h-5 w-5 text-sage-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="font-body text-stone-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className="w-full py-4 px-6 rounded-lg font-body font-medium text-lg bg-sage-600 text-white hover:bg-sage-700 transition-colors shadow-lg">
                Start Your 2-Week Free Trial
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="font-body text-stone-600 mb-4">2-week free trial • Cancel anytime • No commitment</p>
          <p className="text-sm font-body text-stone-500">
            Need a custom plan for your business or organization? 
            <a href="#contact" className="text-sage-600 hover:underline ml-1">Contact us</a>
          </p>
        </div>
      </div>
    </section>
  );
}