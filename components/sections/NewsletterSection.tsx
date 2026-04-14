'use client';

import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function NewsletterSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-teal-50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-full mb-4">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Stay In-The-Know
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Don't miss exclusive offers, free career & hiring tips, career insights, expert tips and more.
            Find out what's happening with the Dental Community. We respect your privacy. Unsubscribe anytime.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Name"
                className="h-12"
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="E-mail"
                className="h-12"
              />
            </div>
            <div>
              <select className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option value="">Select your role</option>
                <option>Dentist</option>
                <option>Dental Hygienist</option>
                <option>Dental Assistant</option>
                <option>Office Manager</option>
                <option>Other</option>
              </select>
            </div>
            <Button className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white text-lg">
              Subscribe Now
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
