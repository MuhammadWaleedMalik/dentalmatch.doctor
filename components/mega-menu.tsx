import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const jobsFeatures: { title: string; href: string; description: string }[] = [
  {
    title: "Assessments",
    href: "/assessments",
    description: "Understand yourself better so you can make the right career moves. Free for job seekers.",
  },
  {
    title: "Continuing Education (CE)",
    href: "/ce",
    description: "Track & maintain CE credits right on your dashboard, and get special pricing.",
  },
  {
    title: "Temp Jobs",
    href: "/temp-jobs",
    description: "Open to temp? Choose days you're available to work and get alerts.",
  },
]

const resourcesLinks: { title: string; href: string }[] = [
  { title: "2026 Salary Survey Report", href: "/resources/salary-survey" },
  { title: "Industry Events", href: "/resources/events" },
  { title: "Jobseeker Toolkit", href: "/resources/jobseeker-toolkit" },
  { title: "Hiring Toolkit", href: "/resources/hiring-toolkit" },
  { title: "Dental Career Guide", href: "/resources/career-guide" },
  { title: "Educator Toolkit", href: "/resources/educator-toolkit" },
  { title: "Dental Marketing", href: "/resources/marketing" },
]

export function MegaMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-base font-medium">Jobs</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-6 md:w-[600px] lg:w-[800px] lg:grid-cols-[1fr_1fr]">
              <div className="flex flex-col gap-4">
                <h4 className="text-2xl font-medium text-slate-800">Find a Job</h4>
                <p className="text-sm text-slate-500">Browse jobs for the following positions near you.</p>
                <div className="grid grid-cols-2 gap-4 mt-2">
                   <Link href="/jobs?category=Dental Assistants" className="text-orange-500 hover:underline">Dental Assistants</Link>
                   <Link href="/jobs?category=Dental Front Office" className="text-orange-500 hover:underline">Dental Front Office</Link>
                   <Link href="/jobs?category=Dental Hygienists" className="text-orange-500 hover:underline">Dental Hygienists</Link>
                   <Link href="/jobs?category=Dentists" className="text-orange-500 hover:underline">Dentists</Link>
                   <Link href="/jobs?category=Dental Lab Technicians" className="text-orange-500 hover:underline">Dental Lab Technicians</Link>
                   <Link href="/jobs?category=Dental Sales Rep" className="text-orange-500 hover:underline">Dental Sales Rep</Link>
                </div>
                <div className="mt-4">
                  <Link href="/jobs" className="bg-[#333] text-white px-6 py-2 rounded-md font-medium hover:bg-black transition-colors">
                    Browse all dental jobs
                  </Link>
                </div>
              </div>
              <div className="border-l pl-6">
                <h4 className="text-2xl font-medium text-slate-800 mb-4">Dental Professional Features</h4>
                <div className="flex flex-col gap-4">
                  {jobsFeatures.map((feature) => (
                    <div key={feature.title} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                        {/* Placeholder for icon */}
                        <div className="w-4 h-4 bg-teal-500 rounded-full" />
                      </div>
                      <div>
                        <h5 className="font-medium text-slate-900">{feature.title}</h5>
                        <p className="text-sm text-slate-500">{feature.description} <Link href={feature.href} className="text-orange-500 hover:underline">Learn More</Link></p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-base font-medium">Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-6 md:w-[600px] lg:w-[800px] lg:grid-cols-[1fr_1fr]">
              <div className="flex flex-col gap-4">
                <h4 className="text-2xl font-medium text-slate-800">Resources</h4>
                <p className="text-sm text-slate-500">Access the data, guidance and information you need to be the most successful in your dental career.</p>
                <div className="grid grid-cols-2 gap-4 mt-2">
                   {resourcesLinks.map(res => (
                     <Link key={res.title} href={res.href} className="text-orange-500 hover:underline">{res.title}</Link>
                   ))}
                </div>
              </div>
              <div className="border-l pl-6">
                 <h4 className="text-2xl font-medium text-slate-800 mb-4">Our Blog</h4>
                 <div className="text-sm text-slate-500">
                    <p>Read our latest articles and updates.</p>
                 </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-base font-medium">Employers</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-6 md:w-[600px] lg:w-[800px] lg:grid-cols-[1fr_1fr]">
              <div className="flex flex-col gap-4">
                <h4 className="text-2xl font-medium text-slate-800">Post a Job</h4>
                <p className="text-sm text-slate-500">Find and Hire Qualified Dental Professionals</p>
                <div className="grid grid-cols-2 gap-4 mt-2">
                   <Link href="/employers/premium" className="text-orange-500 hover:underline">Premium Job Posting Subscription</Link>
                   <Link href="/employers/corporate" className="text-orange-500 hover:underline">Corporate Services</Link>
                </div>
              </div>
              <div className="border-l pl-6">
                 <h4 className="text-2xl font-medium text-slate-800 mb-4">Dental Employer Features</h4>
                 <div className="flex flex-col gap-4">
                    <div>
                        <h5 className="font-medium text-slate-900">Resume Search - Direct Messaging</h5>
                        <p className="text-sm text-slate-500">Research public candidates in your area... <span className="text-orange-500">Learn More</span></p>
                    </div>
                 </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
