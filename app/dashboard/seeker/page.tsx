"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SeekerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated" && (session?.user as any).role !== "seeker") router.push("/");

    if (status === "authenticated") {
      fetch("/api/applications")
        .then((res) => res.json())
        .then((data) => setApplications(data))
        .catch(() => toast.error("Failed to load applications"));
    }
  }, [status, session]);

  const handleWithdraw = async (id: string) => {
    try {
      const res = await fetch(`/api/applications/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to withdraw");
      setApplications(applications.filter((a: any) => a._id !== id));
      toast.success("Application withdrawn");
    } catch (e) {
      toast.error("Withdrawal failed");
    }
  };

  if (status === "loading") return <div className="p-8">Loading...</div>;

  return (
    <div className="flex bg-slate-50 min-h-[calc(100vh-80px)]">
      <aside className="w-64 bg-white border-r p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Seeker Dashboard</h2>
        <nav className="space-y-2">
          <a href="#" className="block px-4 py-2 bg-teal-50 text-teal-700 rounded-md font-medium">My Applications</a>
          <a href="/jobs" className="block px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md">Find Jobs</a>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">My Applications</h1>
        {applications.length === 0 ? (
           <p className="text-slate-500 bg-white p-6 rounded border">You haven't applied to any jobs yet.</p>
        ) : (
           <div className="space-y-4">
              {applications.map((app: any) => (
                <div key={app._id} className="bg-white p-6 rounded border shadow-sm flex items-center justify-between">
                   <div>
                      <h3 className="text-lg font-medium text-slate-800">{app.jobId?.jobName}</h3>
                      <p className="text-sm text-slate-500">{app.jobId?.company} - {app.jobId?.area}</p>
                      <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Status: {app.status}
                      </div>
                   </div>
                   <button 
                     onClick={() => handleWithdraw(app._id)}
                     className="text-red-500 hover:bg-red-50 px-4 py-2 rounded-md font-medium text-sm transition-colors"
                   >
                     Withdraw
                   </button>
                </div>
              ))}
           </div>
        )}
      </main>
    </div>
  );
}
