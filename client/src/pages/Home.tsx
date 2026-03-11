// AutoLux Home Page — Dark Luxury Automotive
// Design: Art Deco meets Contemporary Dark Luxury
// Hero: Full-bleed cinematic car image with asymmetric text overlay
// Sections: Stats, Featured Cars, Categories, Testimonials, CTA

import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, Star, Shield, Award, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { cars, formatPrice } from "@/lib/cars-data";
import CarCard from "@/components/CarCard";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663426215247/4btctDi2cyESRCVAWeEfc9/hero-car-oKYxz3owUcbnc4WiY3vc7L.webp";
const CAR_SPORTS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663426215247/4btctDi2cyESRCVAWeEfc9/car-sports-6CkHvbRXWAwuztb4KLteGJ.webp";
const CAR_SUV = "https://d2xsxph8kpxj0f.cloudfront.net/310519663426215247/4btctDi2cyESRCVAWeEfc9/car-suv-kEGhUzMsEpYqhLsjku2kFF.webp";
const CAR_ELECTRIC = "https://d2xsxph8kpxj0f.cloudfront.net/310519663426215247/4btctDi2cyESRCVAWeEfc9/car-electric-nbiMmUwkHcbfA7sqjUwnY3.webp";

const stats = [
  { value: "500+", label: "Veículos Vendidos" },
  { value: "20+", label: "Anos de Experiência" },
  { value: "98%", label: "Clientes Satisfeitos" },
  { value: "50+", label: "Marcas Premium" },
];

const testimonials = [
  {
    name: "Ricardo Almeida",
    role: "Empresário",
    text: "A experiência de comprar meu Ferrari na AutoLux foi simplesmente impecável. Atendimento personalizado do início ao fim.",
    rating: 5,
    avatar: "RA",
  },
  {
    name: "Fernanda Costa",
    role: "Diretora Executiva",
    text: "Encontrei meu Range Rover dos sonhos aqui. A equipe conhece profundamente cada veículo e tornou o processo muito tranquilo.",
    rating: 5,
    avatar: "FC",
  },
  {
    name: "Marcelo Santos",
    role: "Investidor",
    text: "Já é a terceira vez que compro na AutoLux. Confiança, transparência e os melhores veículos do mercado. Recomendo sem hesitar.",
    rating: 5,
    avatar: "MS",
  },
];

const categoryCards = [
  { label: "Esportivos", count: 12, image: CAR_SPORTS, value: "esportivo" },
  { label: "SUVs", count: 8, image: CAR_SUV, value: "suv" },
  { label: "Elétricos", count: 5, image: CAR_ELECTRIC, value: "elétrico" },
];

function useIntersectionObserver(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export default function Home() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const featuredCars = cars.filter((c) => c.badge === "destaque" || c.badge === "exclusivo").slice(0, 3);
  const recentCars = cars.slice(0, 4);

  const statsSection = useIntersectionObserver();
  const featuredSection = useIntersectionObserver();
  const categorySection = useIntersectionObserver();
  const testimonialsSection = useIntersectionObserver();

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.10 0.005 260)" }}>
      {/* ═══════════════════════════════════════
          HERO SECTION — Full-bleed cinematic
      ═══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="AutoLux Hero"
            className={`w-full h-full object-cover transition-opacity duration-1000 ${heroLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setHeroLoaded(true)}
          />
          {/* Dark overlay gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(105deg, oklch(0.08 0.005 260 / 0.92) 0%, oklch(0.08 0.005 260 / 0.70) 45%, oklch(0.08 0.005 260 / 0.30) 100%)",
            }}
          />
          {/* Bottom fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-48"
            style={{ background: "linear-gradient(to top, oklch(0.10 0.005 260), transparent)" }}
          />
        </div>

        {/* Content — asymmetric left-aligned */}
        <div className="relative z-10 container pb-24 pt-40">
          <div className="max-w-2xl">
            {/* Label */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12" style={{ background: "oklch(0.72 0.12 75)" }} />
              <span className="section-label">Veículos Premium</span>
            </div>

            {/* Headline */}
            <h1
              className="heading-display mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: "1.05" }}
            >
              Conduza o{" "}
              <span
                className="block"
                style={{
                  fontStyle: "italic",
                  color: "oklch(0.72 0.12 75)",
                  fontFamily: "var(--font-display)",
                }}
              >
                Extraordinário
              </span>
            </h1>

            {/* Subheadline */}
            <p
              className="text-lg mb-10 leading-relaxed max-w-lg"
              style={{ color: "oklch(0.70 0.008 75)", fontFamily: "var(--font-body)", fontWeight: 300 }}
            >
              A mais refinada seleção de automóveis de luxo. Cada veículo, uma obra-prima de engenharia e design.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link href="/catalogo">
                <button className="btn-gold rounded-none flex items-center gap-3 px-8 py-4">
                  Explorar Catálogo
                  <ArrowRight size={16} />
                </button>
              </Link>
              <Link href="/contato">
                <button className="btn-gold-outline rounded-none flex items-center gap-3 px-8 py-4">
                  Falar com Especialista
                </button>
              </Link>
            </div>

            {/* Mini stats */}
            <div className="flex gap-8 mt-12 pt-8" style={{ borderTop: "1px solid oklch(1 0 0 / 8%)" }}>
              {stats.slice(0, 3).map((stat) => (
                <div key={stat.label}>
                  <p
                    className="text-2xl font-bold"
                    style={{ fontFamily: "var(--font-display)", color: "oklch(0.72 0.12 75)" }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-xs tracking-wider"
                    style={{ color: "oklch(0.55 0.010 75)", fontFamily: "var(--font-body)", fontSize: "0.65rem" }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-gold-pulse">
          <span className="text-xs tracking-widest uppercase" style={{ color: "oklch(0.72 0.12 75 / 0.6)", fontSize: "0.6rem" }}>
            Scroll
          </span>
          <ChevronDown size={16} style={{ color: "oklch(0.72 0.12 75 / 0.6)" }} />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STATS SECTION
      ═══════════════════════════════════════ */}
      <section
        ref={statsSection.ref}
        style={{ background: "oklch(0.12 0.006 260)", borderTop: "1px solid oklch(1 0 0 / 6%)", borderBottom: "1px solid oklch(1 0 0 / 6%)" }}
      >
        <div className="container py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center transition-all duration-700 ${statsSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <p
                  className="text-4xl font-bold mb-2"
                  style={{ fontFamily: "var(--font-display)", color: "oklch(0.72 0.12 75)" }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-xs tracking-widest uppercase"
                  style={{ color: "oklch(0.55 0.010 75)", fontFamily: "var(--font-body)", fontSize: "0.65rem" }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURED CARS
      ═══════════════════════════════════════ */}
      <section ref={featuredSection.ref} className="container py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12" style={{ background: "oklch(0.72 0.12 75)" }} />
              <span className="section-label">Destaques</span>
            </div>
            <h2
              className="heading-display"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
            >
              Veículos em{" "}
              <span style={{ fontStyle: "italic", color: "oklch(0.72 0.12 75)" }}>Evidência</span>
            </h2>
          </div>
          <Link href="/catalogo">
            <button
              className="hidden md:flex items-center gap-2 text-xs tracking-widest uppercase transition-colors hover:text-gold"
              style={{ color: "oklch(0.55 0.010 75)", fontFamily: "var(--font-body)" }}
            >
              Ver Todos <ArrowRight size={14} />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCars.map((car, i) => (
            <div
              key={car.id}
              className={`transition-all duration-700 ${featuredSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <CarCard car={car} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CATEGORY CARDS
      ═══════════════════════════════════════ */}
      <section ref={categorySection.ref} className="py-24" style={{ background: "oklch(0.12 0.006 260)" }}>
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12" style={{ background: "oklch(0.72 0.12 75)" }} />
            <span className="section-label">Categorias</span>
          </div>
          <h2
            className="heading-display mb-12"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            Explore por{" "}
            <span style={{ fontStyle: "italic", color: "oklch(0.72 0.12 75)" }}>Categoria</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categoryCards.map((cat, i) => (
              <Link key={cat.value} href={`/catalogo?categoria=${cat.value}`}>
                <div
                  className={`relative overflow-hidden group cursor-pointer transition-all duration-700 ${categorySection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  style={{
                    aspectRatio: "4/3",
                    transitionDelay: `${i * 0.15}s`,
                  }}
                >
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background: "linear-gradient(to top, oklch(0.08 0.005 260 / 0.9) 0%, oklch(0.08 0.005 260 / 0.3) 60%, transparent 100%)",
                    }}
                  />
                  {/* Gold border on hover */}
                  <div
                    className="absolute inset-0 border-2 border-transparent transition-all duration-300 group-hover:border-gold"
                    style={{ borderColor: "oklch(0.72 0.12 75 / 0)" }}
                  />
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[oklch(0.72_0.12_75/0.5)] transition-all duration-300" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p
                      className="text-xs tracking-widest uppercase mb-1"
                      style={{ color: "oklch(0.72 0.12 75)", fontFamily: "var(--font-body)", fontSize: "0.6rem" }}
                    >
                      {cat.count} veículos
                    </p>
                    <h3
                      className="text-2xl font-bold"
                      style={{ fontFamily: "var(--font-display)", color: "oklch(0.93 0.008 75)" }}
                    >
                      {cat.label}
                    </h3>
                    <div
                      className="flex items-center gap-2 mt-3 text-xs tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ color: "oklch(0.72 0.12 75)", fontFamily: "var(--font-body)", fontSize: "0.65rem" }}
                    >
                      Explorar <ArrowRight size={12} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          RECENT LISTINGS
      ═══════════════════════════════════════ */}
      <section className="container py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12" style={{ background: "oklch(0.72 0.12 75)" }} />
              <span className="section-label">Recém Chegados</span>
            </div>
            <h2
              className="heading-display"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
            >
              Últimas{" "}
              <span style={{ fontStyle: "italic", color: "oklch(0.72 0.12 75)" }}>Aquisições</span>
            </h2>
          </div>
          <Link href="/catalogo">
            <button
              className="hidden md:flex items-center gap-2 text-xs tracking-widest uppercase transition-colors hover:text-gold"
              style={{ color: "oklch(0.55 0.010 75)", fontFamily: "var(--font-body)" }}
            >
              Catálogo Completo <ArrowRight size={14} />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {recentCars.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WHY AUTOLUX
      ═══════════════════════════════════════ */}
      <section style={{ background: "oklch(0.12 0.006 260)", borderTop: "1px solid oklch(1 0 0 / 6%)" }}>
        <div className="container py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px w-12" style={{ background: "oklch(0.72 0.12 75)" }} />
                <span className="section-label">Por que AutoLux</span>
              </div>
              <h2
                className="heading-display mb-6"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
              >
                A Excelência como{" "}
                <span style={{ fontStyle: "italic", color: "oklch(0.72 0.12 75)" }}>Padrão</span>
              </h2>
              <p
                className="text-base leading-relaxed mb-8"
                style={{ color: "oklch(0.60 0.010 75)", fontFamily: "var(--font-body)", fontWeight: 300 }}
              >
                Na AutoLux, cada veículo passa por uma rigorosa inspeção de 150 pontos antes de ser disponibilizado. Nossa equipe de especialistas garante que você receba não apenas um carro, mas uma experiência completa de luxo.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Shield, title: "Garantia Total", desc: "12 meses de cobertura completa em todos os veículos" },
                  { icon: Award, title: "Certificado Premium", desc: "Inspeção rigorosa de 150 pontos em cada veículo" },
                  { icon: Clock, title: "Entrega Expressa", desc: "Entrega em até 48h em qualquer estado do Brasil" },
                  { icon: Star, title: "Atendimento VIP", desc: "Consultor exclusivo dedicado à sua experiência" },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div
                      className="w-10 h-10 flex items-center justify-center shrink-0"
                      style={{ border: "1px solid oklch(0.72 0.12 75 / 0.3)" }}
                    >
                      <Icon size={16} style={{ color: "oklch(0.72 0.12 75)" }} />
                    </div>
                    <div>
                      <h4
                        className="text-sm font-semibold mb-1"
                        style={{ color: "oklch(0.85 0.008 75)", fontFamily: "var(--font-body)" }}
                      >
                        {title}
                      </h4>
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: "oklch(0.50 0.008 75)", fontFamily: "var(--font-body)" }}
                      >
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image collage */}
            <div className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src={HERO_IMG}
                  alt="Ferrari"
                  className="w-full object-cover"
                  style={{ aspectRatio: "1/1.2" }}
                />
                <div className="flex flex-col gap-4 mt-8">
                  <img
                    src={CAR_SUV}
                    alt="SUV"
                    className="w-full object-cover"
                    style={{ aspectRatio: "1/0.8" }}
                  />
                  <img
                    src={CAR_ELECTRIC}
                    alt="Electric"
                    className="w-full object-cover"
                    style={{ aspectRatio: "1/0.8" }}
                  />
                </div>
              </div>
              {/* Gold accent */}
              <div
                className="absolute -bottom-4 -left-4 w-32 h-32 opacity-20"
                style={{ border: "2px solid oklch(0.72 0.12 75)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════ */}
      <section ref={testimonialsSection.ref} className="container py-24">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12" style={{ background: "oklch(0.72 0.12 75)" }} />
            <span className="section-label">Depoimentos</span>
            <div className="h-px w-12" style={{ background: "oklch(0.72 0.12 75)" }} />
          </div>
          <h2
            className="heading-display"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            O que nossos{" "}
            <span style={{ fontStyle: "italic", color: "oklch(0.72 0.12 75)" }}>Clientes</span>{" "}
            dizem
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`p-8 transition-all duration-700 ${testimonialsSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{
                background: "oklch(0.13 0.006 260)",
                border: "1px solid oklch(1 0 0 / 8%)",
                transitionDelay: `${i * 0.15}s`,
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={12} fill="oklch(0.72 0.12 75)" style={{ color: "oklch(0.72 0.12 75)" }} />
                ))}
              </div>

              {/* Quote */}
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "oklch(0.65 0.010 75)", fontFamily: "var(--font-body)", fontWeight: 300 }}
              >
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 flex items-center justify-center text-xs font-bold"
                  style={{
                    background: "oklch(0.72 0.12 75 / 0.15)",
                    color: "oklch(0.72 0.12 75)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "oklch(0.85 0.008 75)", fontFamily: "var(--font-body)" }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "oklch(0.50 0.008 75)", fontFamily: "var(--font-body)" }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: "oklch(0.12 0.006 260)", borderTop: "1px solid oklch(1 0 0 / 6%)" }}
      >
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, oklch(0.72 0.12 75) 0, oklch(0.72 0.12 75) 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative container py-24 text-center">
          <span className="section-label mb-4 block">Pronto para começar?</span>
          <h2
            className="heading-display mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            Encontre o Veículo{" "}
            <span style={{ fontStyle: "italic", color: "oklch(0.72 0.12 75)" }}>dos seus Sonhos</span>
          </h2>
          <p
            className="text-base max-w-xl mx-auto mb-10"
            style={{ color: "oklch(0.60 0.010 75)", fontFamily: "var(--font-body)", fontWeight: 300 }}
          >
            Nossa equipe de especialistas está pronta para ajudá-lo a encontrar o automóvel perfeito. Agende uma visita ou entre em contato agora.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/catalogo">
              <button className="btn-gold rounded-none flex items-center gap-3 px-10 py-4 text-sm">
                Ver Catálogo Completo
                <ArrowRight size={16} />
              </button>
            </Link>
            <Link href="/contato">
              <button className="btn-gold-outline rounded-none flex items-center gap-3 px-10 py-4 text-sm">
                Falar com Especialista
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
