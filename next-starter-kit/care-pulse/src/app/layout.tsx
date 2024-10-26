import { Roboto } from 'next/font/google';

import { Providers } from '@/app/providers';

import type { Metadata } from 'next';

import './globals.css';

const roboto = Roboto({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: `Dream Emirates - We make your dreams come true!`,
  description: `Dream Emirates is a company that makes your dreams come true!`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
