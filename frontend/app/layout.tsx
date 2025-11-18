import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'My Blog',
  description: 'A Strapi + Next.js Blog',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <header className="bg-white shadow p-4">
          <nav className="container mx-auto flex justify-between">
            <h1 className="text-xl font-bold">My Blog</h1>
            <ul className="flex gap-4">
              <li>Home</li>
              <li>Categories</li>
              <li>Authors</li>
            </ul>
          </nav>
        </header>
        <main className="container mx-auto mt-6">{children}</main>
      </body>
    </html>
  );
}
