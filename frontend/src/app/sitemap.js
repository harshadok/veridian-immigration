const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://veridianimmigration.com';

export default function sitemap() {
  const lastModified = new Date();
  const sections = ['', '#about', '#services', '#countries', '#process', '#testimonials', '#contact'];
  return sections.map((s) => ({
    url: `${SITE_URL}/${s}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: s === '' ? 1.0 : 0.7
  }));
}
