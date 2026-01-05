import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HearingsPage from "./pages/HearingsPage";
import InterviewsPage from "./pages/InterviewsPage";
import ApprovalsPage from "./pages/ApprovalsPage";
import CasesPage from "./pages/CasesPage";
import ReportsPage from "./pages/ReportsPage";
import InfographicsPage from "./pages/InfographicsPage";
import ManagementPage from "./pages/ManagementPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/hearings" element={<HearingsPage />} />
          <Route path="/interviews" element={<InterviewsPage />} />
          <Route path="/approvals" element={<ApprovalsPage />} />
          <Route path="/cases" element={<CasesPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/infographics" element={<InfographicsPage />} />
          <Route path="/management" element={<ManagementPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
