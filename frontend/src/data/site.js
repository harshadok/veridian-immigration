// Centralized data for Veridian Immigration Services — Dubai

export const COMPANY = {
  name: 'Veridian Immigration Services',
  short: 'Veridian',
  location: 'Dubai',
  tagline: 'Your Journey. Our Commitment. Your Future.',
  description:
    'A Dubai-based immigration consultancy guiding individuals and families to a global future.',
  email: 'info@veridianimmigration.com',
  phone: '+971 50 123 4567',
  phoneLink: '+971501234567',
  whatsapp: '971501234567',
  address: 'Sheikh Zayed Road, Business Bay, Dubai, UAE',
  hours: 'Sun–Thu: 9:00 AM – 6:00 PM',
  url: 'https://veridianimmigration.com',
  geo: { lat: 25.1873, lng: 55.2754 },
  social: {
    facebook:  'https://www.facebook.com/veridianimmigration',
    instagram: 'https://www.instagram.com/veridianimmigration',
    linkedin:  'https://www.linkedin.com/company/veridianimmigration',
    youtube:   'https://www.youtube.com/@veridianimmigration',
    twitter:   'https://twitter.com/veridianimmig'
  }
};

export const COUNTRIES = [
  {
    code: 'ca', name: 'Canada', slug: 'canada',
    flag: 'https://flagcdn.com/w320/ca.png',
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=900',
    blurb: 'World-class education and the world\'s clearest PR pathway.'
  },
  {
    code: 'au', name: 'Australia', slug: 'australia',
    flag: 'https://flagcdn.com/w320/au.png',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=900',
    blurb: 'Globally recognised degrees and a points-based PR system.'
  },
  {
    code: 'gb', name: 'United Kingdom', slug: 'uk',
    flag: 'https://flagcdn.com/w320/gb.png',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=900',
    blurb: 'Centuries of academic excellence and graduate-route visa.'
  },
  {
    code: 'us', name: 'United States', slug: 'usa',
    flag: 'https://flagcdn.com/w320/us.png',
    image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=900',
    blurb: 'Top-ranked institutions and unmatched career opportunities.'
  },
  {
    code: 'de', name: 'Germany', slug: 'germany',
    flag: 'https://flagcdn.com/w320/de.png',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=900',
    blurb: 'Tuition-free public universities, booming job market.'
  },
  {
    code: 'ie', name: 'Ireland', slug: 'ireland',
    flag: 'https://flagcdn.com/w320/ie.png',
    image: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=900',
    blurb: 'Europe\'s tech hub with attractive stay-back options.'
  },
  {
    code: 'nz', name: 'New Zealand', slug: 'new-zealand',
    flag: 'https://flagcdn.com/w320/nz.png',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900',
    blurb: 'Quality education with one of the highest qualities of life.'
  },
  {
    code: 'sg', name: 'Singapore', slug: 'singapore',
    flag: 'https://flagcdn.com/w320/sg.png',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=900',
    blurb: 'Asia\'s premier business and education hub.'
  }
];

export const SERVICES = [
  {
    icon: 'GraduationCap',
    title: 'Study Abroad',
    desc: 'End-to-end support: university shortlisting, applications, SOPs, and admissions.'
  },
  {
    icon: 'Plane',
    title: 'Visa Assistance',
    desc: 'Student, tourist, work, and family visas handled with care and precision.'
  },
  {
    icon: 'Briefcase',
    title: 'Work Permits',
    desc: 'Skilled migration and work permit programmes for professionals worldwide.'
  },
  {
    icon: 'Home',
    title: 'Permanent Residency',
    desc: 'PR pathways for Canada, Australia, and other key destinations.'
  },
  {
    icon: 'Languages',
    title: 'IELTS / PTE Coaching',
    desc: 'Certified trainers, mock tests, and proven techniques to hit your target band.'
  },
  {
    icon: 'Users',
    title: 'Family Sponsorship',
    desc: 'Reunite with loved ones through spouse, parent, and dependent visas.'
  }
];

// TODO: Replace with real client testimonials once you've collected them.
export const TESTIMONIALS = [
  {
    name: 'Ahmed Al-Mansoori',
    course: 'Family Sponsorship · Dubai',
    text: 'The Veridian team handled my family\'s sponsorship application with care from start to finish. Honest advice and clear communication throughout.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'
  },
  {
    name: 'Aisha Khan',
    course: 'BSc Nursing · Australia',
    text: 'Their IELTS coaching pushed me from 6.0 to 7.5 in just two months. Today I\'m studying in Melbourne — all thanks to the Veridian family.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200'
  },
  {
    name: 'Vikram Patel',
    course: 'Permanent Residency · Australia',
    text: 'A complex PR application made simple. The Veridian team navigated every nuance and now I\'m settled with my family in Melbourne.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200'
  }
];

export const STATS = [
  { value: '3+',   label: 'Years of Service' },
  { value: '98%',  label: 'Visa Approval Rate' },
  { value: '8',    label: 'Destination Countries' }
];

export const PROCESS_STEPS = [
  { n: '01', title: 'Free Consultation', desc: 'Share your goals; we map out the destinations and pathways that fit you best.' },
  { n: '02', title: 'Profile Evaluation', desc: 'A thorough assessment of academics, finances, and long-term objectives.' },
  { n: '03', title: 'Strategic Planning', desc: 'A curated shortlist of universities, programmes, or visa categories.' },
  { n: '04', title: 'Application & Docs', desc: 'Polished applications, statements, and a complete documentation file.' },
  { n: '05', title: 'Visa Processing', desc: 'Financial documentation, mock interviews, and submission support.' },
  { n: '06', title: 'Beyond Departure', desc: 'Travel, accommodation, and post-landing support — we stay with you.' }
];

export const TEAM = [
  {
    name: 'SHAIK MOHAMMED RAFI',
    role: 'Managing Director (MD)',
    bio: 'Leads Veridian\'s strategic vision and ensures excellence in every client engagement.',
    photo: 'https://ui-avatars.com/api/?name=SHAIK+RAFI&background=1e40af&color=fff&size=200&bold=true',
    linkedin: '#'
  },
  {
    name: 'SAFANUL FARIS',
    role: 'Chief Executive Officer (CEO)',
    bio: 'Guides Veridian\'s growth and global partnerships with a focus on transparent, honest client guidance.',
    photo: 'https://ui-avatars.com/api/?name=SAFANUL+FARIS&background=1e40af&color=fff&size=200&bold=true',
    linkedin: '#'
  },
  {
    name: 'SHAHZEENA SHAIBA',
    role: 'Chief Operating Officer (COO)',
    bio: 'Oversees end-to-end case management — from initial consultation through visa processing and beyond.',
    photo: 'https://ui-avatars.com/api/?name=SHAHZEENA+SHAIBA&background=1e40af&color=fff&size=200&bold=true',
    linkedin: '#'
  },
  {
    name: 'ARJUMAN RANA',
    role: 'Processing Manager',
    bio: 'Ensures smooth and timely processing of all visa applications and documentation.',
    photo: 'https://ui-avatars.com/api/?name=ARJUMAN+RANA&background=1e40af&color=fff&size=200&bold=true',
    linkedin: '#'
  },
  {
    name: 'ISAAQ',
    role: 'Public Relations Officer (PRO)',
    bio: 'Builds and strengthens Veridian\'s relationships with partners, clients, and the community.',
    photo: 'https://ui-avatars.com/api/?name=ISAAQ&background=1e40af&color=fff&size=200&bold=true',
    linkedin: '#'
  },
  {
    name: 'MOHAMMED SHAFIQ',
    role: 'Marketing Manager',
    bio: 'Drives Veridian\'s brand presence and connects us with prospective clients worldwide.',
    photo: 'https://ui-avatars.com/api/?name=MOHAMMED+SHAFIQ&background=1e40af&color=fff&size=200&bold=true',
    linkedin: '#'
  }
];
