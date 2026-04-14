"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const router = useRouter();
  
  const [job, setJob] = useState<any>(null);
  const [showApply, setShowApply] = useState(false);

  const [whyNeed, setWhyNeed] = useState("");
  const [comfortableWithTime, setComfortableWithTime] = useState("");
  const [salaryExpectation, setSalaryExpectation] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch(`/api/jobs`)
      .then(res => res.json())
      .then((data) => {
         const found = data.find((j: any) => j._id === params.id);
         setJob(found);
      });
  }, [params.id]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
       toast.error("Please log in as a Seeker to apply.");
       router.push("/login");
       return;
    }
    if ((session.user as any).role !== "seeker") {
       toast.error("Only seekers can apply for jobs.");
       return;
    }

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: job._id,
          whyNeed,
          comfortableWithTime,
          salaryExpectation,
          phone,
          email
        })
      });

      const data = await res.json();
      if (res.ok) {
         toast.success("Application submitted successfully!");
         setShowApply(false);
         router.push("/dashboard/seeker");
      } else {
         toast.error(data.message || "Failed to apply");
      }
    } catch {
       toast.error("Error submitting application");
    }
  };

  if (!job) return <div className="p-10 text-center">Loading job...</div>;

  return (
    <div className="max-w-[800px] mx-auto px-4 py-10">
      <div className="bg-white p-8 rounded-xl shadow-sm border mb-6">
         <h1 className="text-3xl font-bold text-slate-800 mb-2">{job.jobName}</h1>
         <div className="flex items-center gap-4 text-slate-600 mb-6">
            <span>{job.company}</span>
            <span>&bull;</span>
            <span>{job.area}</span>
            <span>&bull;</span>
            <span className="font-medium text-teal-600">{job.timeline}</span>
         </div>
         
         <div className="prose max-w-none text-slate-700 mb-8 whitespace-pre-wrap">
            {job.description}
         </div>

         <div className="flex gap-2">
            {!showApply && (
              <button 
                onClick={() => setShowApply(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md font-medium transition"
              >
                Apply Now
              </button>
            )}
         </div>
      </div>

      {showApply && (
         <div className="bg-white p-8 rounded-xl shadow-sm border border-teal-200" id="apply-form">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Application Details</h2>
            <form onSubmit={handleApply} className="space-y-4">
               <div>
                  <label className="block text-sm font-medium mb-1">Why do you need this job?</label>
                  <textarea required rows={3} className="w-full border p-2 rounded" value={whyNeed} onChange={e => setWhyNeed(e.target.value)}></textarea>
               </div>
               <div>
                  <label className="block text-sm font-medium mb-1">Are you comfortable with the timeline?</label>
                  <input type="text" required className="w-full border p-2 rounded" value={comfortableWithTime} onChange={e => setComfortableWithTime(e.target.value)} />
               </div>
               <div>
                  <label className="block text-sm font-medium mb-1">Salary Expectation</label>
                  <input type="text" required className="w-full border p-2 rounded" value={salaryExpectation} onChange={e => setSalaryExpectation(e.target.value)} />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div>
                     <label className="block text-sm font-medium mb-1">Phone Number</label>
                     <input type="tel" required className="w-full border p-2 rounded" value={phone} onChange={e => setPhone(e.target.value)} />
                  </div>
                  <div>
                     <label className="block text-sm font-medium mb-1">Email</label>
                     <input type="email" required className="w-full border p-2 rounded" value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
               </div>
               <div className="pt-4 flex gap-4">
                  <button type="submit" className="bg-teal-500 text-white px-6 py-2 rounded font-medium">Submit Application</button>
                  <button type="button" onClick={() => setShowApply(false)} className="text-slate-500 hover:text-slate-700">Cancel</button>
               </div>
            </form>
         </div>
      )}
    </div>
  );
}
