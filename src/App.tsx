import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HomePage from "./pages/HomePage";
import CalculatorPage from "./pages/CalculatorPage";
import CasesPage from "./pages/CasesPage";
import EquipmentPage from "./pages/EquipmentPage";
import KitchenDesignPage from "./pages/KitchenDesignPage";
import IoTPage from "./pages/IoTPage";
import ConsultingPage from "./pages/ConsultingPage";
import AboutPage from "./pages/AboutPage";
import ContactsPage from "./pages/ContactsPage";
import NotFound from "./pages/NotFound";
import PrivacyPolicyPage from "./pages/legal/PrivacyPolicyPage";
import PersonalDataConsentPage from "./pages/legal/PersonalDataConsentPage";
import PublicOfferPage from "./pages/legal/PublicOfferPage";
import TermsOfUsePage from "./pages/legal/TermsOfUsePage";
import MarketingConsentPage from "./pages/legal/MarketingConsentPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/cases" element={<CasesPage />} />
            <Route path="/solutions/equipment" element={<EquipmentPage />} />
            <Route path="/solutions/design" element={<KitchenDesignPage />} />
            <Route path="/solutions/iot" element={<IoTPage />} />
            <Route path="/solutions/consulting" element={<ConsultingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/legal/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/legal/personal-data-consent" element={<PersonalDataConsentPage />} />
            <Route path="/legal/offer" element={<PublicOfferPage />} />
            <Route path="/legal/terms" element={<TermsOfUsePage />} />
            <Route path="/legal/marketing-consent" element={<MarketingConsentPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
