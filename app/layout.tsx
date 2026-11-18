import type { Metadata } from 'next';
import '../src/index.css';

export const metadata: Metadata = {
  title: 'Tic-Tac-Toe — Classic Strategy. Modern Experience.',
  description: 'Classic Strategy. Modern Experience. A polished Tic-Tac-Toe game built with React, TypeScript, and Tailwind CSS.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="dark"><body className="bg-[#080B12] text-slate-100 antialiased selection:bg-sky-400/25 selection:text-sky-100">{children}</body></html>;
}
