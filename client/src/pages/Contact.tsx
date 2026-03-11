// AutoLux Contact Page — Dark Luxury Automotive

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Check } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    toast.success("Mensagem enviada com sucesso! Retornaremos em breve.", {
      style: { background: "oklch(0.13 0.006 260)", border: "1px solid oklch(0.72 0.12 75 / 0.3)", color: "oklch(0.93 0.008 75)" },
    });
  }

  return (
    <div className="min-h-screen pt-20" style={{ background: "oklch(0.10 0.005 260)" }}>
      {/* Header */}
      <div className="py-20" style={{ background: "oklch(0.12 0.006 260)", borderBottom: "1px solid oklch(1 0 0 / 6%)" }}>
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12" style={{ background: "oklch(0.72 0.12 75)" }} />
            <span className="section-label">Fale Conosco</span>
          </div>
          <h1 className="heading-display" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
            Entre em{" "}
            <span style={{ fontStyle: "italic", color: "oklch(0.72 0.12 75)" }}>Contato</span>
          </h1>
          <p className="mt-4 text-base max-w-lg" style={{ color: "oklch(0.55 0.010 75)", fontFamily: "var(--font-body)", fontWeight: 300 }}>
            Nossa equipe de especialistas está disponível para ajudá-lo a encontrar o veículo perfeito ou esclarecer qualquer dúvida.
          </p>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact info */}
          <div className="space-y-6">
            {[
              { icon: Phone, title: "Telefone", lines: ["(11) 9 0000-0000", "(11) 3000-0000"] },
              { icon: Mail, title: "E-mail", lines: ["contato@autolux.com.br", "vendas@autolux.com.br"] },
              { icon: MapPin, title: "Endereço", lines: ["Av. Paulista, 1000", "São Paulo, SP — 01310-100"] },
              { icon: Clock, title: "Horário", lines: ["Seg-Sex: 9h às 19h", "Sáb: 9h às 16h"] },
            ].map(({ icon: Icon, title, lines }) => (
              <div
                key={title}
                className="flex gap-4 p-5"
                style={{ background: "oklch(0.13 0.006 260)", border: "1px solid oklch(1 0 0 / 8%)" }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center shrink-0"
                  style={{ border: "1px solid oklch(0.72 0.12 75 / 0.3)" }}
                >
                  <Icon size={16} style={{ color: "oklch(0.72 0.12 75)" }} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-1" style={{ fontFamily: "var(--font-body)", color: "oklch(0.85 0.008 75)" }}>
                    {title}
                  </h4>
                  {lines.map((line) => (
                    <p key={line} className="text-xs" style={{ color: "oklch(0.55 0.010 75)", fontFamily: "var(--font-body)" }}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div
            className="lg:col-span-2 p-8"
            style={{ background: "oklch(0.13 0.006 260)", border: "1px solid oklch(1 0 0 / 8%)" }}
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center text-center py-16">
                <div
                  className="w-20 h-20 flex items-center justify-center mb-6"
                  style={{ border: "2px solid oklch(0.72 0.12 75)", background: "oklch(0.72 0.12 75 / 0.1)" }}
                >
                  <Check size={36} style={{ color: "oklch(0.72 0.12 75)" }} />
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "var(--font-display)", color: "oklch(0.93 0.008 75)" }}>
                  Mensagem Enviada!
                </h3>
                <p className="text-sm" style={{ color: "oklch(0.55 0.010 75)", fontFamily: "var(--font-body)" }}>
                  Entraremos em contato em até 2 horas úteis.
                </p>
                <button onClick={() => setSent(false)} className="btn-gold-outline rounded-none text-xs mt-8">
                  Enviar Nova Mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold mb-6" style={{ fontFamily: "var(--font-display)", color: "oklch(0.93 0.008 75)" }}>
                  Envie sua Mensagem
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { name: "name", label: "Nome Completo", type: "text", placeholder: "Seu nome" },
                    { name: "email", label: "E-mail", type: "email", placeholder: "seu@email.com" },
                    { name: "phone", label: "Telefone", type: "tel", placeholder: "(11) 9 0000-0000" },
                    { name: "subject", label: "Assunto", type: "text", placeholder: "Interesse em veículo..." },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "oklch(0.55 0.010 75)", fontFamily: "var(--font-body)", fontSize: "0.6rem" }}>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        required
                        className="w-full px-4 py-3 text-sm outline-none transition-all duration-300"
                        style={{ background: "oklch(0.15 0.006 260)", border: "1px solid oklch(1 0 0 / 8%)", color: "oklch(0.85 0.008 75)", fontFamily: "var(--font-body)" }}
                        onFocus={(e) => (e.target.style.borderColor = "oklch(0.72 0.12 75 / 0.5)")}
                        onBlur={(e) => (e.target.style.borderColor = "oklch(1 0 0 / 8%)")}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "oklch(0.55 0.010 75)", fontFamily: "var(--font-body)", fontSize: "0.6rem" }}>
                    Mensagem
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Descreva como podemos ajudá-lo..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 text-sm outline-none transition-all duration-300 resize-none"
                    style={{ background: "oklch(0.15 0.006 260)", border: "1px solid oklch(1 0 0 / 8%)", color: "oklch(0.85 0.008 75)", fontFamily: "var(--font-body)" }}
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
      </div>
    </div>
  );
}
