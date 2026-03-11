// AutoLux App — Dark Luxury Automotive
// Routes: Home, Catalog, Car Detail, About, Contact

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import CarDetail from "./pages/CarDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <Layout><Home /></Layout>} />
      <Route path="/catalogo" component={() => <Layout><Catalog /></Layout>} />
      <Route path="/carro/:id" component={() => <Layout><CarDetail /></Layout>} />
      <Route path="/sobre" component={() => <Layout><About /></Layout>} />
      <Route path="/contato" component={() => <Layout><Contact /></Layout>} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
