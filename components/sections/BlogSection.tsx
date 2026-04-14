'use client';

import { ChevronLeft, ChevronRight, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function BlogSection() {
  const blogPosts = [
    {
      category: 'DENTISTRY',
      title: 'What Data Shows Dentists Really Want Out of Their Careers',
      author: 'Sean Duffin',
      date: 'October 28, 2025',
      image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      category: 'SALARY',
      title: '2026 Salary Survey Report Breakdown',
      author: 'Sean Duffin',
      date: 'October 15, 2025',
      image: 'https://images.pexels.com/photos/305565/pexels-photo-305565.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      category: 'INTERVIEWS',
      title: 'Unleash the Power of Wording: Interviews: Your Secret Weapon in the Dental Job...',
      author: 'Sean Duffin',
      date: 'September 10, 2025',
      image: 'https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      category: 'DENTISTRY',
      title: 'Struggling to Hire a Dentist? Here\'s How to Fix It',
      author: 'Sean Duffin',
      date: 'August 24, 2025',
      image: 'https://images.pexels.com/photos/3779705/pexels-photo-3779705.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      category: 'EMPLOYMENT',
      title: 'When a Dental Team Member Won\'t Work More: Your Guide to Securing Top Talent',
      author: 'Sean Duffin',
      date: 'August 5, 2025',
      image: 'https://images.pexels.com/photos/3952043/pexels-photo-3952043.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-teal-600 font-semibold mb-2">THE BLOG</p>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">What's Trending</h2>
              <p className="text-gray-600">
                Stay updated on the latest dental industry news and dental job trends.
              </p>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white hidden md:inline-flex">
              View all posts
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {blogPosts.map((post, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded">
                      {post.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 min-h-[3rem]">
                    {post.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="h-4 w-4 mr-1" />
                    <span className="mr-2">{post.author}</span>
                    <span>• {post.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            View all posts
          </Button>
        </div>
      </div>
    </section>
  );
}
