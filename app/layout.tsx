import './global.css';
import type { Metadata } from 'next';
import { Manrope, IBM_Plex_Mono } from 'next/font/google';
import { Navbar } from './components/nav';
import { BackButton } from './components/back-button';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Footer from './components/footer';
import { absoluteUrl, siteConfig } from './seo';

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
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: '%s | Kye Gomez',
  },
  description: siteConfig.description,
  applicationName: 'Kye Gomez',
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': [{ url: '/rss', title: 'Kye Gomez RSS Feed' }],
    },
  },
  authors: [{ name: 'Kye Gomez', url: siteConfig.url }],
  creator: 'Kye Gomez',
  publisher: 'Kye Gomez',
  keywords: [
    'Kye Gomez',
    'swarms.ai',
    'agora labs',
    'open source',
    'AI researcher',
    'artificial intelligence',
    'multi-agent systems',
    'LLM architecture',
    'AI engineering',
  ],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: 'Kye Gomez',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: absoluteUrl(siteConfig.ogImage),
        width: 1200,
        height: 630,
        alt: 'Kye Gomez website preview image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.xHandle,
    site: siteConfig.xHandle,
    images: [absoluteUrl(siteConfig.ogImage)],
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
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${ibmPlexMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Kye Gomez',
              url: siteConfig.url,
              email: siteConfig.email,
              sameAs: [
                'https://github.com/kyegomez',
                'https://x.com/KyeGomezB',
                'https://www.linkedin.com/in/kye-g-38759a207/',
                'https://www.youtube.com/@kyegomez3242',
                'https://medium.com/@kyeg',
              ],
              worksFor: {
                '@type': 'Organization',
                name: 'Swarms',
                url: 'https://swarms.ai',
              },
            }),
          }}
        />
        <main className="site-shell">
          <Navbar />
          <BackButton />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
