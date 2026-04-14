import Link from 'next/link';

const employerData: Record<string, { title: string, subtitle: string, content: string }> = {
  'premium': {
    title: 'Premium Job Posting Subscription',
    subtitle: 'Maximize your visibility and hire faster.',
    content: 'Get access to priority listings, enhanced clinic branding, resume database access, and dedicated account management to fill your empty chairs immediately.'
  },
  'corporate': {
    title: 'Corporate Services',
    subtitle: 'Scalable hiring solutions for DSOs and multi-location practices.',
    content: 'Manage multiple offices from a single dashboard. Leverage our proprietary matching algorithm and bulk posting discounts tailored for enterprise operations.'
  }
};

export default function EmployerPage({ params }: { params: { slug: string } }) {
  const data = employerData[params.slug];

  if (!data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-slate-50 text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">Page Not Found</h1>
        <p className="text-slate-600 mb-6">The employer service you are looking for does not exist.</p>
        <Link href="/" className="px-6 py-2 bg-teal-500 text-white rounded font-medium hover:bg-teal-600 transition">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] bg-slate-50 flex flex-col items-center py-20 px-4">
      <div className="max-w-3xl w-full bg-white border border-slate-200 rounded-2xl shadow-sm p-10 text-center flex flex-col items-center">
        <span className="inline-block px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
           Employer Feature
        </span>
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4">{data.title}</h1>
        <h2 className="text-xl text-slate-600 mb-8">{data.subtitle}</h2>
        
        <div className="h-px bg-slate-200 w-full my-6"></div>
        
        <p className="text-lg text-slate-700 leading-relaxed text-center mb-8">
           {data.content}
        </p>

        <div className="w-full max-w-sm">
           <form className="flex flex-col gap-3">
              <input type="text" placeholder="Practice Name" className="border px-4 py-3 rounded outline-none focus:border-orange-500" />
              <input type="email" placeholder="Work Email" className="border px-4 py-3 rounded outline-none focus:border-orange-500" />
              <button type="button" className="bg-orange-500 text-white py-3 rounded font-medium shadow-sm hover:bg-orange-600 transition">
                 Request More Information
              </button>
           </form>
        </div>
      </div>
    </div>
  );
}
