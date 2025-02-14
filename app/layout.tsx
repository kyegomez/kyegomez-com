import './global.css';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Navbar } from './components/nav';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Footer from './components/footer';
import { baseUrl } from './sitemap';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Kye Gomez Home Page',
    template: '%s | Kye Gomez Home Page',
  },
  description: 'Advancing Humanity through AI, NanoTechnology, and Biology.',
  openGraph: {
    title: 'Kye Gomez Portfolio',
    description: 'Advancing Humanity through AI, NanoTechnology, and Biology.',
    url: baseUrl,
    siteName: 'Kye Gomez Portfolio',
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

const cx = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-black',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased">
        <main className="flex-auto min-w-0 flex flex-col">
          <div className="max-w-xl mx-4 lg:mx-auto">
            <Navbar />
          </div>
          {children}
          <div className="max-w-xl mx-4 lg:mx-auto">
            <Footer />
          </div>
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
