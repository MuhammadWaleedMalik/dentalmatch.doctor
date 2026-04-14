import Link from 'next/link';

const pageData: Record<string, { title: string, subtitle: string, content: string }> = {
  'salary-survey': {
    title: '2026 Salary Survey Report',
    subtitle: 'Comprehensive compensation data for dental professionals.',
    content: 'Discover the latest salary trends, state-by-state comparisons, and benefit packages for Dental Assistants, Hygienists, Dentists, and Front Office staff.'
  },
  'events': {
    title: 'Industry Events',
    subtitle: 'Upcoming dental conferences, webinars, and networking opportunities.',
    content: 'Stay connected with the dental community by attending the most anticipated industry events of the year. Build your network and earn CE credits.'
  },
  'jobseeker-toolkit': {
    title: 'Jobseeker Toolkit',
    subtitle: 'Everything you need to land your dream dental job.',
    content: 'Learn how to write a standout resume, prepare for working interviews, and negotiate your contract like a pro.'
  },
  'hiring-toolkit': {
    title: 'Hiring Toolkit',
    subtitle: 'Streamline your recruitment process.',
    content: 'Access templates for job descriptions, interview questions, and onboarding checklists tailored specifically for dental practices.'
  },
  'career-guide': {
    title: 'Dental Career Guide',
    subtitle: 'Navigate your professional journey with confidence.',
    content: 'From fresh graduate to seasoned professional, our comprehensive guide covers continuing education, specializations, and leadership in dentistry.'
  },
  'educator-toolkit': {
    title: 'Educator Toolkit',
    subtitle: 'Resources for dental educators and academic programs.',
    content: 'Bridge the gap between graduation and employment with our curriculum guides and student career resources.'
  },
  'marketing': {
    title: 'Dental Marketing',
    subtitle: 'Grow your practice and attract top talent.',
    content: 'Learn effective employer branding strategies and digital marketing techniques to make your practice stand out.'
  }
};

export default function ResourcePage({ params }: { params: { slug: string } }) {
  const data = pageData[params.slug];

  if (!data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-slate-50 text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">Resource Not Found</h1>
        <p className="text-slate-600 mb-6">The resource you are looking for does not exist or is still being developed.</p>
        <Link href="/" className="px-6 py-2 bg-teal-500 text-white rounded font-medium hover:bg-teal-600 transition">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] bg-slate-50 flex flex-col items-center py-20 px-4">
      <div className="max-w-3xl w-full bg-white border border-slate-200 rounded-2xl shadow-sm p-10 text-center">
        <span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
           Resource Guide
        </span>
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4">{data.title}</h1>
        <h2 className="text-xl text-slate-600 mb-8">{data.subtitle}</h2>
        
        <div className="h-px bg-slate-200 w-full my-6"></div>
        
        <p className="text-lg text-slate-700 leading-relaxed text-left">
           {data.content}
        </p>

        <div className="mt-10 flex justify-center gap-4">
           <Link href="/register" className="px-6 py-3 bg-orange-500 text-white font-medium rounded hover:bg-orange-600 transition">
              Create an Account
           </Link>
           <Link href="/" className="px-6 py-3 bg-slate-100 text-slate-700 font-medium rounded hover:bg-slate-200 transition">
              Back to Home
           </Link>
        </div>
      </div>
    </div>
  );
}
