// AutoLux Catalog Page — Dark Luxury Automotive
// Advanced filtering, sorting, and car grid

import { useState, useEffect, useMemo } from "react";
import { useSearch } from "wouter";
import { Search, SlidersHorizontal, X, ChevronDown, Grid3X3, LayoutList } from "lucide-react";
import { cars, categories, fuelTypes, sortOptions, formatPrice, type Car } from "@/lib/cars-data";
import CarCard from "@/components/CarCard";

export default function Catalog() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const initialCategory = params.get("categoria") || "todos";

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedFuel, setSelectedFuel] = useState("todos");
  const [sortBy, setSortBy] = useState("relevance");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000000]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const cat = params.get("categoria");
    if (cat) setSelectedCategory(cat);
  }, [search]);

  const filtered = useMemo(() => {
    let result = [...cars];

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.brand.toLowerCase().includes(q) ||
          c.model.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== "todos") {
      result = result.filter((c) => c.category === selectedCategory);
    }

    if (selectedFuel !== "todos") {
      result = result.filter((c) => c.fuel === selectedFuel);
    }

    result = result.filter(
      (c) => c.price >= priceRange[0] && c.price <= priceRange[1]
    );

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "year-desc":
        result.sort((a, b) => b.year - a.year);
        break;
      case "power-desc":
        result.sort((a, b) => b.power - a.power);
        break;
    }

    return result;
  }, [query, selectedCategory, selectedFuel, sortBy, priceRange]);

  const activeFiltersCount = [
    selectedCategory !== "todos",
    selectedFuel !== "todos",
    priceRange[0] > 0 || priceRange[1] < 3000000,
  ].filter(Boolean).length;

  function clearFilters() {
    setSelectedCategory("todos");
    setSelectedFuel("todos");
    setPriceRange([0, 3000000]);
    setQuery("");
  }

  return (
    <div className="min-h-screen pt-20" style={{ background: "oklch(0.10 0.005 260)" }}>
      {/* Header */}
      <div
        className="py-16"
        style={{
          background: "oklch(0.12 0.006 260)",
          borderBottom: "1px solid oklch(1 0 0 / 6%)",
        }}
      >
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12" style={{ background: "oklch(0.72 0.12 75)" }} />
            <span className="section-label">Nosso Estoque</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1
                className="heading-display"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                Catálogo{" "}
                <span style={{ fontStyle: "italic", color: "oklch(0.72 0.12 75)" }}>Premium</span>
              </h1>
              <p
                className="mt-2 text-sm"
                style={{ color: "oklch(0.55 0.010 75)", fontFamily: "var(--font-body)" }}
              >
                {filtered.length} veículo{filtered.length !== 1 ? "s" : ""} disponível{filtered.length !== 1 ? "eis" : ""}
              </p>
            </div>

            {/* Search */}
            <div className="relative max-w-sm w-full">
              <Search
                size={15}
                className="absolute left-4 top-1/2 -translate-y-1/2"
                style={{ color: "oklch(0.55 0.010 75)" }}
              />
              <input
                type="text"
                placeholder="Buscar marca, modelo..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 text-sm outline-none transition-all duration-300"
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
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className="px-4 py-1.5 text-xs tracking-widest uppercase transition-all duration-300"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.12em",
                  background:
                    selectedCategory === cat.value
                      ? "oklch(0.72 0.12 75)"
                      : "oklch(0.15 0.006 260)",
                  color:
                    selectedCategory === cat.value
                      ? "oklch(0.10 0.005 260)"
                      : "oklch(0.60 0.010 75)",
                  border: `1px solid ${selectedCategory === cat.value ? "oklch(0.72 0.12 75)" : "oklch(1 0 0 / 8%)"}`,
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-3">
            {/* Advanced filters toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-1.5 text-xs tracking-wider uppercase transition-all duration-300"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.65rem",
                background: showFilters ? "oklch(0.72 0.12 75 / 0.1)" : "oklch(0.15 0.006 260)",
                color: showFilters ? "oklch(0.72 0.12 75)" : "oklch(0.60 0.010 75)",
                border: `1px solid ${showFilters ? "oklch(0.72 0.12 75 / 0.5)" : "oklch(1 0 0 / 8%)"}`,
              }}
            >
              <SlidersHorizontal size={12} />
              Filtros
              {activeFiltersCount > 0 && (
                <span
                  className="w-4 h-4 flex items-center justify-center text-xs"
                  style={{ background: "oklch(0.72 0.12 75)", color: "oklch(0.10 0.005 260)", fontSize: "0.55rem" }}
                >
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-8 py-1.5 text-xs tracking-wider outline-none transition-all duration-300"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.65rem",
                  background: "oklch(0.15 0.006 260)",
                  color: "oklch(0.60 0.010 75)",
                  border: "1px solid oklch(1 0 0 / 8%)",
                }}
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={11}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "oklch(0.55 0.010 75)" }}
              />
            </div>

            {/* View mode */}
            <div className="flex" style={{ border: "1px solid oklch(1 0 0 / 8%)" }}>
              {(["grid", "list"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className="p-2 transition-colors duration-200"
                  style={{
                    background: viewMode === mode ? "oklch(0.72 0.12 75 / 0.15)" : "transparent",
                    color: viewMode === mode ? "oklch(0.72 0.12 75)" : "oklch(0.50 0.010 75)",
                  }}
                >
                  {mode === "grid" ? <Grid3X3 size={14} /> : <LayoutList size={14} />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Advanced filters panel */}
        {showFilters && (
          <div
            className="mb-8 p-6 grid grid-cols-1 md:grid-cols-3 gap-6"
            style={{
              background: "oklch(0.13 0.006 260)",
              border: "1px solid oklch(1 0 0 / 8%)",
            }}
          >
            {/* Fuel */}
            <div>
              <label
                className="block text-xs tracking-widest uppercase mb-3"
                style={{ color: "oklch(0.72 0.12 75)", fontFamily: "var(--font-body)", fontSize: "0.6rem" }}
              >
                Combustível
              </label>
              <div className="flex flex-wrap gap-2">
                {fuelTypes.map((fuel) => (
                  <button
                    key={fuel.value}
                    onClick={() => setSelectedFuel(fuel.value)}
                    className="px-3 py-1 text-xs transition-all duration-200"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.65rem",
                      background: selectedFuel === fuel.value ? "oklch(0.72 0.12 75 / 0.2)" : "transparent",
                      color: selectedFuel === fuel.value ? "oklch(0.72 0.12 75)" : "oklch(0.55 0.010 75)",
                      border: `1px solid ${selectedFuel === fuel.value ? "oklch(0.72 0.12 75 / 0.5)" : "oklch(1 0 0 / 8%)"}`,
                    }}
                  >
                    {fuel.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price range */}
            <div className="md:col-span-2">
              <label
                className="block text-xs tracking-widest uppercase mb-3"
                style={{ color: "oklch(0.72 0.12 75)", fontFamily: "var(--font-body)", fontSize: "0.6rem" }}
              >
                Faixa de Preço: {formatPrice(priceRange[0])} — {formatPrice(priceRange[1])}
              </label>
              <div className="flex gap-4 items-center">
                <input
                  type="range"
                  min={0}
                  max={3000000}
                  step={50000}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full accent-amber-500"
                  style={{ accentColor: "oklch(0.72 0.12 75)" }}
                />
              </div>
            </div>

            {/* Clear */}
            {activeFiltersCount > 0 && (
              <div className="md:col-span-3 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-xs tracking-wider uppercase transition-colors"
                  style={{ color: "oklch(0.60 0.010 75)", fontFamily: "var(--font-body)", fontSize: "0.65rem" }}
                >
                  <X size={12} /> Limpar Filtros
                </button>
              </div>
            )}
          </div>
        )}

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p
              className="text-4xl mb-4"
              style={{ fontFamily: "var(--font-display)", color: "oklch(0.30 0.008 75)" }}
            >
              Nenhum veículo encontrado
            </p>
            <p
              className="text-sm mb-6"
              style={{ color: "oklch(0.45 0.008 75)", fontFamily: "var(--font-body)" }}
            >
              Tente ajustar os filtros ou a busca
            </p>
            <button onClick={clearFilters} className="btn-gold rounded-none text-xs">
              Limpar Filtros
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                : "flex flex-col gap-4"
            }
          >
            {filtered.map((car, i) =>
              viewMode === "grid" ? (
                <CarCard key={car.id} car={car} index={i} />
              ) : (
                <CarListItem key={car.id} car={car} />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function CarListItem({ car }: { car: Car }) {
  return (
    <div
      className="card-luxury shimmer-hover flex gap-0 overflow-hidden"
      style={{ display: "flex" }}
    >
      <div className="w-64 shrink-0 overflow-hidden">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <p
            className="text-xs tracking-widest uppercase mb-1"
            style={{ color: "oklch(0.72 0.12 75)", fontFamily: "var(--font-body)", fontSize: "0.6rem" }}
          >
            {car.brand} · {car.year}
          </p>
          <h3
            className="text-xl font-bold mb-2"
            style={{ fontFamily: "var(--font-display)", color: "oklch(0.93 0.008 75)" }}
          >
            {car.model}
          </h3>
          <p
            className="text-sm leading-relaxed line-clamp-2"
            style={{ color: "oklch(0.55 0.010 75)", fontFamily: "var(--font-body)" }}
          >
            {car.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-6">
            {[
              { label: "Potência", value: `${car.power} cv` },
              { label: "0-100", value: `${car.acceleration}s` },
              { label: "KM", value: `${car.mileage.toLocaleString("pt-BR")}` },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs font-semibold" style={{ color: "oklch(0.80 0.008 75)", fontFamily: "var(--font-body)" }}>
                  {value}
                </p>
                <p className="text-xs" style={{ color: "oklch(0.45 0.008 75)", fontFamily: "var(--font-body)", fontSize: "0.6rem" }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <p
              className="text-xl font-bold"
              style={{ fontFamily: "var(--font-display)", color: "oklch(0.72 0.12 75)" }}
            >
              {formatPrice(car.price)}
            </p>
            <a href={`/carro/${car.id}`}>
              <button className="btn-gold rounded-none text-xs px-5 py-2.5">
                Ver Detalhes
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
