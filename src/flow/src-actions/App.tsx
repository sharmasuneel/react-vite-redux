import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import NewPayment from "./pages/NewPayment.tsx";
import NewRequest from "./pages/NewRequest.tsx";
import SSIRequest from "./pages/SSIRequest.tsx";
import UploadDocument from "./pages/UploadDocument.tsx";
import AddCustomer from "./pages/AddCustomer.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/new-payment" element={<NewPayment />} />
          <Route path="/new-request" element={<NewRequest />} />
          <Route path="/ssi-request" element={<SSIRequest />} />
          <Route path="/upload-document" element={<UploadDocument />} />
          <Route path="/add-customer" element={<AddCustomer />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
