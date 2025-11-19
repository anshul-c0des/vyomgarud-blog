'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sun, Moon} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode on mount
  useEffect(() => {
    const stored = localStorage.getItem('vyomgarud-dark');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'true' || (!stored && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('vyomgarud-dark', String(next));
      return next;
    });
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: 'https://vyomgarud-landing-topaz.vercel.app/' },
  ];

  return (
    <header className="fixed w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] top-2 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex justify-between items-center p-4 md:px-6 bg-neutral-white/95 dark:bg-neutral-gray-900/90 backdrop-blur-md rounded-2xl shadow-xl border border-neutral-gray-100 dark:border-neutral-gray-800 transition-all duration-300">
        
        {/* Logo/Brand Name */}
        <Link href="/" className="flex items-center space-x-2">
          <h1 className="text-xl font-extrabold text-neutral-black dark:text-neutral-white hover:text-brand-orange transition-colors duration-300">
            VyomGarud
          </h1>
        </Link>

        {/* Navigation Links */}
        <ul className="hidden lg:flex gap-8 font-medium text-neutral-gray-600 dark:text-neutral-gray-300">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                href={link.href}
                className="hover:text-brand-orange transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Dark Mode Toggle Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={toggleDarkMode}
          className="p-2 w-10 h-10 rounded-full border-brand-orange/50 dark:border-brand-orange bg-transparent hover:bg-brand-orange/10 dark:hover:bg-brand-orange/20 transition-all duration-300 text-brand-orange"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-brand-orange dark:text-orange-300" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>
      </nav>
    </header>
  );
}