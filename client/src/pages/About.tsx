// AutoLux About Page — Dark Luxury Automotive

import { Shield, Award, Users, TrendingUp } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663426215247/4btctDi2cyESRCVAWeEfc9/hero-car-oKYxz3owUcbnc4WiY3vc7L.webp";
const CAR_SEDAN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663426215247/4btctDi2cyESRCVAWeEfc9/car-sedan-4HZbU7XshJpazHfnfM2qJp.webp";

const team = [
  { name: "Eduardo Martins", role: "CEO & Fundador", initials: "EM" },
  { name: "Carla Vieira", role: "Diretora Comercial", initials: "CV" },
  { name: "Rafael Souza", role: "Especialista Ferrari & Lamborghini", initials: "RS" },
  { name: "Ana Paula Lima", role: "Consultora de Vendas", initials: "AL" },
];

const milestones = [
  { year: "2004", event: "Fundação da AutoLux em São Paulo" },
  { year: "2008", event: "Expansão para Rio de Janeiro e Curitiba" },
  { year: "2012", event: "Parceria oficial com Ferrari e Lamborghini" },
  { year: "2016", event: "Lançamento do serviço de importação exclusiva" },
  { year: "2020", event: "Expansão para veículos elétricos de luxo" },
  { year: "2024", event: "500+ veículos vendidos e 98% de satisfação" },
];

export default function About() {
  return (
    <div className="min-h-screen pt-20" style={{ background: "oklch(0.10 0.005 260)" }}>
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="About" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, oklch(0.10 0.005 260) 40%, transparent)" }} />
        </div>
        <div className="relative container">
          <div className="max-w-xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12" style={{ background: "oklch(0.72 0.12 75)" }} />
              <span className="section-label">Nossa História</span>
            </div>
            <h1 className="heading-display mb-6" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
              Paixão por{" "}
              <span style={{ fontStyle: "italic", color: "oklch(0.72 0.12 75)" }}>Excelência</span>
            </h1>
            <p className="text-base leading-relaxed" style={{ color: "oklch(0.60 0.010 75)", fontFamily: "var(--font-body)", fontWeight: 300 }}>
              Há 20 anos, a AutoLux nasceu da paixão por automóveis extraordinários e do compromisso de oferecer uma experiência de compra à altura dos veículos que comercializamos.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: "oklch(0.12 0.006 260)", borderTop: "1px solid oklch(1 0 0 / 6%)" }}>
        <div className="container py-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "Confiança", desc: "Transparência em cada negociação, sem surpresas" },
              { icon: Award, title: "Excelência", desc: "Padrão premium em cada detalhe do atendimento" },
              { icon: Users, title: "Relacionamento", desc: "Clientes para toda a vida, não apenas uma venda" },
              { icon: TrendingUp, title: "Inovação", desc: "Sempre à frente com as últimas tecnologias" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div
                  className="w-14 h-14 flex items-center justify-center mx-auto mb-4"
                  style={{ border: "1px solid oklch(0.72 0.12 75 / 0.3)" }}
                >
                  <Icon size={22} style={{ color: "oklch(0.72 0.12 75)" }} />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ fontFamily: "var(--font-display)", color: "oklch(0.93 0.008 75)" }}>
                  {title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "oklch(0.55 0.010 75)", fontFamily: "var(--font-body)" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="container py-20">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px w-12" style={{ background: "oklch(0.72 0.12 75)" }} />
          <span className="section-label">Nossa Trajetória</span>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: "oklch(0.72 0.12 75 / 0.2)", left: "3.5rem" }} />
          <div className="space-y-8">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex items-start gap-8">
                <div
                  className="w-28 shrink-0 text-right pr-4 pt-1"
                  style={{ fontFamily: "var(--font-display)", color: "oklch(0.72 0.12 75)", fontWeight: 700 }}
                >
                  {m.year}
                </div>
                <div
                  className="w-3 h-3 rounded-full shrink-0 mt-1.5 relative z-10"
                  style={{ background: "oklch(0.72 0.12 75)", boxShadow: "0 0 12px oklch(0.72 0.12 75 / 0.5)" }}
                />
                <p className="text-sm pt-0.5" style={{ color: "oklch(0.65 0.010 75)", fontFamily: "var(--font-body)" }}>
                  {m.event}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ background: "oklch(0.12 0.006 260)", borderTop: "1px solid oklch(1 0 0 / 6%)" }}>
        <div className="container py-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px w-12" style={{ background: "oklch(0.72 0.12 75)" }} />
            <span className="section-label">Nossa Equipe</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="p-6 text-center card-luxury"
              >
                <div
                  className="w-16 h-16 flex items-center justify-center mx-auto mb-4 text-xl font-bold"
                  style={{
                    background: "oklch(0.72 0.12 75 / 0.1)",
                    border: "1px solid oklch(0.72 0.12 75 / 0.3)",
                    color: "oklch(0.72 0.12 75)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {member.initials}
                </div>
                <h4 className="text-sm font-bold mb-1" style={{ fontFamily: "var(--font-display)", color: "oklch(0.93 0.008 75)" }}>
                  {member.name}
                </h4>
                <p className="text-xs" style={{ color: "oklch(0.55 0.010 75)", fontFamily: "var(--font-body)" }}>
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
