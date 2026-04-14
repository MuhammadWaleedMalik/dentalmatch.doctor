'use client';

import { CircleCheck as CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FeaturesSection() {
  const features = [
    {
      title: 'Scale up your profile',
      description:
        'Build a standout profile that showcases all your skills, experience, and qualifications. Recruiters view profiles to match you with opportunities that fit your career goals.',
    },
    {
      title: 'Make a better match',
      description:
        'With the help of advanced search, you can instantly navigate thousands of job listings to find the perfect dental opportunity. We help you meet the right match in a straightforward manner.',
    },
    {
      title: 'Follow dental industry news and trends',
      description:
        'Dentists share what\'s new in the dental and oral health care industry. We provide the latest news, information, and industry trends so you can make the most informed career decisions.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <p className="text-teal-600 font-semibold mb-2">WHY DENTALPOST</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            More than a job board
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            DentalPost gives you the career tools you need.
          </p>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white mb-12">
            Create your account
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative">
            <img
              src="https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Dental professional"
              className="rounded-lg shadow-xl w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
