'use client';

import Link from 'next/link';

export default function CategoriesSection() {
  const inDemandJobs = [
    'Dental Hygienist',
    'Orthodontist',
    'Dentist',
    'Front Office',
    'Oral Surgeon',
    'Dental Receptionist',
    'Dental Assistant',
    'Periodontist',
    'Office Manager',
    'Endodontist',
    'Oral Surgeon',
    'RDA (Registered Dental Assistant)',
  ];

  const topCities = [
    'Atlanta, GA',
    'Austin, TX',
    'Boston, MA',
    'Charlotte, NC',
    'Chicago, IL',
    'Dallas, TX',
    'Denver, CO',
    'Houston, TX',
    'Las Vegas, NV',
    'Los Angeles, CA',
    'Miami, FL',
    'Nashville, TN',
  ];

  const topStates = [
    'Alaska',
    'Arizona',
    'California',
    'Colorado',
    'Florida',
    'Georgia',
    'Illinois',
    'Massachusetts',
    'Michigan',
    'Nevada',
    'New York',
    'North Carolina',
    'Ohio',
    'Oregon',
    'Pennsylvania',
    'Tennessee',
    'Texas',
    'Utah',
    'Virginia',
    'Washington',
  ];

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-teal-600 font-semibold mb-2">TOP CAREER</p>
          <h2 className="text-4xl font-bold text-gray-900">
            Top markets for dental professionals
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              In-demand jobs
            </h3>
            <ul className="space-y-3">
              {inDemandJobs.map((job, index) => (
                <li key={index}>
                  <Link
                    href="#"
                    className="text-orange-600 hover:text-orange-700 hover:underline"
                  >
                    {job}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="#"
              className="inline-block mt-6 text-orange-600 font-semibold hover:text-orange-700"
            >
              View all jobs →
            </Link>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Top cities for jobs
            </h3>
            <ul className="space-y-3">
              {topCities.map((city, index) => (
                <li key={index}>
                  <Link
                    href="#"
                    className="text-orange-600 hover:text-orange-700 hover:underline"
                  >
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="#"
              className="inline-block mt-6 text-orange-600 font-semibold hover:text-orange-700"
            >
              View all cities →
            </Link>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Top states for jobs
            </h3>
            <ul className="space-y-3">
              {topStates.map((state, index) => (
                <li key={index}>
                  <Link
                    href="#"
                    className="text-orange-600 hover:text-orange-700 hover:underline"
                  >
                    {state}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="#"
              className="inline-block mt-6 text-orange-600 font-semibold hover:text-orange-700"
            >
              View all states →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
