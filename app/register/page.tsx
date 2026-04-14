"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<"seeker" | "employer">("seeker");
  const [loading, setLoading] = useState(false);
  
  // Base
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Seeker
  const [seekerName, setSeekerName] = useState("");
  const [seekerAge, setSeekerAge] = useState("");
  const [seekerProfession, setSeekerProfession] = useState("");
  const [seekerDescription, setSeekerDescription] = useState("");
  const [seekerLocation, setSeekerLocation] = useState("");
  
  // Employer
  const [empName, setEmpName] = useState("");
  const [empCompany, setEmpCompany] = useState("");
  const [empAge, setEmpAge] = useState("");
  const [empCity, setEmpCity] = useState("");
  const [empProfession, setEmpProfession] = useState("");
  const [empDescription, setEmpDescription] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    let profileData: any = {};
    if (role === "seeker") {
       profileData = {
          name: seekerName,
          age: Number(seekerAge),
          profession: seekerProfession,
          description: seekerDescription,
          location: seekerLocation
       };
    } else {
       profileData = {
          name: empName,
          companyName: empCompany,
          age: Number(empAge),
          city: empCity,
          profession: empProfession,
          description: empDescription
       };
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role, profileData }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      toast.success("Account created successfully! Please login.");
      router.push("/login");
    } catch (error) {
       toast.error("Failed to register");
       setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4 my-10">
      <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-sm border">
        <div className="text-center mb-8">
           <h1 className="text-2xl font-bold text-slate-800">Create an Account</h1>
           <p className="text-slate-500 mt-2">Join DentalPost to find your next opportunity or great hire.</p>
        </div>
        
        <div className="flex gap-4 mb-8">
          <button 
             onClick={() => setRole("seeker")}
             className={`flex-1 py-3 border rounded-md font-medium transition-colors ${role === "seeker" ? "bg-teal-50 border-teal-500 text-teal-700" : "bg-white text-slate-500 hover:bg-slate-50"}`}
          >
            I am a Job Seeker
          </button>
          <button 
             onClick={() => setRole("employer")}
             className={`flex-1 py-3 border rounded-md font-medium transition-colors ${role === "employer" ? "bg-teal-50 border-teal-500 text-teal-700" : "bg-white text-slate-500 hover:bg-slate-50"}`}
          >
            I am an Employer
          </button>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
               <input type="email" required className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 outline-none" value={email} onChange={(e) => setEmail(e.target.value)} />
             </div>
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
               <input type="password" required className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 outline-none" value={password} onChange={(e) => setPassword(e.target.value)} />
             </div>
          </div>
          
          <hr className="my-4" />

          {role === 'seeker' ? (
             <div className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                        <input type="text" required className="w-full px-4 py-2 border rounded-md focus:ring-teal-500 outline-none" value={seekerName} onChange={e => setSeekerName(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
                        <input type="number" required className="w-full px-4 py-2 border rounded-md focus:ring-teal-500 outline-none" value={seekerAge} onChange={e => setSeekerAge(e.target.value)} />
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Profession</label>
                        <input type="text" required className="w-full px-4 py-2 border rounded-md focus:ring-teal-500 outline-none" value={seekerProfession} onChange={e => setSeekerProfession(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                        <input type="text" required className="w-full px-4 py-2 border rounded-md focus:ring-teal-500 outline-none" value={seekerLocation} onChange={e => setSeekerLocation(e.target.value)} />
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Short Description</label>
                    <textarea required className="w-full px-4 py-2 border rounded-md focus:ring-teal-500 outline-none" rows={3} value={seekerDescription} onChange={e => setSeekerDescription(e.target.value)}></textarea>
                 </div>
             </div>
          ) : (
             <div className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                        <input type="text" required className="w-full px-4 py-2 border rounded-md focus:ring-teal-500 outline-none" value={empName} onChange={e => setEmpName(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
                        <input type="number" required className="w-full px-4 py-2 border rounded-md focus:ring-teal-500 outline-none" value={empAge} onChange={e => setEmpAge(e.target.value)} />
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                        <input type="text" required className="w-full px-4 py-2 border rounded-md focus:ring-teal-500 outline-none" value={empCompany} onChange={e => setEmpCompany(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                        <input type="text" required className="w-full px-4 py-2 border rounded-md focus:ring-teal-500 outline-none" value={empCity} onChange={e => setEmpCity(e.target.value)} />
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Profession / Role</label>
                    <input type="text" required className="w-full px-4 py-2 border rounded-md focus:ring-teal-500 outline-none" value={empProfession} onChange={e => setEmpProfession(e.target.value)} />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Company Description</label>
                    <textarea required className="w-full px-4 py-2 border rounded-md focus:ring-teal-500 outline-none" rows={3} value={empDescription} onChange={e => setEmpDescription(e.target.value)}></textarea>
                 </div>
             </div>
          )}
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-4 bg-orange-500 text-white font-medium py-2.5 rounded-md hover:bg-orange-600 transition-colors disabled:opacity-70"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
           Already have an account? <Link href="/login" className="text-teal-600 hover:underline">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
