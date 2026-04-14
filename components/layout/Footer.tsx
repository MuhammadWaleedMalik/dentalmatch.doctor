'use client';

import Link from 'next/link';
import { Facebook, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center mb-4">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-teal-500 flex items-center justify-center">
                <span className="text-white font-bold">D</span>
              </div>
              <span className="text-2xl font-semibold text-gray-900">DentalPost</span>
            </div>
          </Link>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The world-leading marketplace and career resource for dental professionals.
          </p>
        </div>

        <div className="flex justify-center space-x-6 mb-8">
          <Link
            href="#"
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-teal-500 hover:text-teal-500 transition-colors"
          >
            <Facebook className="h-5 w-5" />
          </Link>
          <Link
            href="#"
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-teal-500 hover:text-teal-500 transition-colors"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link
            href="#"
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-teal-500 hover:text-teal-500 transition-colors"
          >
            <Instagram className="h-5 w-5" />
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <Link href="#" className="text-gray-600 hover:text-teal-600 transition-colors">
            About Us
          </Link>
          <Link href="#" className="text-gray-600 hover:text-teal-600 transition-colors">
            FAQs
          </Link>
          <Link href="#" className="text-gray-600 hover:text-teal-600 transition-colors">
            Contact Us
          </Link>
        </div>

        <div className="border-t pt-8">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <Link href="#" className="hover:text-teal-600 transition-colors">
              Privacy Statement
            </Link>
            <Link href="#" className="hover:text-teal-600 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-teal-600 transition-colors">
              Cookie Policy
            </Link>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            © {new Date().getFullYear()} DentalPost. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
