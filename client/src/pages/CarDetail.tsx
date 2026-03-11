// AutoLux Car Detail Page — Dark Luxury Automotive
// Full car detail with image gallery, specs, features, and contact form

import { useState } from "react";
import { useParams, Link } from "wouter";
import {
  ArrowLeft, Zap, Gauge, Fuel, Settings, MapPin, Calendar, Activity,
  ChevronLeft, ChevronRight, Phone, Mail, Check, Star, Share2, Heart
} from "lucide-react";
import { cars, formatPrice, formatMileage } from "@/lib/cars-data";
import CarCard from "@/components/CarCard";
import { toast } from "sonner";

export default function CarDetail() {
  const { id } = useParams<{ id: string }>();
  const car = cars.find((c) => c.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [liked, setLiked] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20" style={{ background: "oklch(0.10 0.005 260)" }}>
        <div className="text-center">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)", color: "oklch(0.93 0.008 75)" }}
          >
            Veículo não encontrado
          </h2>
          <Link href="/catalogo">
            <button className="btn-gold rounded-none text-xs">Voltar ao Catálogo</button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedCars = cars.filter((c) => c.id !== car.id && c.category === car.category).slice(0, 3);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormSent(true);
    toast.success("Mensagem enviada! Nossa equipe entrará em contato em breve.", {
      style: { background: "oklch(0.13 0.006 260)", border: "1px solid oklch(0.72 0.12 75 / 0.3)", color: "oklch(0.93 0.008 75)" },
    });
  }

  const specs = [
    { icon: Zap, label: "Potência", value: `${car.power} cv` },
    { icon: Activity, label: "Torque", value: `${car.torque} Nm` },
    { icon: Gauge, label: "0-100 km/h", value: `${car.acceleration}s` },
    { icon: Gauge, label: "Vel. Máxima", value: `${car.topSpeed} km/h` },
    { icon: Fuel, label: "Combustível", value: car.fuel.charAt(0).toUpperCase() + car.fuel.slice(1) },
    { icon: Settings, label: "Câmbio", value: car.transmission.charAt(0).toUpperCase() + car.transmission.slice(1) },
    { icon: Calendar, label: "Ano", value: String(car.year) },
    { icon: MapPin, label: "Quilometragem", value: formatMileage(car.mileage) },
  ];

  return (
    <div className="min-h-screen pt-20" style={{ background: "oklch(0.10 0.005 260)" }}>
      {/* Breadcrumb */}
      <div
        className="py-4"
        style={{ borderBottom: "1px solid oklch(1 0 0 / 6%)", background: "oklch(0.12 0.006 260)" }}
      >
        <div className="container flex items-center gap-3">
          <Link href="/catalogo">
            <button
              className="flex items-center gap-2 text-xs tracking-wider uppercase transition-colors hover:text-gold"
              style={{ color: "oklch(0.55 0.010 75)", fontFamily: "var(--font-body)", fontSize: "0.65rem" }}
            >
              <ArrowLeft size={12} /> Catálogo
            </button>
          </Link>
          <span style={{ color: "oklch(0.30 0.008 75)" }}>/</span>
          <span
            className="text-xs tracking-wider"
            style={{ color: "oklch(0.72 0.12 75)", fontFamily: "var(--font-body)", fontSize: "0.65rem" }}
          >
            {car.brand} {car.model}
          </span>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Gallery */}
          <div>
            {/* Main image */}
            <div className="relative overflow-hidden mb-3" style={{ aspectRatio: "16/10" }}>
              <img
                src={car.images[activeImage]}
                alt={car.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              {/* Navigation arrows */}
              {car.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage((prev) => (prev - 1 + car.images.length) % car.images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-all duration-200 hover:scale-110"
                    style={{ background: "oklch(0.10 0.005 260 / 0.8)", border: "1px solid oklch(1 0 0 / 15%)" }}
                  >
                    <ChevronLeft size={16} style={{ color: "oklch(0.93 0.008 75)" }} />
                  </button>
                  <button
                    onClick={() => setActiveImage((prev) => (prev + 1) % car.images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-all duration-200 hover:scale-110"
                    style={{ background: "oklch(0.10 0.005 260 / 0.8)", border: "1px solid oklch(1 0 0 / 15%)" }}
                  >
                    <ChevronRight size={16} style={{ color: "oklch(0.93 0.008 75)" }} />
                  </button>
                </>
              )}
              {/* Badge */}
              {car.badge && (
                <div
                  className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold tracking-widest uppercase"
                  style={{
                    background: car.badge === "destaque" ? "oklch(0.72 0.12 75)" : car.badge === "novo" ? "oklch(0.55 0.18 145)" : "oklch(0.60 0.22 27)",
                    color: car.badge === "destaque" ? "oklch(0.10 0.005 260)" : "oklch(0.98 0 0)",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.6rem",
                  }}
                >
                  {car.badge}
                </div>
              )}
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2">
              {car.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className="overflow-hidden transition-all duration-200"
                  style={{
                    width: "80px",
                    aspectRatio: "16/10",
                    border: `2px solid ${activeImage === i ? "oklch(0.72 0.12 75)" : "transparent"}`,
                    opacity: activeImage === i ? 1 : 0.5,
                  }}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            {/* Brand + actions */}
            <div className="flex items-start justify-between mb-2">
              <p
                className="text-xs tracking-widest uppercase"
                style={{ color: "oklch(0.72 0.12 75)", fontFamily: "var(--font-body)", fontSize: "0.65rem" }}
              >
                {car.brand}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => { setLiked(!liked); }}
                  className="w-9 h-9 flex items-center justify-center transition-all duration-200"
                  style={{ border: `1px solid ${liked ? "oklch(0.72 0.12 75 / 0.5)" : "oklch(1 0 0 / 10%)"}` }}
                >
                  <Heart size={14} fill={liked ? "oklch(0.72 0.12 75)" : "none"} stroke={liked ? "oklch(0.72 0.12 75)" : "oklch(0.60 0.010 75)"} />
                </button>
                <button
                  onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success("Link copiado!"); }}
                  className="w-9 h-9 flex items-center justify-center transition-all duration-200"
                  style={{ border: "1px solid oklch(1 0 0 / 10%)", color: "oklch(0.60 0.010 75)" }}
                >
                  <Share2 size={14} />
                </button>
              </div>
            </div>

            <h1
              className="heading-display mb-1"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
            >
              {car.model}
            </h1>
            <p
              className="text-sm mb-6 capitalize"
              style={{ color: "oklch(0.50 0.010 75)", fontFamily: "var(--font-body)" }}
            >
              {car.year} · {car.category} · {car.transmission}
            </p>

            {/* Price */}
            <div
              className="flex items-end gap-4 mb-6 pb-6"
              style={{ borderBottom: "1px solid oklch(1 0 0 / 8%)" }}
            >
              <div>
                {car.originalPrice && (
                  <p className="text-sm line-through" style={{ color: "oklch(0.45 0.008 75)" }}>
                    {formatPrice(car.originalPrice)}
                  </p>
                )}
                <p
                  className="text-4xl font-bold"
                  style={{ fontFamily: "var(--font-display)", color: "oklch(0.72 0.12 75)" }}
                >
                  {formatPrice(car.price)}
                </p>
              </div>
              <div
                className="flex items-center gap-2 px-3 py-1 mb-1"
                style={{ background: "oklch(0.55 0.18 145 / 0.15)", border: "1px solid oklch(0.55 0.18 145 / 0.3)" }}
              >
                <div className="w-2 h-2 rounded-full" style={{ background: "oklch(0.55 0.18 145)" }} />
                <span className="text-xs" style={{ color: "oklch(0.65 0.18 145)", fontFamily: "var(--font-body)", fontSize: "0.65rem" }}>
                  Disponível
                </span>
              </div>
            </div>

            {/* Description */}
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: "oklch(0.60 0.010 75)", fontFamily: "var(--font-body)", fontWeight: 300 }}
            >
              {car.description}
            </p>

            {/* Quick specs */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              {specs.slice(0, 4).map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="text-center p-3"
                  style={{ background: "oklch(0.13 0.006 260)", border: "1px solid oklch(1 0 0 / 8%)" }}
                >
                  <Icon size={14} className="mx-auto mb-1.5" style={{ color: "oklch(0.72 0.12 75)" }} />
                  <p className="text-xs font-semibold" style={{ color: "oklch(0.85 0.008 75)", fontFamily: "var(--font-body)" }}>
                    {value}
                  </p>
                  <p className="text-xs" style={{ color: "oklch(0.45 0.008 75)", fontFamily: "var(--font-body)", fontSize: "0.58rem" }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Location */}
            <div
              className="flex items-center gap-2 mb-6 text-xs"
              style={{ color: "oklch(0.55 0.010 75)", fontFamily: "var(--font-body)" }}
            >
              <MapPin size={12} style={{ color: "oklch(0.72 0.12 75)" }} />
              {car.location}
            </div>

            {/* CTAs */}
            <div className="flex gap-3">
              <a href="tel:+551100000000" className="flex-1">
                <button className="btn-gold rounded-none w-full flex items-center justify-center gap-2 py-4">
                  <Phone size={15} />
                  Ligar Agora
                </button>
              </a>
              <a href="#contato" className="flex-1">
                <button className="btn-gold-outline rounded-none w-full flex items-center justify-center gap-2 py-4">
                  <Mail size={15} />
                  Enviar Mensagem
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Full specs + Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Full specs */}
          <div
            className="p-8"
            style={{ background: "oklch(0.13 0.006 260)", border: "1px solid oklch(1 0 0 / 8%)" }}
          >
            <h3
              className="text-lg font-bold mb-6"
              style={{ fontFamily: "var(--font-display)", color: "oklch(0.93 0.008 75)" }}
            >
              Especificações Técnicas
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {specs.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 py-3"
                  style={{ borderBottom: "1px solid oklch(1 0 0 / 6%)" }}
                >
                  <Icon size={14} style={{ color: "oklch(0.72 0.12 75)" }} />
                  <div>
                    <p className="text-xs" style={{ color: "oklch(0.45 0.008 75)", fontFamily: "var(--font-body)", fontSize: "0.6rem" }}>
                      {label}
                    </p>
                    <p className="text-sm font-medium" style={{ color: "oklch(0.85 0.008 75)", fontFamily: "var(--font-body)" }}>
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div
            className="p-8"
            style={{ background: "oklch(0.13 0.006 260)", border: "1px solid oklch(1 0 0 / 8%)" }}
          >
            <h3
              className="text-lg font-bold mb-6"
              style={{ fontFamily: "var(--font-display)", color: "oklch(0.93 0.008 75)" }}
            >
              Equipamentos & Diferenciais
            </h3>
            <ul className="grid grid-cols-1 gap-3">
              {car.features.map((feat) => (
                <li key={feat} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5"
                    style={{ border: "1px solid oklch(0.72 0.12 75 / 0.4)" }}
                  >
                    <Check size={10} style={{ color: "oklch(0.72 0.12 75)" }} />
                  </div>
                  <span
                    className="text-sm"
                    style={{ color: "oklch(0.65 0.010 75)", fontFamily: "var(--font-body)" }}
                  >
                    {feat}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact form */}
        <div
          id="contato"
          className="mb-16 p-8 md:p-12"
          style={{ background: "oklch(0.12 0.006 260)", border: "1px solid oklch(1 0 0 / 8%)" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <span className="section-label block mb-4">Interesse neste veículo</span>
              <h3
                className="heading-display mb-4"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
              >
                Entre em{" "}
                <span style={{ fontStyle: "italic", color: "oklch(0.72 0.12 75)" }}>Contato</span>
              </h3>
              <p
                className="text-sm leading-relaxed mb-8"
                style={{ color: "oklch(0.55 0.010 75)", fontFamily: "var(--font-body)", fontWeight: 300 }}
              >
                Preencha o formulário e um de nossos especialistas entrará em contato em até 2 horas para esclarecer todas as suas dúvidas sobre o {car.brand} {car.model}.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Phone, text: "(11) 9 0000-0000" },
                  { icon: Mail, text: "contato@autolux.com.br" },
                  { icon: MapPin, text: "Av. Paulista, 1000 — São Paulo, SP" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <Icon size={14} style={{ color: "oklch(0.72 0.12 75)" }} />
                    <span className="text-sm" style={{ color: "oklch(0.60 0.010 75)", fontFamily: "var(--font-body)" }}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {formSent ? (
              <div className="flex flex-col items-center justify-center text-center py-12">
                <div
                  className="w-16 h-16 flex items-center justify-center mb-4"
                  style={{ border: "2px solid oklch(0.72 0.12 75)", background: "oklch(0.72 0.12 75 / 0.1)" }}
                >
                  <Check size={28} style={{ color: "oklch(0.72 0.12 75)" }} />
                </div>
                <h4
                  className="text-xl font-bold mb-2"
                  style={{ fontFamily: "var(--font-display)", color: "oklch(0.93 0.008 75)" }}
                >
                  Mensagem Enviada!
                </h4>
                <p className="text-sm" style={{ color: "oklch(0.55 0.010 75)", fontFamily: "var(--font-body)" }}>
                  Nossa equipe entrará em contato em breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { name: "name", label: "Nome Completo", type: "text", placeholder: "Seu nome" },
                  { name: "email", label: "E-mail", type: "email", placeholder: "seu@email.com" },
                  { name: "phone", label: "Telefone", type: "tel", placeholder: "(11) 9 0000-0000" },
                ].map((field) => (
                  <div key={field.name}>
                    <label
                      className="block text-xs tracking-widest uppercase mb-2"
                      style={{ color: "oklch(0.55 0.010 75)", fontFamily: "var(--font-body)", fontSize: "0.6rem" }}
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                      required
                      className="w-full px-4 py-3 text-sm outline-none transition-all duration-300"
                      style={{
                        background: "oklch(0.15 0.006 260)",
                        border: "1px solid oklch(1 0 0 / 8%)",
                        color: "oklch(0.85 0.008 75)",
                        fontFamily: "var(--font-body)",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.72 0.12 75 / 0.5)")}
                      onBlur={(e) => (e.target.style.borderColor = "oklch(1 0 0 / 8%)")}
                    />
                  </div>
                ))}
                <div>
                  <label
                    className="block text-xs tracking-widest uppercase mb-2"
                    style={{ color: "oklch(0.55 0.010 75)", fontFamily: "var(--font-body)", fontSize: "0.6rem" }}
                  >
                    Mensagem
                  </label>
                  <textarea
                    rows={3}
                    placeholder={`Tenho interesse no ${car.brand} ${car.model}...`}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 text-sm outline-none transition-all duration-300 resize-none"
                    style={{
                      background: "oklch(0.15 0.006 260)",
                      border: "1px solid oklch(1 0 0 / 8%)",
                      color: "oklch(0.85 0.008 75)",
                      fontFamily: "var(--font-body)",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "oklch(0.72 0.12 75 / 0.5)")}
                    onBlur={(e) => (e.target.style.borderColor = "oklch(1 0 0 / 8%)")}
                  />
                </div>
                <button type="submit" className="btn-gold rounded-none w-full py-4 text-sm">
                  Enviar Mensagem
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Related cars */}
        {relatedCars.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12" style={{ background: "oklch(0.72 0.12 75)" }} />
              <span className="section-label">Você também pode gostar</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedCars.map((c, i) => (
                <CarCard key={c.id} car={c} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
