'use client';

import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-teal-50 to-cyan-50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            What others are saying about DentalPost
          </h2>
          <p className="text-gray-600">
            Feedback from the thousands of dental professionals using DentalPost.
          </p>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center">
                  <Quote className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  "Thank you so much for your service! The ability to search dental jobs and respond so easily really is awesome!"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">Mark L.</p>
                  <p className="text-sm text-gray-600">Registered Dental Hygienist</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center mt-8 space-x-2">
          <Button variant="outline" size="icon" className="rounded-full">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
