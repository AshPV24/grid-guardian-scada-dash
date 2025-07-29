import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GridControl from "./pages/GridControl";
import AttackPower from "./pages/AttackPower";
import AirportControl from "./pages/AirportControl";
import TrainControl from "./pages/TrainControl";
import OilRigControl from "./pages/OilRigControl";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/grid-control" element={<GridControl />} />
          <Route path="/attack-power" element={<AttackPower />} />
          <Route path="/airport-control" element={<AirportControl />} />
          <Route path="/train-control" element={<TrainControl />} />
          <Route path="/oil-rig-control" element={<OilRigControl />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
