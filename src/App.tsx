import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Pages
// Pages
import LandingPage from "./pages/LandingPage";
import LoginSelector from "./pages/auth/LoginSelector";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HouseholdLogin from "./pages/auth/HouseholdLogin";
import CollectorLogin from "./pages/auth/CollectorLogin";
import OfficerLogin from "./pages/auth/OfficerLogin";
import HouseholdDashboard from "./pages/household/HouseholdDashboard";
import WasteHistoryPage from "./pages/household/WasteHistoryPage";
import StatisticsPage from "./pages/household/StatisticsPage";
import RewardsPage from "./pages/household/RewardsPage";
import NotificationsPage from "./pages/household/NotificationsPage";
import CollectorDashboard from "./pages/collector/CollectorDashboard";
import MyRoutePage from "./pages/collector/MyRoutePage";
import PickupsPage from "./pages/collector/PickupsPage";
import ReportIssuePage from "./pages/collector/ReportIssuePage";
import AttendancePage from "./pages/collector/AttendancePage";
import QRScanPage from "./pages/collector/QRScanPage";
import OfficerDashboard from "./pages/officer/OfficerDashboard";
import MyQRPage from "./pages/household/MyQRPage";
import BinMapPage from "./pages/officer/BinMapPage";
import HouseholdsPage from "./pages/officer/HouseholdsPage";
import CollectorsPage from "./pages/officer/CollectorsPage";
import ViolationsPage from "./pages/officer/ViolationsPage";
import ReportsPage from "./pages/officer/ReportsPage";
import IncentivesPage from "./pages/officer/IncentivesPage";
import ThirdPartyLogin from "./pages/auth/ThirdPartyLogin";
import ThirdPartyDashboard from "./pages/third_party/ThirdPartyDashboard";
import ThirdPartyMap from "./pages/third_party/ThirdPartyMap";
import ThirdPartyReports from "./pages/third_party/ThirdPartyReports";

import RegisterSelector from "./pages/auth/RegisterSelector";
import HouseholdRegister from "./pages/auth/register/HouseholdRegister";
import CollectorRegister from "./pages/auth/register/CollectorRegister";
import OfficerRegister from "./pages/auth/register/OfficerRegister";
import ThirdPartyRegister from "./pages/auth/register/ThirdPartyRegister";

import StateAdminDashboard from "./pages/admin/StateAdminDashboard";
import MunicipalAdminDashboard from "./pages/admin/MunicipalAdminDashboard";
import SanitationDashboard from "./pages/dept/SanitationDashboard";
import LogisticsDashboard from "./pages/dept/LogisticsDashboard";
import RecyclingDashboard from "./pages/dept/RecyclingDashboard";
import OfficialLogin from "./pages/auth/OfficialLogin";
import PlaceholderPage from "@/components/common/PlaceholderPage";
import StateMapPage from "@/pages/admin/StateMapPage";
import CityMapPage from "@/pages/admin/CityMapPage";

const queryClient = new QueryClient();

// Protected Route Component
function ProtectedRoute({
  children,
  allowedRole
}: {
  children: React.ReactNode;
  allowedRole: string;
}) {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (role !== allowedRole) {
    return <Navigate to={`/${role}`} replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<LoginSelector />} />
      <Route path="/login/household" element={<HouseholdLogin />} />
      <Route path="/login/collector" element={<CollectorLogin />} />
      <Route path="/login/officer" element={<OfficerLogin />} />

      {/* Household Routes */}
      <Route
        path="/household"
        element={
          <ProtectedRoute allowedRole="household">
            <HouseholdDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/household/history"
        element={
          <ProtectedRoute allowedRole="household">
            <WasteHistoryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/household/stats"
        element={
          <ProtectedRoute allowedRole="household">
            <StatisticsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/household/rewards"
        element={
          <ProtectedRoute allowedRole="household">
            <RewardsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/household/qr"
        element={
          <ProtectedRoute allowedRole="household">
            <MyQRPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/household/notifications"
        element={
          <ProtectedRoute allowedRole="household">
            <NotificationsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/household/*"
        element={
          <ProtectedRoute allowedRole="household">
            <HouseholdDashboard />
          </ProtectedRoute>
        }
      />

      {/* Collector Routes */}
      <Route
        path="/collector"
        element={
          <ProtectedRoute allowedRole="collector">
            <CollectorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/collector/route"
        element={
          <ProtectedRoute allowedRole="collector">
            <MyRoutePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/collector/pickups"
        element={
          <ProtectedRoute allowedRole="collector">
            <PickupsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/collector/report"
        element={
          <ProtectedRoute allowedRole="collector">
            <ReportIssuePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/collector/attendance"
        element={
          <ProtectedRoute allowedRole="collector">
            <AttendancePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/collector/scan"
        element={
          <ProtectedRoute allowedRole="collector">
            <QRScanPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/collector/*"
        element={
          <ProtectedRoute allowedRole="collector">
            <CollectorDashboard />
          </ProtectedRoute>
        }
      />

      {/* Officer Routes */}
      <Route
        path="/officer"
        element={
          <ProtectedRoute allowedRole="officer">
            <OfficerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/officer/map"
        element={
          <ProtectedRoute allowedRole="officer">
            <BinMapPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/officer/households"
        element={
          <ProtectedRoute allowedRole="officer">
            <HouseholdsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/officer/collectors"
        element={
          <ProtectedRoute allowedRole="officer">
            <CollectorsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/officer/violations"
        element={
          <ProtectedRoute allowedRole="officer">
            <ViolationsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/officer/reports"
        element={
          <ProtectedRoute allowedRole="officer">
            <ReportsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/officer/incentives"
        element={
          <ProtectedRoute allowedRole="officer">
            <IncentivesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/officer/*"
        element={
          <ProtectedRoute allowedRole="officer">
            <OfficerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Third Party Routes */}
      <Route
        path="/login/third-party"
        element={<ThirdPartyLogin />}
      />
      <Route
        path="/third-party"
        element={
          <ProtectedRoute allowedRole="third_party">
            <ThirdPartyDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/third-party/map"
        element={
          <ProtectedRoute allowedRole="third_party">
            <ThirdPartyMap />
          </ProtectedRoute>
        }
      />
      <Route
        path="/third-party/reports"
        element={
          <ProtectedRoute allowedRole="third_party">
            <ThirdPartyReports />
          </ProtectedRoute>
        }
      />
      {/* Catch-all for third party */}
      <Route
        path="/third-party/*"
        element={
          <ProtectedRoute allowedRole="third_party">
            <ThirdPartyDashboard />
          </ProtectedRoute>
        }
      />

      {/* Official Logins */}
      <Route path="/login/state-admin" element={<OfficialLogin roleType="state_admin" />} />
      <Route path="/login/municipal-admin" element={<OfficialLogin roleType="municipal_admin" />} />
      <Route path="/login/sanitation" element={<OfficialLogin roleType="sanitation" />} />
      <Route path="/login/logistics" element={<OfficialLogin roleType="logistics" />} />
      <Route path="/login/recycling" element={<OfficialLogin roleType="recycling" />} />

      {/* State Admin Routes */}
      <Route
        path="/state-admin"
        element={
          <ProtectedRoute allowedRole="state_admin">
            <StateAdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/state-admin/map" element={<ProtectedRoute allowedRole="state_admin"><StateMapPage /></ProtectedRoute>} />
      <Route path="/state-admin/municipalities" element={<ProtectedRoute allowedRole="state_admin"><PlaceholderPage title="Municipalities Management" /></ProtectedRoute>} />
      <Route path="/state-admin/policies" element={<ProtectedRoute allowedRole="state_admin"><PlaceholderPage title="Policy Management" /></ProtectedRoute>} />
      <Route path="/state-admin/reports" element={<ProtectedRoute allowedRole="state_admin"><PlaceholderPage title="State Reports" /></ProtectedRoute>} />

      {/* Municipal Admin Routes */}
      <Route
        path="/municipal-admin"
        element={
          <ProtectedRoute allowedRole="municipal_admin">
            <MunicipalAdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/municipal-admin/map" element={<ProtectedRoute allowedRole="municipal_admin"><CityMapPage /></ProtectedRoute>} />
      <Route path="/municipal-admin/wards" element={<ProtectedRoute allowedRole="municipal_admin"><PlaceholderPage title="Ward Management" /></ProtectedRoute>} />
      <Route path="/municipal-admin/staff" element={<ProtectedRoute allowedRole="municipal_admin"><PlaceholderPage title="Staff Management" /></ProtectedRoute>} />
      <Route path="/municipal-admin/fleet" element={<ProtectedRoute allowedRole="municipal_admin"><PlaceholderPage title="Fleet Management" /></ProtectedRoute>} />

      {/* Dept Routes */}
      <Route
        path="/dept/sanitation"
        element={
          <ProtectedRoute allowedRole="sanitation_dept">
            <SanitationDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/dept/sanitation/map" element={<ProtectedRoute allowedRole="sanitation_dept"><CityMapPage /></ProtectedRoute>} />
      <Route path="/dept/sanitation/shifts" element={<ProtectedRoute allowedRole="sanitation_dept"><PlaceholderPage title="Shift Management" /></ProtectedRoute>} />
      <Route path="/dept/sanitation/complaints" element={<ProtectedRoute allowedRole="sanitation_dept"><PlaceholderPage title="Citizen Complaints" /></ProtectedRoute>} />
      <Route
        path="/dept/logistics"
        element={
          <ProtectedRoute allowedRole="logistics_dept">
            <LogisticsDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/dept/logistics/tracking" element={<ProtectedRoute allowedRole="logistics_dept"><CityMapPage /></ProtectedRoute>} />
      <Route path="/dept/logistics/routes" element={<ProtectedRoute allowedRole="logistics_dept"><PlaceholderPage title="Route Management" /></ProtectedRoute>} />
      <Route path="/dept/logistics/maintenance" element={<ProtectedRoute allowedRole="logistics_dept"><PlaceholderPage title="Vehicle Maintenance" /></ProtectedRoute>} />
      <Route
        path="/dept/recycling"
        element={
          <ProtectedRoute allowedRole="recycling_dept">
            <RecyclingDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/dept/recycling/centers" element={<ProtectedRoute allowedRole="recycling_dept"><PlaceholderPage title="recycling Centers" /></ProtectedRoute>} />
      <Route path="/dept/recycling/inventory" element={<ProtectedRoute allowedRole="recycling_dept"><PlaceholderPage title="Inventory Management" /></ProtectedRoute>} />
      <Route path="/dept/recycling/sales" element={<ProtectedRoute allowedRole="recycling_dept"><PlaceholderPage title="Sales & Revenue" /></ProtectedRoute>} />

      {/* Registration Routes */}
      <Route path="/register" element={<RegisterSelector />} />
      <Route path="/register/household" element={<HouseholdRegister />} />
      <Route path="/register/collector" element={<CollectorRegister />} />
      <Route path="/register/officer" element={<OfficerRegister />} />
      <Route path="/register/third-party" element={<ThirdPartyRegister />} />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
