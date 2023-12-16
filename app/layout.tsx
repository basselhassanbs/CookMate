import type { Metadata } from 'next';
import './globals.css';
import { NextAuthProvider } from './NextAuthProvider';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import Header from './Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <NextAuthProvider>
          <MantineProvider>
            <Header />
            <main className='p-4'>{children}</main>
          </MantineProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
