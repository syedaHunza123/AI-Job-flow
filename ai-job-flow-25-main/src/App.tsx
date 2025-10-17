import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AppSidebar } from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import GenerateDocuments from "./pages/GenerateDocuments";
import ApplyJob from "./pages/ApplyJob";
import UpdateProfile from "./pages/UpdateProfile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <>
      <Navbar />
      {!isLandingPage ? (
        <SidebarProvider>
          <div className="flex min-h-screen w-full pt-16">
            <AppSidebar />
            <main className="flex-1">
              <SidebarTrigger className="m-4" />
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/generate" element={<GenerateDocuments />} />
                <Route path="/apply" element={<ApplyJob />} />
                <Route path="/profile" element={<UpdateProfile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </SidebarProvider>
      ) : (
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
