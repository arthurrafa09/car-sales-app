// AutoLux CarCard — Dark Luxury Automotive
// Premium card with shimmer hover, gold accents, and smooth animations

import { useState } from "react";
import { Link } from "wouter";
import { Zap, Gauge, Fuel, Heart } from "lucide-react";
import { type Car, formatPrice } from "@/lib/cars-data";

interface CarCardProps {
  car: Car;
  index?: number;
}

const badgeConfig = {
  destaque: { label: "Destaque", bg: "oklch(0.72 0.12 75)", color: "oklch(0.10 0.005 260)" },
  novo: { label: "Novo", bg: "oklch(0.55 0.18 145)", color: "oklch(0.98 0 0)" },
  oferta: { label: "Oferta", bg: "oklch(0.60 0.22 27)", color: "oklch(0.98 0 0)" },
  exclusivo: { label: "Exclusivo", bg: "oklch(0.45 0.15 290)", color: "oklch(0.98 0 0)" },
};

export default function CarCard({ car, index = 0 }: CarCardProps) {
  const [liked, setLiked] = useState(false);
  const badge = car.badge ? badgeConfig[car.badge] : null;

  return (
    <div
      className="card-luxury shimmer-hover group rounded-none overflow-hidden"
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, oklch(0.10 0.005 260 / 0.8) 0%, transparent 50%)",
          }}
        />

        {/* Badge */}
        {badge && (
          <div
            className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold tracking-widest uppercase"
            style={{
              background: badge.bg,
              color: badge.color,
              fontFamily: "var(--font-body)",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
            }}
          >
            {badge.label}
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center transition-all duration-300"
          style={{
            background: "oklch(0.10 0.005 260 / 0.7)",
            backdropFilter: "blur(8px)",
            border: `1px solid ${liked ? "oklch(0.72 0.12 75 / 0.6)" : "oklch(1 0 0 / 10%)"}`,
          }}
        >
          <Heart
            size={14}
            fill={liked ? "oklch(0.72 0.12 75)" : "none"}
            stroke={liked ? "oklch(0.72 0.12 75)" : "oklch(0.93 0.008 75)"}
          />
        </button>

        {/* Year tag */}
        <div
          className="absolute bottom-4 right-4 px-2 py-1 text-xs"
          style={{
            background: "oklch(0.10 0.005 260 / 0.8)",
            color: "oklch(0.72 0.12 75)",
            fontFamily: "var(--font-body)",
            fontSize: "0.65rem",
            letterSpacing: "0.1em",
            border: "1px solid oklch(0.72 0.12 75 / 0.3)",
          }}
        >
          {car.year}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Brand */}
        <p
          className="text-xs tracking-widest uppercase mb-1"
          style={{ color: "oklch(0.72 0.12 75)", fontFamily: "var(--font-body)", fontSize: "0.6rem" }}
        >
          {car.brand}
        </p>

        {/* Name */}
        <h3
          className="text-lg font-bold mb-1 leading-tight"
          style={{ fontFamily: "var(--font-display)", color: "oklch(0.93 0.008 75)" }}
        >
          {car.model}
        </h3>

        {/* Category */}
        <p
          className="text-xs mb-4 capitalize"
          style={{ color: "oklch(0.50 0.010 75)", fontFamily: "var(--font-body)" }}
        >
          {car.category} · {car.transmission} · {car.fuel}
        </p>

        {/* Specs row */}
        <div
          className="grid grid-cols-3 gap-3 mb-5 py-4"
          style={{ borderTop: "1px solid oklch(1 0 0 / 6%)", borderBottom: "1px solid oklch(1 0 0 / 6%)" }}
        >
          {[
            { icon: Zap, value: `${car.power} cv`, label: "Potência" },
            { icon: Gauge, value: `${car.acceleration}s`, label: "0-100" },
            { icon: Fuel, value: car.fuel === "elétrico" ? "Elétrico" : car.fuel.charAt(0).toUpperCase() + car.fuel.slice(1), label: "Combustível" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
              <Icon size={13} className="mx-auto mb-1" style={{ color: "oklch(0.72 0.12 75)" }} />
              <p className="text-xs font-semibold" style={{ color: "oklch(0.85 0.008 75)", fontFamily: "var(--font-body)" }}>
                {value}
              </p>
              <p className="text-xs" style={{ color: "oklch(0.45 0.008 75)", fontFamily: "var(--font-body)", fontSize: "0.6rem" }}>
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-end justify-between">
          <div>
            {car.originalPrice && (
              <p
                className="text-xs line-through mb-0.5"
                style={{ color: "oklch(0.45 0.008 75)", fontFamily: "var(--font-body)" }}
              >
                {formatPrice(car.originalPrice)}
              </p>
            )}
            <p
              className="text-xl font-bold"
              style={{ fontFamily: "var(--font-display)", color: "oklch(0.72 0.12 75)" }}
            >
              {formatPrice(car.price)}
            </p>
          </div>

          <Link href={`/carro/${car.id}`}>
            <button className="btn-gold rounded-none text-xs px-4 py-2.5">
              Ver Detalhes
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
