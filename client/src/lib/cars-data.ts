// AutoLux — Car Catalog Data
// Design: Dark Luxury Automotive

export interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  originalPrice?: number;
  category: "esportivo" | "sedan" | "suv" | "elétrico" | "conversível";
  fuel: "gasolina" | "diesel" | "elétrico" | "híbrido";
  transmission: "automático" | "manual";
  mileage: number;
  power: number; // cv
  torque: number; // Nm
  acceleration: number; // 0-100 km/h
  topSpeed: number; // km/h
  color: string;
  colorHex: string;
  image: string;
  images: string[];
  description: string;
  features: string[];
  badge?: "destaque" | "novo" | "oferta" | "exclusivo";
  available: boolean;
  location: string;
}

const HERO_CAR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663426215247/4btctDi2cyESRCVAWeEfc9/hero-car-oKYxz3owUcbnc4WiY3vc7L.webp";
const CAR_SUV = "https://d2xsxph8kpxj0f.cloudfront.net/310519663426215247/4btctDi2cyESRCVAWeEfc9/car-suv-kEGhUzMsEpYqhLsjku2kFF.webp";
const CAR_SEDAN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663426215247/4btctDi2cyESRCVAWeEfc9/car-sedan-4HZbU7XshJpazHfnfM2qJp.webp";
const CAR_SPORTS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663426215247/4btctDi2cyESRCVAWeEfc9/car-sports-6CkHvbRXWAwuztb4KLteGJ.webp";
const CAR_ELECTRIC = "https://d2xsxph8kpxj0f.cloudfront.net/310519663426215247/4btctDi2cyESRCVAWeEfc9/car-electric-nbiMmUwkHcbfA7sqjUwnY3.webp";

export const cars: Car[] = [
  {
    id: "1",
    name: "Ferrari 488 GTB",
    brand: "Ferrari",
    model: "488 GTB",
    year: 2023,
    price: 1850000,
    category: "esportivo",
    fuel: "gasolina",
    transmission: "automático",
    mileage: 4200,
    power: 670,
    torque: 760,
    acceleration: 3.0,
    topSpeed: 330,
    color: "Nero Daytona",
    colorHex: "#1a1a1a",
    image: HERO_CAR,
    images: [HERO_CAR, CAR_SPORTS, CAR_SEDAN],
    description: "O Ferrari 488 GTB representa a síntese perfeita entre tecnologia de ponta e prazer de condução. Com motor V8 biturbo de 3.9L, este ícone italiano oferece uma experiência de condução incomparável.",
    features: ["Motor V8 Biturbo 3.9L", "Sistema de escape ativo", "Diferencial eletrônico E-Diff3", "Suspensão magnética SCM-E", "Câmeras de ré 360°", "Sistema de som premium Burmester", "Bancos em couro Frau", "Paddle shifters em carbono"],
    badge: "destaque",
    available: true,
    location: "São Paulo, SP"
  },
  {
    id: "2",
    name: "Range Rover Sport SVR",
    brand: "Land Rover",
    model: "Range Rover Sport SVR",
    year: 2024,
    price: 980000,
    category: "suv",
    fuel: "gasolina",
    transmission: "automático",
    mileage: 1800,
    power: 575,
    torque: 700,
    acceleration: 4.3,
    topSpeed: 283,
    color: "Santorini Black",
    colorHex: "#0d0d0d",
    image: CAR_SUV,
    images: [CAR_SUV, HERO_CAR, CAR_ELECTRIC],
    description: "O Range Rover Sport SVR combina a versatilidade off-road lendária da Land Rover com desempenho de superesportivo. Um SUV que não aceita compromissos.",
    features: ["Motor V8 Supercharged 5.0L", "Terrain Response 2", "Air Suspension adaptativa", "Teto panorâmico", "Head-up display", "Sistema Meridian 1600W", "Bancos aquecidos e ventilados", "Câmera 360° com visão off-road"],
    badge: "novo",
    available: true,
    location: "Rio de Janeiro, RJ"
  },
  {
    id: "3",
    name: "Mercedes-AMG S 63",
    brand: "Mercedes-Benz",
    model: "AMG S 63",
    year: 2023,
    price: 1250000,
    originalPrice: 1380000,
    category: "sedan",
    fuel: "híbrido",
    transmission: "automático",
    mileage: 8500,
    power: 802,
    torque: 1430,
    acceleration: 3.3,
    topSpeed: 290,
    color: "Obsidian Black",
    colorHex: "#1c1c1c",
    image: CAR_SEDAN,
    images: [CAR_SEDAN, CAR_ELECTRIC, CAR_SUV],
    description: "O Mercedes-AMG S 63 E Performance redefine o conceito de sedan de luxo. Com tecnologia híbrida de alta performance, une eficiência e poder de forma magistral.",
    features: ["Motor V8 Biturbo + Motor elétrico", "Tração integral 4MATIC+", "Suspensão a ar Magic Body Control", "MBUX Hyperscreen 56\"", "Perfume Burmester 4D", "Bancos massageadores", "Assistente de estacionamento automático", "Night Vision com detecção de pedestres"],
    badge: "oferta",
    available: true,
    location: "São Paulo, SP"
  },
  {
    id: "4",
    name: "Porsche 911 Turbo S",
    brand: "Porsche",
    model: "911 Turbo S",
    year: 2024,
    price: 1650000,
    category: "esportivo",
    fuel: "gasolina",
    transmission: "automático",
    mileage: 650,
    power: 650,
    torque: 800,
    acceleration: 2.7,
    topSpeed: 330,
    color: "Guards Red",
    colorHex: "#cc0000",
    image: CAR_SPORTS,
    images: [CAR_SPORTS, HERO_CAR, CAR_SEDAN],
    description: "O Porsche 911 Turbo S é a expressão máxima de 60 anos de engenharia de precisão alemã. Com 0-100 km/h em 2,7 segundos, é o esportivo mais refinado do mundo.",
    features: ["Motor Boxer 6 cilindros 3.8L Biturbo", "PDK de 8 velocidades", "Tração integral ativa", "Freios cerâmicos PCCB", "Suspensão PASM Sport", "Volante GT em couro", "Câmeras Night Vision", "Sport Chrono Package"],
    badge: "exclusivo",
    available: true,
    location: "Curitiba, PR"
  },
  {
    id: "5",
    name: "Tesla Model S Plaid",
    brand: "Tesla",
    model: "Model S Plaid",
    year: 2024,
    price: 720000,
    category: "elétrico",
    fuel: "elétrico",
    transmission: "automático",
    mileage: 3200,
    power: 1020,
    torque: 1420,
    acceleration: 2.1,
    topSpeed: 322,
    color: "Pearl White",
    colorHex: "#f0f0f0",
    image: CAR_ELECTRIC,
    images: [CAR_ELECTRIC, CAR_SEDAN, CAR_SUV],
    description: "O Tesla Model S Plaid é o sedan elétrico mais rápido do mundo. Com três motores elétricos e autonomia de 600km, representa o futuro da mobilidade de luxo.",
    features: ["Tri-motor All-Wheel Drive", "Autonomia 600km (WLTP)", "Carregamento Supercharger V3", "Tela central 17\" com rotação", "Autopilot Full Self-Driving", "Yoke steering wheel", "Suspensão adaptativa", "Sistema de som 22 alto-falantes"],
    badge: "novo",
    available: true,
    location: "São Paulo, SP"
  },
  {
    id: "6",
    name: "Lamborghini Urus S",
    brand: "Lamborghini",
    model: "Urus S",
    year: 2023,
    price: 2100000,
    category: "suv",
    fuel: "gasolina",
    transmission: "automático",
    mileage: 5600,
    power: 666,
    torque: 850,
    acceleration: 3.5,
    topSpeed: 305,
    color: "Nero Noctis",
    colorHex: "#0a0a0a",
    image: CAR_SUV,
    images: [CAR_SUV, HERO_CAR, CAR_SPORTS],
    description: "O Lamborghini Urus S é o Super SUV por definição. Com DNA de superesportivo e versatilidade de SUV, oferece uma experiência única que desafia todas as categorias.",
    features: ["Motor V8 Biturbo 4.0L", "Tração integral permanente AWD", "Suspensão a ar adaptativa", "Modo Corsa, Sport, Strada, Terra, Neve", "Cockpit digital 12.3\"", "Sistema de som Bang & Olufsen 1700W", "Bancos em Alcantara e couro", "Freios carbono-cerâmicos"],
    badge: "exclusivo",
    available: true,
    location: "São Paulo, SP"
  },
  {
    id: "7",
    name: "BMW M5 Competition",
    brand: "BMW",
    model: "M5 Competition",
    year: 2024,
    price: 890000,
    category: "sedan",
    fuel: "gasolina",
    transmission: "automático",
    mileage: 2100,
    power: 625,
    torque: 750,
    acceleration: 3.3,
    topSpeed: 305,
    color: "Frozen Dark Silver",
    colorHex: "#6b6b6b",
    image: CAR_SEDAN,
    images: [CAR_SEDAN, CAR_SPORTS, CAR_SUV],
    description: "O BMW M5 Competition é a definição de sedan esportivo. Combinando luxo executivo com performance de pista, é o veículo ideal para quem não aceita compromissos.",
    features: ["Motor V8 Biturbo 4.4L S63", "M xDrive com modo RWD", "M Compound Brakes", "M Sport Differential", "BMW Live Cockpit Professional", "Bancos M Sport em couro Merino", "Sistema Bowers & Wilkins Diamond", "M Drive Analyzer"],
    available: true,
    location: "Belo Horizonte, MG"
  },
  {
    id: "8",
    name: "Aston Martin DB12",
    brand: "Aston Martin",
    model: "DB12",
    year: 2024,
    price: 1950000,
    category: "esportivo",
    fuel: "gasolina",
    transmission: "automático",
    mileage: 890,
    power: 680,
    torque: 800,
    acceleration: 3.6,
    topSpeed: 325,
    color: "Iridescent Emerald",
    colorHex: "#1a3a2a",
    image: HERO_CAR,
    images: [HERO_CAR, CAR_SPORTS, CAR_SEDAN],
    description: "O Aston Martin DB12 é o Super Tourer definitivo. Herdeiro de uma linhagem lendária, combina beleza atemporal com tecnologia de última geração.",
    features: ["Motor V8 Biturbo 4.0L AMG", "ZF 8 velocidades", "Suspensão adaptativa", "Freios carbono-cerâmicos opcionais", "Interior em couro Bridge of Weir", "Sistema de som Bowers & Wilkins", "Modo GT, Sport, Sport+, Track", "Volante em couro e Alcantara"],
    badge: "exclusivo",
    available: true,
    location: "São Paulo, SP"
  }
];

export const categories = [
  { value: "todos", label: "Todos" },
  { value: "esportivo", label: "Esportivo" },
  { value: "sedan", label: "Sedan" },
  { value: "suv", label: "SUV" },
  { value: "elétrico", label: "Elétrico" },
  { value: "conversível", label: "Conversível" },
];

export const fuelTypes = [
  { value: "todos", label: "Todos" },
  { value: "gasolina", label: "Gasolina" },
  { value: "diesel", label: "Diesel" },
  { value: "elétrico", label: "Elétrico" },
  { value: "híbrido", label: "Híbrido" },
];

export const sortOptions = [
  { value: "relevance", label: "Relevância" },
  { value: "price-asc", label: "Menor Preço" },
  { value: "price-desc", label: "Maior Preço" },
  { value: "year-desc", label: "Mais Novo" },
  { value: "power-desc", label: "Maior Potência" },
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatMileage(km: number): string {
  return new Intl.NumberFormat("pt-BR").format(km) + " km";
}
