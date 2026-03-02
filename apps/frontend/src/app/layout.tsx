import type { Metadata } from "next";
import Link from "next/link";
import { SocketProvider } from "@/providers/SocketProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "CDM 2026 - Coupe du Monde FIFA",
  description: "Suivez la Coupe du Monde FIFA 2026 en direct",
};

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/matches", label: "Matchs" },
  { href: "/groups", label: "Groupes" },
  { href: "/teams", label: "Équipes" },
  { href: "/bracket", label: "Tableau" },
  { href: "/stadiums", label: "Stades" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <SocketProvider>
          {/* Header */}
          <header className="bg-primary-700 text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                <Link href="/" className="text-xl font-bold tracking-tight">
                  CDM 2026
                </Link>
                <nav className="hidden md:flex items-center gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                {/* Mobile menu button */}
                <div className="md:hidden">
                  <details className="relative">
                    <summary className="list-none cursor-pointer p-2">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </summary>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </details>
                </div>
              </div>
            </div>
          </header>

          {/* Main */}
          <main className="max-w-7xl mx-auto px-4 py-6 min-h-[calc(100vh-8rem)]">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-gray-800 text-gray-400 text-center py-4 text-sm">
            <p>CDM 2026 - Coupe du Monde FIFA - Projet M2-DI</p>
          </footer>
        </SocketProvider>
      </body>
    </html>
  );
}
