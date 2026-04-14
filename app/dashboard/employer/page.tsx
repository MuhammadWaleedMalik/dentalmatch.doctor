"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function EmployerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [showPostJob, setShowPostJob] = useState(false);
  const [newJob, setNewJob] = useState({ jobName: '', description: '', company: '', area: '', timeline: '', category: 'Dental Assistants' });

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated" && (session?.user as any).role !== "employer") router.push("/");

    if (status === "authenticated") {
      fetchJobs();
      fetchApplications();
    }
  }, [status, session]);

  const fetchJobs = () => {
    const employerId = (session?.user as any)?.id;
    if (employerId) {
      fetch(`/api/jobs?employerId=${employerId}`)
        .then((res) => res.json())
        .then((data) => setJobs(data));
    }
  };

  const fetchApplications = () => {
    fetch("/api/applications")
      .then((res) => res.json())
      .then((data) => setApplications(data));
  };

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJob)
      });
      if (res.ok) {
         toast.success("Job posted successfully! Pending Admin approval.");
         setShowPostJob(false);
         fetchJobs();
      } else {
         toast.error("Failed to post job");
      }
    } catch {
      toast.error("Server error");
    }
  };

  const handleApproveApplication = async (id: string) => {
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "approved" })
      });
      if (res.ok) {
         toast.success("Application approved! Job is now marked as filled.");
         fetchApplications();
         fetchJobs();
      }
    } catch {
      toast.error("Error approving application");
    }
  };

  const handleDeleteJob = async (id: string) => {
      try {
        const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
        if (res.ok) {
           toast.success("Job deleted");
           fetchJobs();
        }
      } catch { toast.error("Error deleting job") }
  }

  if (status === "loading") return <div className="p-8">Loading...</div>;

  return (
    <div className="flex bg-slate-50 min-h-[calc(100vh-80px)]">
      <aside className="w-64 bg-white border-r p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Employer Panel</h2>
        <nav className="space-y-2">
          <button onClick={() => setShowPostJob(false)} className={`w-full text-left px-4 py-2 rounded-md font-medium ${!showPostJob ? "bg-teal-50 text-teal-700" : "text-slate-600 hover:bg-slate-50"}`}>Overview</button>
          <button onClick={() => setShowPostJob(true)} className={`w-full text-left px-4 py-2 rounded-md font-medium ${showPostJob ? "bg-teal-50 text-teal-700" : "text-slate-600 hover:bg-slate-50"}`}>Post a Job</button>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {showPostJob ? (
           <div className="bg-white p-6 rounded border max-w-2xl">
              <h2 className="text-2xl font-bold mb-4">Post a New Job</h2>
              <form onSubmit={handlePostJob} className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium mb-1">Job Title</label>
                    <input type="text" required className="w-full border p-2 rounded" value={newJob.jobName} onChange={e => setNewJob({...newJob, jobName: e.target.value})} />
                 </div>
                 <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select className="w-full border p-2 rounded" value={newJob.category} onChange={e => setNewJob({...newJob, category: e.target.value})}>
                       <option value="Dental Assistants">Dental Assistants</option>
                       <option value="Dental Front Office">Dental Front Office</option>
                       <option value="Dental Hygienists">Dental Hygienists</option>
                       <option value="Dentists">Dentists</option>
                       <option value="Dental Lab Technicians">Dental Lab Technicians</option>
                       <option value="Dental Sales Rep">Dental Sales Rep</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-medium mb-1">Company</label>
                    <input type="text" required className="w-full border p-2 rounded" value={newJob.company} onChange={e => setNewJob({...newJob, company: e.target.value})} />
                 </div>
                 <div>
                    <label className="block text-sm font-medium mb-1">Location / Area</label>
                    <input type="text" required className="w-full border p-2 rounded" value={newJob.area} onChange={e => setNewJob({...newJob, area: e.target.value})} />
                 </div>
                 <div>
                    <label className="block text-sm font-medium mb-1">Timeline (When to start)</label>
                    <input type="text" required className="w-full border p-2 rounded" value={newJob.timeline} onChange={e => setNewJob({...newJob, timeline: e.target.value})} />
                 </div>
                 <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea required className="w-full border p-2 rounded" rows={4} value={newJob.description} onChange={e => setNewJob({...newJob, description: e.target.value})}></textarea>
                 </div>
                 <button type="submit" className="bg-orange-500 text-white px-6 py-2 rounded">Submit for Approval</button>
              </form>
           </div>
        ) : (
           <div className="space-y-8">
              <div>
                 <h2 className="text-2xl font-bold mb-4">My Posted Jobs</h2>
                 <div className="grid gap-4">
                    {jobs.map((job: any) => (
                       <div key={job._id} className="bg-white p-4 rounded border flex justify-between items-center">
                          <div>
                             <h4 className="font-semibold">{job.jobName}</h4>
                             <p className="text-sm text-slate-500">Status: {job.status}</p>
                          </div>
                          <button onClick={() => handleDeleteJob(job._id)} className="text-red-500 text-sm">Delete</button>
                       </div>
                    ))}
                    {jobs.length === 0 && <p className="text-sm text-slate-500">No jobs posted yet.</p>}
                 </div>
              </div>

              <div>
                 <h2 className="text-2xl font-bold mb-4">Applications Received</h2>
                 <div className="grid gap-4">
                    {applications.map((app: any) => (
                       <div key={app._id} className="bg-white p-4 rounded border flex justify-between items-center">
                          <div>
                             <h4 className="font-semibold text-teal-700">{app.seekerId?.email} applied for {app.jobId?.jobName}</h4>
                             <p className="text-sm text-slate-600 mt-1">Why need: {app.whyNeed}</p>
                             <p className="text-sm text-slate-600">Salary: {app.salaryExpectation} | Phone: {app.phone}</p>
                             <p className="text-xs text-orange-500 uppercase mt-1 tracking-wider font-semibold">Status: {app.status}</p>
                          </div>
                          {app.status === 'pending' && (
                             <button onClick={() => handleApproveApplication(app._id)} className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded text-sm transition">
                                Approve (Hire)
                             </button>
                          )}
                       </div>
                    ))}
                    {applications.length === 0 && <p className="text-sm text-slate-500">No applications yet.</p>}
                 </div>
              </div>
           </div>
        )}
      </main>
    </div>
  );
}
