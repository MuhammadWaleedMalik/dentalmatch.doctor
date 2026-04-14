'use client';

import { Check, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MobileAppSection() {
  const features = [
    'Post, view and manage job listings with ease',
    'Search and apply on-the-go',
    'Get news, events and trends',
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-teal-600 font-semibold mb-2">MOBILE APP</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Use DentalPost anytime, anywhere,
              <br />
              on any device
            </h2>
            <p className="text-gray-600 mb-6">
              Our mobile apps put the power of DentalPost right at your fingertips.
            </p>

            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Button variant="outline" className="h-12 px-6">
                <Smartphone className="mr-2 h-5 w-5" />
                Download on the App Store
              </Button>
              <Button variant="outline" className="h-12 px-6">
                <Smartphone className="mr-2 h-5 w-5" />
                Get it on Google Play
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-green-300 to-lime-400 rounded-3xl p-8 shadow-xl">
              <div className="flex justify-center gap-4">
                <div className="relative">
                  <div className="w-48 h-96 bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="bg-teal-500 h-20 flex items-center justify-center">
                      <Smartphone className="h-8 w-8 text-white" />
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-24 bg-teal-100 rounded-lg"></div>
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
                <div className="relative mt-8">
                  <div className="w-48 h-96 bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="bg-green-500 h-20 flex items-center justify-center">
                      <Smartphone className="h-8 w-8 text-white" />
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                      <div className="h-24 bg-green-100 rounded-lg"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
