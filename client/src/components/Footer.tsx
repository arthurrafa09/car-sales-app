// AutoLux Footer — Dark Luxury Automotive
// Elegant dark footer with gold accents

import { Link } from "wouter";
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "oklch(0.07 0.004 260)", borderTop: "1px solid oklch(1 0 0 / 6%)" }}>
      {/* Gold separator */}
      <div className="gold-line" />

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3
                className="text-2xl font-bold tracking-widest uppercase mb-2"
                style={{ fontFamily: "var(--font-display)", color: "oklch(0.93 0.008 75)" }}
              >
                Auto<span style={{ color: "oklch(0.72 0.12 75)" }}>Lux</span>
              </h3>
              <p
                className="text-xs tracking-widest uppercase"
                style={{ color: "oklch(0.72 0.12 75)", fontFamily: "var(--font-body)" }}
              >
                Premium Car Sales
              </p>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "oklch(0.55 0.010 75)", fontFamily: "var(--font-body)" }}>
              Há mais de 20 anos conectando apaixonados por automóveis aos veículos dos seus sonhos. Excelência, confiança e exclusividade em cada negociação.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 flex items-center justify-center border transition-all duration-300 hover:border-gold hover:text-gold"
                  style={{
                    borderColor: "oklch(1 0 0 / 10%)",
                    color: "oklch(0.55 0.010 75)",
                  }}
                  onClick={() => {}}
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4
              className="text-xs font-semibold tracking-widest uppercase mb-6"
              style={{ color: "oklch(0.72 0.12 75)", fontFamily: "var(--font-body)" }}
            >
              Navegação
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Início" },
                { href: "/catalogo", label: "Catálogo" },
                { href: "/sobre", label: "Sobre Nós" },
                { href: "/contato", label: "Contato" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span
                      className="text-sm transition-colors duration-300 hover:text-gold"
                      style={{ color: "oklch(0.55 0.010 75)", fontFamily: "var(--font-body)" }}
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4
              className="text-xs font-semibold tracking-widest uppercase mb-6"
              style={{ color: "oklch(0.72 0.12 75)", fontFamily: "var(--font-body)" }}
            >
              Categorias
            </h4>
            <ul className="space-y-3">
              {["Esportivos", "Sedans", "SUVs", "Elétricos", "Conversíveis"].map((cat) => (
                <li key={cat}>
                  <Link href="/catalogo">
                    <span
                      className="text-sm transition-colors duration-300 hover:text-gold"
                      style={{ color: "oklch(0.55 0.010 75)", fontFamily: "var(--font-body)" }}
                    >
                      {cat}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-xs font-semibold tracking-widest uppercase mb-6"
              style={{ color: "oklch(0.72 0.12 75)", fontFamily: "var(--font-body)" }}
            >
              Contato
            </h4>
            <ul className="space-y-4">
              {[
                { icon: Phone, text: "(11) 9 0000-0000" },
                { icon: Mail, text: "contato@autolux.com.br" },
                { icon: MapPin, text: "Av. Paulista, 1000\nSão Paulo, SP" },
              ].map(({ icon: Icon, text }, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Icon size={14} className="mt-0.5 shrink-0" style={{ color: "oklch(0.72 0.12 75)" }} />
                  <span
                    className="text-sm leading-relaxed whitespace-pre-line"
                    style={{ color: "oklch(0.55 0.010 75)", fontFamily: "var(--font-body)" }}
                  >
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid oklch(1 0 0 / 5%)" }}>
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "oklch(0.40 0.008 75)", fontFamily: "var(--font-body)" }}>
            © 2024 AutoLux Premium Car Sales. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            {["Privacidade", "Termos", "Cookies"].map((item) => (
              <button
                key={item}
                className="text-xs transition-colors hover:text-gold"
                style={{ color: "oklch(0.40 0.008 75)", fontFamily: "var(--font-body)" }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
