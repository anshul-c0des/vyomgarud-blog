import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "VyomGarud",
  description: "Future of Drones | Blog",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-white dark:bg-neutral-black text-neutral-black dark:text-neutral-white transition-colors duration-300">
        <Navbar />

        {/* Main content area */}
        <main className="container mx-auto mt-30 max-w-7xl bg-neutral-white dark:bg-neutral-gray-900 rounded-lg dark:shadow-gray-700 transition-all duration-300">
          {children}
        </main>

        {/* Footer*/}
        <footer className="mt-16 bg-neutral-gray-100 dark:bg-neutral-black text-neutral-gray-800 dark:text-neutral-gray-200 py-3 transition-colors duration-300 border-t border-brand-orange">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-10">
            <p>© {new Date().getFullYear()} VyomGarud. All rights reserved.</p>
            <div className="flex gap-6">
              <a
                href="https://vyomgarud-landing-topaz.vercel.app/"
                className="hover:text-brand-orange transition-colors"
              >
                About
              </a>
              <a
                href="https://vyomgarud-landing-topaz.vercel.app/"
                className="hover:text-brand-orange transition-colors"
              >
                Mission
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
