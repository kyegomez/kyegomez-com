import './global.css';
import type { Metadata } from 'next';
import { Manrope, IBM_Plex_Mono } from 'next/font/google';
import { Navbar } from './components/nav';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Footer from './components/footer';
import { baseUrl } from './sitemap';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-ibm-plex-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Kye Gomez | Founder of swarms.ai & agoralab.ai | Open Source AI Researcher',
    template: '%s | Kye Gomez',
  },
  description:
    'Kye Gomez is the founder of swarms.ai and agoralab.ai, and an open source AI researcher dedicated to advancing humanity through technology.',
  keywords: [
    'Kye Gomez',
    'swarms.ai',
    'agoralab.ai',
    'open source',
    'AI researcher',
    'artificial intelligence',
    'U/acc',
    'swarms',
  ],
  openGraph: {
    title: 'Kye Gomez | Founder of swarms.ai & agoralab.ai',
    description:
      'Kye Gomez is the founder of swarms.ai and agoralab.ai, and an open source AI researcher.',
    url: baseUrl,
    siteName: 'Kye Gomez',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${ibmPlexMono.variable}`}>
      <body>
        <main className="site-shell">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
