'use client';

import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ReportSection() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded mb-4">
              EXPLORE IT
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              2026 Dental Salary Report
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Wondering where you fall in the pay scale compared to other dental professionals?
              Uncover valuable insights and understand the pay standards for the whole industry.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Download DentalPost's Annual Salary Survey for 2026 to see where you compare.
            </p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Download className="mr-2 h-4 w-4" />
              Get the full report
            </Button>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-green-400 to-lime-500 rounded-lg p-8 shadow-xl">
              <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
                <div className="bg-green-600 text-white p-6">
                  <h3 className="text-2xl font-bold mb-2">2026 Dental</h3>
                  <p className="text-lg">Salary Report</p>
                </div>
                <div className="p-6">
                  <img
                    src="https://images.pexels.com/photos/5327584/pexels-photo-5327584.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Dental professional"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="mt-4 space-y-2">
                    <div className="h-2 bg-green-200 rounded w-3/4"></div>
                    <div className="h-2 bg-green-200 rounded w-1/2"></div>
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
