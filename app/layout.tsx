import './global.css';
import type { Metadata } from 'next';
import { Orbitron, Share_Tech_Mono } from 'next/font/google';
import { Navbar } from './components/nav';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Footer from './components/footer';
import { baseUrl } from './sitemap';

const orbitron = Orbitron({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-orbitron',
});

const shareTechMono = Share_Tech_Mono({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-share-tech-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Kye Gomez | Founder of swarms.ai & agoralab.ai | Open Source AI Researcher',
    template: '%s | Kye Gomez',
  },
  description: 'Kye Gomez is the founder of swarms.ai and agoralab.ai, and an open source AI researcher dedicated to advancing humanity through technology.',
  keywords: ['Kye Gomez', 'swarms.ai', 'agoralab.ai', 'open source', 'AI researcher', 'artificial intelligence', 'U/acc', 'swarms'],
  openGraph: {
    title: 'Kye Gomez | Founder of swarms.ai & agoralab.ai',
    description: 'Kye Gomez is the founder of swarms.ai and agoralab.ai, and an open source AI researcher.',
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
    <html lang="en" className={`${orbitron.variable} ${shareTechMono.variable}`}>
      <body>
        <div className="matrix-bg" id="matrix-bg"></div>
        <main className="min-h-screen">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
        <script dangerouslySetInnerHTML={{
          __html: `
            // Matrix rain effect
            function createMatrixRain() {
              const matrixBg = document.getElementById('matrix-bg');
              if (!matrixBg) return;
              
              const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
              const columns = Math.floor(window.innerWidth / 20);
              
              for (let i = 0; i < columns; i++) {
                const char = document.createElement('div');
                char.className = 'matrix-char';
                char.style.left = i * 20 + 'px';
                char.style.animationDelay = Math.random() * 3 + 's';
                char.textContent = chars[Math.floor(Math.random() * chars.length)];
                matrixBg.appendChild(char);
              }
            }
            
            if (typeof window !== 'undefined') {
              createMatrixRain();
              window.addEventListener('resize', () => {
                const matrixBg = document.getElementById('matrix-bg');
                if (matrixBg) {
                  matrixBg.innerHTML = '';
                  createMatrixRain();
                }
              });
            }
          `
        }} />
      </body>
    </html>
  );
}
