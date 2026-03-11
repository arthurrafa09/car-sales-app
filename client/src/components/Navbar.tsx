// AutoLux Navbar — Dark Luxury Automotive
// Sticky header with gold accent, transparent on hero, solid on scroll

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? "bg-[oklch(0.10_0.005_260/0.97)] backdrop-blur-md border-b border-white/5 shadow-[0_4px_30px_oklch(0_0_0/0.4)]"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 group">
              <div className="w-8 h-8 relative">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M4 20L8 12H24L28 20H4Z" stroke="oklch(0.72 0.12 75)" strokeWidth="1.5" fill="none"/>
                  <path d="M8 20V24H12V22H20V24H24V20" stroke="oklch(0.72 0.12 75)" strokeWidth="1.5" fill="none"/>
                  <circle cx="11" cy="22" r="2" fill="oklch(0.72 0.12 75)"/>
                  <circle cx="21" cy="22" r="2" fill="oklch(0.72 0.12 75)"/>
                  <path d="M10 12L12 8H20L22 12" stroke="oklch(0.72 0.12 75 / 0.5)" strokeWidth="1" fill="none"/>
                </svg>
              </div>
              <div>
                <span
                  className="text-xl font-bold tracking-widest uppercase"
                  style={{ fontFamily: "var(--font-display)", color: "oklch(0.93 0.008 75)" }}
                >
                  Auto<span style={{ color: "oklch(0.72 0.12 75)" }}>Lux</span>
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`text-sm font-medium tracking-widest uppercase transition-colors duration-300 relative group ${
                    location === link.href
                      ? "text-gold"
                      : "text-white/60 hover:text-white/90"
                  }`}
                  style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.15em" }}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${
                      location === link.href ? "w-full bg-gold" : "w-0 bg-gold group-hover:w-full"
                    }`}
                    style={{ background: "oklch(0.72 0.12 75)" }}
                  />
                </span>
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+551100000000"
              className="hidden lg:flex items-center gap-2 text-xs tracking-wider uppercase transition-colors duration-300"
              style={{ color: "oklch(0.72 0.12 75)", fontFamily: "var(--font-body)" }}
            >
              <Phone size={13} />
              <span>(11) 0000-0000</span>
            </a>

            <Link href="/catalogo">
              <button className="hidden md:block btn-gold rounded-none text-xs">
                Ver Catálogo
              </button>
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-400 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ background: "oklch(0.10 0.005 260 / 0.98)", backdropFilter: "blur(20px)" }}
      >
        <div className="container py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                onClick={() => setMenuOpen(false)}
                className={`block text-sm py-2 border-b tracking-widest uppercase transition-colors ${
                  location === link.href ? "text-gold border-gold/30" : "text-white/60 border-white/5 hover:text-white"
                }`}
                style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.15em", color: location === link.href ? "oklch(0.72 0.12 75)" : undefined }}
              >
                {link.label}
              </span>
            </Link>
          ))}
          <a
            href="tel:+551100000000"
            className="flex items-center gap-2 text-xs py-2 tracking-wider uppercase"
            style={{ color: "oklch(0.72 0.12 75)" }}
          >
            <Phone size={13} />
            (11) 0000-0000
          </a>
        </div>
      </div>
    </header>
  );
}
