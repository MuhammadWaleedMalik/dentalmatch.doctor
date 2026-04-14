'use client';

import { Button } from '@/components/ui/button';

export default function StatsSection() {
  const stats = [
    { value: '77K+', label: 'Dental Practices' },
    { value: '900K+', label: 'Dental Professionals' },
    { value: '300K+', label: 'Jobs Posted to Date' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-teal-600 font-semibold mb-2">BEAT THE ODDS</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Looking for the best job at the best dental practice?
          </h2>
          <p className="text-gray-600 text-lg mb-12">
            It's a numbers game, and we have the numbers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>

          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8">
            Join this crowd
          </Button>
        </div>
      </div>
    </section>
  );
}
