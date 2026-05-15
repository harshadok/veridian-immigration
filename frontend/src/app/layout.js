import './globals.css';
import { Plus_Jakarta_Sans, Cormorant_Garamond } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { COMPANY } from '@/data/site';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap'
});

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap'
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || COMPANY.url;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Veridian Immigration Services Dubai | Your Journey. Our Commitment. Your Future.',
    template: '%s | Veridian Immigration Services Dubai'
  },
  description:
    'Veridian Immigration Services is a premier Dubai-based consultancy guiding individuals and families to a global future — UAE Golden Visa, study abroad, PR, and work permits.',
  keywords:
    'Dubai immigration consultancy, UAE Golden Visa, study abroad Dubai, visa consultant UAE, IELTS coaching Dubai, PR services, Veridian Immigration',
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 }
  },
  icons: {
    icon: '/logo.jpeg',
    apple: '/logo.jpeg'
  },
  openGraph: {
    title: 'Veridian Immigration Services — Dubai',
    description: 'Your Journey. Our Commitment. Your Future.',
    images: ['/logo.jpeg'],
    type: 'website',
    locale: 'en_AE',
    url: SITE_URL,
    siteName: 'Veridian Immigration Services'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veridian Immigration Services — Dubai',
    description: 'Your Journey. Our Commitment. Your Future.',
    images: ['/logo.jpeg']
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  }
};

export const viewport = {
  themeColor: '#0f3d2e',
  width: 'device-width',
  initialScale: 1
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#organization`,
  name: COMPANY.name,
  image: `${SITE_URL}/logo.jpeg`,
  logo: `${SITE_URL}/logo.jpeg`,
  url: SITE_URL,
  telephone: COMPANY.phone,
  email: COMPANY.email,
  description: COMPANY.description,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Sheikh Zayed Road, Business Bay',
    addressLocality: 'Dubai',
    addressCountry: 'AE'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: COMPANY.geo.lat,
    longitude: COMPANY.geo.lng
  },
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    opens: '09:00',
    closes: '18:00'
  }],
  sameAs: Object.values(COMPANY.social)
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
