"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";

export default function JobsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(categoryParam || "All");

  const categories = [
    'All',
    'Dental Assistants',
    'Dental Front Office',
    'Dental Hygienists',
    'Dentists',
    'Dental Lab Technicians',
    'Dental Sales Rep',
  ];

  useEffect(() => {
    fetch("/api/jobs?status=approved")
      .then(res => res.json())
      .then(data => {
         setJobs(data);
      });
  }, []);

  useEffect(() => {
     let result = jobs;
     
     if (category && category !== "All") {
        result = result.filter((j: any) => j.category === category);
     }
     
     if (search) {
        result = result.filter((j: any) => 
           j.jobName.toLowerCase().includes(search.toLowerCase()) || 
           j.tags.some((t: string) => t.toLowerCase().includes(search.toLowerCase()))
        );
     }
     
     setFilteredJobs(result);
  }, [jobs, search, category]);

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Browse Jobs</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 space-y-6">
           <div>
              <h3 className="font-semibold text-slate-800 mb-3">Search</h3>
              <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                 <input 
                   type="text"
                   placeholder="Job title or keywords"
                   className="w-full pl-9 pr-4 py-2 border rounded-md outline-none focus:border-teal-500 focus:ring-1"
                   value={search}
                   onChange={e => setSearch(e.target.value)}
                 />
              </div>
           </div>
           
           <div>
              <h3 className="font-semibold text-slate-800 mb-3">Category</h3>
              <div className="space-y-2">
                 {categories.map(cat => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                       <input 
                         type="radio" 
                         name="category"
                         checked={category === cat}
                         onChange={() => setCategory(cat)}
                         className="text-teal-500 focus:ring-teal-500"
                       />
                       <span className={category === cat ? "text-slate-800 font-medium" : "text-slate-600"}>{cat}</span>
                    </label>
                 ))}
              </div>
           </div>
        </aside>

        {/* Job Listings */}
        <main className="flex-1">
           <div className="grid gap-4">
              {filteredJobs.length === 0 ? (
                 <div className="p-8 text-center bg-white border rounded">
                    <p className="text-slate-500">No jobs found matching your criteria.</p>
                 </div>
              ) : (
                 filteredJobs.map((job: any) => (
                    <div key={job._id} className="bg-white p-6 rounded-lg border hover:shadow-md transition-shadow">
                       <div className="flex justify-between items-start">
                          <div>
                             <Link href={`/jobs/${job._id}`} className="text-xl font-bold text-teal-700 hover:underline">
                               {job.jobName}
                             </Link>
                             <p className="text-slate-600 mt-1">{job.company} &bull; {job.area}</p>
                             <div className="flex flex-wrap gap-2 mt-3">
                                <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium">{job.category}</span>
                                {job.tags.map((tag: string) => (
                                   <span key={tag} className="bg-orange-50 text-orange-600 px-2 py-1 rounded text-xs font-medium">
                                      {tag}
                                   </span>
                                ))}
                             </div>
                          </div>
                          <div className="text-right">
                             <p className="text-sm font-medium text-slate-800 mb-3">{job.timeline}</p>
                             <Link href={`/jobs/${job._id}`} className="bg-teal-500 text-white px-5 py-2 rounded font-medium hover:bg-teal-600 transition">
                                View Details
                             </Link>
                          </div>
                       </div>
                    </div>
                 ))
              )}
           </div>
        </main>
      </div>
    </div>
  );
}
