// AutoLux Financing Calculator — Dark Luxury Automotive
// Interactive financing simulation with installment calculations

import { useState, useMemo } from "react";
import { DollarSign, Percent, Calendar, TrendingDown } from "lucide-react";
import { formatPrice } from "@/lib/cars-data";

interface FinancingCalculatorProps {
  carPrice: number;
  carName: string;
}

export default function FinancingCalculator({ carPrice, carName }: FinancingCalculatorProps) {
  const [downPayment, setDownPayment] = useState(carPrice * 0.2); // 20% default
  const [months, setMonths] = useState(60); // 60 months default
  const [interestRate, setInterestRate] = useState(0.85); // 0.85% monthly default

  const downPaymentPercent = (downPayment / carPrice) * 100;

  const calculations = useMemo(() => {
    const principal = carPrice - downPayment;
    const monthlyRate = interestRate / 100;

    // PMT formula: P * [r(1+r)^n] / [(1+r)^n - 1]
    let monthlyPayment = 0;
    if (monthlyRate === 0) {
      monthlyPayment = principal / months;
    } else {
      const numerator = principal * monthlyRate * Math.pow(1 + monthlyRate, months);
      const denominator = Math.pow(1 + monthlyRate, months) - 1;
      monthlyPayment = numerator / denominator;
    }

    const totalPaid = monthlyPayment * months;
    const totalInterest = totalPaid - principal;

    return {
      principal,
      monthlyPayment,
      totalPaid,
      totalInterest,
      downPaymentPercent,
    };
  }, [carPrice, downPayment, months, interestRate]);

  const presetDownPayments = [
    { label: "10%", percent: 0.1 },
    { label: "20%", percent: 0.2 },
    { label: "30%", percent: 0.3 },
    { label: "50%", percent: 0.5 },
  ];

  const presetMonths = [24, 36, 48, 60, 72];

  return (
    <div
      className="p-8"
      style={{ background: "oklch(0.13 0.006 260)", border: "1px solid oklch(1 0 0 / 8%)" }}
    >
      <h3
        className="text-lg font-bold mb-6"
        style={{ fontFamily: "var(--font-display)", color: "oklch(0.93 0.008 75)" }}
      >
        Simulador de Financiamento
      </h3>

      <div className="space-y-6">
        {/* Down Payment Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label
              className="flex items-center gap-2 text-xs tracking-widest uppercase"
              style={{ color: "oklch(0.72 0.12 75)", fontFamily: "var(--font-body)", fontSize: "0.65rem" }}
            >
              <DollarSign size={12} />
              Entrada
            </label>
            <span
              className="text-sm font-semibold"
              style={{ color: "oklch(0.85 0.008 75)", fontFamily: "var(--font-body)" }}
            >
              {formatPrice(downPayment)} ({downPaymentPercent.toFixed(0)}%)
            </span>
          </div>

          {/* Down payment slider */}
          <input
            type="range"
            min={0}
            max={carPrice * 0.9}
            step={10000}
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="w-full mb-3"
            style={{ accentColor: "oklch(0.72 0.12 75)" }}
          />

          {/* Preset buttons */}
          <div className="flex gap-2">
            {presetDownPayments.map((preset) => (
              <button
                key={preset.label}
                onClick={() => setDownPayment(carPrice * preset.percent)}
                className="px-3 py-1.5 text-xs transition-all duration-200"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.65rem",
                  background:
                    Math.abs(downPaymentPercent - preset.percent * 100) < 1
                      ? "oklch(0.72 0.12 75 / 0.2)"
                      : "oklch(0.15 0.006 260)",
                  color:
                    Math.abs(downPaymentPercent - preset.percent * 100) < 1
                      ? "oklch(0.72 0.12 75)"
                      : "oklch(0.55 0.010 75)",
                  border: `1px solid ${Math.abs(downPaymentPercent - preset.percent * 100) < 1 ? "oklch(0.72 0.12 75 / 0.5)" : "oklch(1 0 0 / 8%)"}`,
                }}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Financing Period Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label
              className="flex items-center gap-2 text-xs tracking-widest uppercase"
              style={{ color: "oklch(0.72 0.12 75)", fontFamily: "var(--font-body)", fontSize: "0.65rem" }}
            >
              <Calendar size={12} />
              Prazo
            </label>
            <span
              className="text-sm font-semibold"
              style={{ color: "oklch(0.85 0.008 75)", fontFamily: "var(--font-body)" }}
            >
              {months} meses ({(months / 12).toFixed(1)} anos)
            </span>
          </div>

          {/* Months slider */}
          <input
            type="range"
            min={12}
            max={84}
            step={1}
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full mb-3"
            style={{ accentColor: "oklch(0.72 0.12 75)" }}
          />

          {/* Preset buttons */}
          <div className="flex gap-2">
            {presetMonths.map((month) => (
              <button
                key={month}
                onClick={() => setMonths(month)}
                className="px-3 py-1.5 text-xs transition-all duration-200"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.65rem",
                  background: months === month ? "oklch(0.72 0.12 75 / 0.2)" : "oklch(0.15 0.006 260)",
                  color: months === month ? "oklch(0.72 0.12 75)" : "oklch(0.55 0.010 75)",
                  border: `1px solid ${months === month ? "oklch(0.72 0.12 75 / 0.5)" : "oklch(1 0 0 / 8%)"}`,
                }}
              >
                {month}m
              </button>
            ))}
          </div>
        </div>

        {/* Interest Rate Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label
              className="flex items-center gap-2 text-xs tracking-widest uppercase"
              style={{ color: "oklch(0.72 0.12 75)", fontFamily: "var(--font-body)", fontSize: "0.65rem" }}
            >
              <Percent size={12} />
              Taxa de Juros (mensal)
            </label>
            <span
              className="text-sm font-semibold"
              style={{ color: "oklch(0.85 0.008 75)", fontFamily: "var(--font-body)" }}
            >
              {interestRate.toFixed(2)}%
            </span>
          </div>

          {/* Interest rate slider */}
          <input
            type="range"
            min={0}
            max={2}
            step={0.05}
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full mb-3"
            style={{ accentColor: "oklch(0.72 0.12 75)" }}
          />

          <p
            className="text-xs"
            style={{ color: "oklch(0.45 0.008 75)", fontFamily: "var(--font-body)" }}
          >
            Taxa anual aproximada: {(interestRate * 12).toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Results Section */}
      <div
        className="mt-8 pt-8"
        style={{ borderTop: "1px solid oklch(1 0 0 / 8%)" }}
      >
        <h4
          className="text-sm font-bold mb-4"
          style={{ fontFamily: "var(--font-display)", color: "oklch(0.93 0.008 75)" }}
        >
          Resumo da Simulação
        </h4>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {[
            {
              icon: DollarSign,
              label: "Valor Financiado",
              value: formatPrice(calculations.principal),
            },
            {
              icon: Calendar,
              label: "Parcela Mensal",
              value: formatPrice(calculations.monthlyPayment),
              highlight: true,
            },
            {
              icon: TrendingDown,
              label: "Total de Juros",
              value: formatPrice(calculations.totalInterest),
            },
            {
              icon: DollarSign,
              label: "Total a Pagar",
              value: formatPrice(calculations.totalPaid),
            },
          ].map(({ icon: Icon, label, value, highlight }) => (
            <div
              key={label}
              className="p-4"
              style={{
                background: highlight ? "oklch(0.72 0.12 75 / 0.1)" : "oklch(0.15 0.006 260)",
                border: `1px solid ${highlight ? "oklch(0.72 0.12 75 / 0.3)" : "oklch(1 0 0 / 8%)"}`,
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon size={12} style={{ color: "oklch(0.72 0.12 75)" }} />
                <p
                  className="text-xs"
                  style={{ color: "oklch(0.55 0.010 75)", fontFamily: "var(--font-body)", fontSize: "0.6rem" }}
                >
                  {label}
                </p>
              </div>
              <p
                className={`font-bold ${highlight ? "text-base" : "text-sm"}`}
                style={{
                  color: highlight ? "oklch(0.72 0.12 75)" : "oklch(0.85 0.008 75)",
                  fontFamily: "var(--font-display)",
                }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Breakdown table */}
        <div
          className="p-4"
          style={{ background: "oklch(0.15 0.006 260)", border: "1px solid oklch(1 0 0 / 8%)" }}
        >
          <h5
            className="text-xs font-semibold mb-3 tracking-widest uppercase"
            style={{ color: "oklch(0.72 0.12 75)", fontFamily: "var(--font-body)", fontSize: "0.6rem" }}
          >
            Detalhamento
          </h5>
          <div className="space-y-2 text-xs">
            {[
              { label: "Preço do Veículo", value: formatPrice(carPrice) },
              { label: "Entrada", value: `${formatPrice(downPayment)} (${downPaymentPercent.toFixed(0)}%)` },
              { label: "Valor Financiado", value: formatPrice(calculations.principal) },
              { label: "Parcelas", value: `${months}x de ${formatPrice(calculations.monthlyPayment)}` },
              { label: "Total de Juros", value: formatPrice(calculations.totalInterest) },
              { label: "Valor Total", value: formatPrice(downPayment + calculations.totalPaid) },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between">
                <span style={{ color: "oklch(0.55 0.010 75)", fontFamily: "var(--font-body)" }}>
                  {label}
                </span>
                <span
                  style={{ color: "oklch(0.85 0.008 75)", fontFamily: "var(--font-body)", fontWeight: 500 }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          className="w-full mt-6 py-4 text-sm font-semibold transition-all duration-300"
          style={{
            background: "oklch(0.72 0.12 75)",
            color: "oklch(0.10 0.005 260)",
            fontFamily: "var(--font-body)",
            border: "none",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Solicitar Financiamento
        </button>

        {/* Info */}
        <p
          className="text-xs text-center mt-4"
          style={{ color: "oklch(0.45 0.008 75)", fontFamily: "var(--font-body)" }}
        >
          Esta é uma simulação aproximada. Consulte nossos especialistas para uma proposta personalizada.
        </p>
      </div>
    </div>
  );
}
