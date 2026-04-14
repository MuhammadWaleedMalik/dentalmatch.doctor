"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<'jobs' | 'users' | 'resources'>('jobs');
  
  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState([]);
  const [resources, setResources] = useState([]);
  
  const [newResTitle, setNewResTitle] = useState("");
  const [newResDesc, setNewResDesc] = useState("");
  const [newResLink, setNewResLink] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated" && (session?.user as any).role !== "admin") router.push("/");

    if (status === "authenticated") {
      fetchJobs();
      fetchUsers();
      fetchResources();
    }
  }, [status, session]);

  const fetchJobs = () => fetch("/api/jobs").then(res => res.json()).then(data => setJobs(data));
  const fetchUsers = () => fetch("/api/users").then(res => res.json()).then(data => setUsers(data));
  const fetchResources = () => fetch("/api/resources").then(res => res.json()).then(data => setResources(data));

  // --- Jobs ---
  const handleApproveJob = async (id: string) => {
    try {
      const res = await fetch(`/api/jobs/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "approved" }) });
      if (res.ok) { toast.success("Job approved!"); fetchJobs(); }
    } catch { toast.error("Error approving"); }
  };
  const handleDeleteJob = async (id: string) => {
    try {
      const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
      if (res.ok) { toast.success("Job deleted"); fetchJobs(); }
    } catch { toast.error("Error deleting"); }
  }

  // --- Users ---
  const handleBanUser = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'banned' ? 'active' : 'banned';
    try {
      const res = await fetch(`/api/users/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: newStatus }) });
      if (res.ok) { toast.success(`User is now ${newStatus}`); fetchUsers(); }
    } catch { toast.error("Error updating user"); }
  };
  const handleDeleteUser = async (id: string) => {
    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (res.ok) { toast.success("User deleted completely"); fetchUsers(); }
    } catch { toast.error("Error deleting"); }
  };

  // --- Resources ---
  const handleAddResource = async (e: React.FormEvent) => {
     e.preventDefault();
     try {
       const res = await fetch("/api/resources", {
         method: "POST", headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ title: newResTitle, description: newResDesc, link: newResLink })
       });
       if (res.ok) { toast.success("Resource added"); fetchResources(); setNewResTitle(""); setNewResDesc(""); setNewResLink(""); }
     } catch { toast.error("Error adding resource"); }
  };
  const handleDeleteResource = async (id: string) => {
    try {
      const res = await fetch(`/api/resources/${id}`, { method: "DELETE" });
      if (res.ok) { toast.success("Resource deleted"); fetchResources(); }
    } catch { toast.error("Error deleting"); }
  }

  if (status === "loading") return <div className="p-8">Loading...</div>;

  return (
    <div className="flex bg-slate-50 min-h-[calc(100vh-80px)]">
      <aside className="w-64 bg-slate-900 text-white p-6">
        <h2 className="text-xl font-bold mb-6">Master Admin</h2>
        <nav className="space-y-2">
          <button onClick={() => setActiveTab('jobs')} className={`w-full text-left px-4 py-2 rounded-md font-medium ${activeTab === 'jobs' ? 'bg-slate-800' : 'hover:bg-slate-800/50'}`}>Jobs</button>
          <button onClick={() => setActiveTab('users')} className={`w-full text-left px-4 py-2 rounded-md font-medium ${activeTab === 'users' ? 'bg-slate-800' : 'hover:bg-slate-800/50'}`}>Users</button>
          <button onClick={() => setActiveTab('resources')} className={`w-full text-left px-4 py-2 rounded-md font-medium ${activeTab === 'resources' ? 'bg-slate-800' : 'hover:bg-slate-800/50'}`}>Resources</button>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        
        {activeTab === 'jobs' && (
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Platform Jobs</h2>
            <div className="grid gap-4">
              {jobs.map((job: any) => (
                 <div key={job._id} className="bg-white p-5 rounded border shadow-sm flex justify-between items-center">
                    <div>
                       <h4 className="font-bold text-lg">{job.jobName}</h4>
                       <p className="text-sm text-slate-600 mb-1">{job.company} - {job.category}</p>
                       <span className={`px-2 py-0.5 rounded text-xs font-semibold uppercase ${job.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>{job.status}</span>
                    </div>
                    <div className="flex gap-2">
                       {job.status === 'pending' && <button onClick={() => handleApproveJob(job._id)} className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1.5 rounded text-sm transition">Approve</button>}
                       <button onClick={() => handleDeleteJob(job._id)} className="border border-red-200 text-red-500 hover:bg-red-50 px-3 py-1.5 rounded text-sm transition">Delete</button>
                    </div>
                 </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Users Management</h2>
            <div className="bg-white rounded border shadow-sm">
                <table className="w-full text-left border-collapse">
                   <thead>
                      <tr className="bg-slate-50 border-b">
                         <th className="p-4 font-medium text-slate-500">Email</th>
                         <th className="p-4 font-medium text-slate-500">Role</th>
                         <th className="p-4 font-medium text-slate-500">Status</th>
                         <th className="p-4 font-medium text-slate-500">Actions</th>
                      </tr>
                   </thead>
                   <tbody>
                      {users.map((u: any) => (
                         <tr key={u._id} className="border-b last:border-0 hover:bg-slate-50">
                            <td className="p-4 font-medium">{u.email}</td>
                            <td className="p-4 capitalize">{u.role}</td>
                            <td className="p-4">
                               <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${u.status === 'banned' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                  {u.status || 'active'}
                               </span>
                            </td>
                            <td className="p-4 flex gap-2">
                               <button onClick={() => handleBanUser(u._id, u.status)} className="px-3 py-1 bg-slate-200 text-slate-800 hover:bg-slate-300 rounded text-sm font-medium">
                                  {u.status === 'banned' ? 'Unban' : 'Ban'}
                               </button>
                               <button onClick={() => handleDeleteUser(u._id)} className="px-3 py-1 bg-red-100 text-red-600 hover:bg-red-200 rounded text-sm font-medium">Delete</button>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Resources (Reflected to Main Page)</h2>
            <form onSubmit={handleAddResource} className="bg-white p-6 rounded border shadow-sm mb-6 flex flex-col gap-4">
               <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input type="text" required className="border w-full p-2 rounded" value={newResTitle} onChange={e => setNewResTitle(e.target.value)} />
               </div>
               <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <input type="text" required className="border w-full p-2 rounded" value={newResDesc} onChange={e => setNewResDesc(e.target.value)} />
               </div>
               <div>
                  <label className="block text-sm font-medium mb-1">External Link (Optional)</label>
                  <input type="url" className="border w-full p-2 rounded" value={newResLink} onChange={e => setNewResLink(e.target.value)} />
               </div>
               <button type="submit" className="bg-teal-500 text-white font-medium py-2 rounded self-start px-6">Add Resource</button>
            </form>
            
            <div className="grid gap-4">
               {resources.map((res: any) => (
                  <div key={res._id} className="bg-white p-4 items-center flex justify-between border rounded">
                     <div>
                        <h4 className="font-bold">{res.title}</h4>
                        <p className="text-sm text-slate-600">{res.description}</p>
                     </div>
                     <button onClick={() => handleDeleteResource(res._id)} className="text-red-500 text-sm hover:underline">Delete</button>
                  </div>
               ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
