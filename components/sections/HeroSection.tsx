'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function HeroSection() {
  const router = useRouter();
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');
  const [topJobs, setTopJobs] = useState([]);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetch('/api/jobs?status=approved')
      .then(res => res.json())
      .then(data => setTopJobs(data.slice(0, 5)))
      .catch(err => console.error(err));
      
    fetch('/api/resources')
      .then(res => res.json())
      .then(data => setResources(data.slice(0, 3)))
      .catch(err => console.error(err));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (category && category !== 'All Categories') params.append('category', category);
    if (city) params.append('search', city);
    
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[600px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/3845653/pexels-photo-3845653.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Dental professional"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center py-20">
        <div className="w-full max-w-3xl">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl p-8 mb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Find your Next Dental Job Here
            </h1>
            <p className="text-gray-600 mb-6">
              Join the nation's largest job board for dental professionals.
            </p>

            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="City or Zip Code"
                    className="pl-10 h-12"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select 
                    className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    <option value="Dentists">Dentist</option>
                    <option value="Dental Hygienists">Dental Hygienist</option>
                    <option value="Dental Assistants">Dental Assistant</option>
                    <option value="Dental Front Office">Office Manager</option>
                  </select>
                </div>
              </div>

              <Button type="submit" className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white text-lg">
                <Search className="mr-2 h-5 w-5" />
                Search Jobs
              </Button>
            </form>
          </div>

          {topJobs.length > 0 && (
             <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-4 mt-6">
               <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Top Dental Jobs Right Now</h3>
               <div className="flex flex-col gap-2">
                 {topJobs.map((job: any) => (
                    <Link key={job._id} href={`/jobs/${job._id}`} className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 p-3 rounded transition-colors group border border-gray-100">
                       <span className="font-medium text-gray-800 group-hover:text-teal-600">{job.jobName}</span>
                       <span className="text-xs text-gray-500">{job.company} - {job.area}</span>
                    </Link>
                 ))}
               </div>
             </div>
          )}

          {resources.length > 0 && (
             <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-4 mt-4">
               <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Latest Admin Resources</h3>
               <div className="grid md:grid-cols-3 gap-3">
                 {resources.map((res: any) => (
                    <div key={res._id} className="bg-teal-50 p-3 rounded border border-teal-100">
                       <h4 className="font-medium text-teal-800 text-sm mb-1">{res.title}</h4>
                       <p className="text-xs text-teal-600 mb-2">{res.description}</p>
                       {res.link && <a href={res.link} target="_blank" rel="noreferrer" className="text-xs font-semibold text-orange-500 hover:underline">Read More &rarr;</a>}
                    </div>
                 ))}
               </div>
             </div>
          )}
        </div>
      </div>
    </section>
  );
}
