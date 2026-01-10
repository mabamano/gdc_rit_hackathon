import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  Home,
  Trash2,
  BarChart3,
  Bell,
  Award,
  MapPin,
  Users,
  AlertTriangle,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Truck,
  CheckSquare,
  Clock,
  Leaf,
  Languages,
  QrCode,
  ScanLine,
  LayoutDashboard,
  FileBarChart,
  ClipboardList,
  Wrench,
  Store,
  Box,
  Building,
  Map,
} from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SidebarItem {
  icon: React.ElementType;
  labelKey: string;
  path: string;
}

const householdItems: SidebarItem[] = [
  { icon: Home, labelKey: 'nav.dashboard', path: '/household' },
  { icon: Trash2, labelKey: 'nav.wasteHistory', path: '/household/history' },
  { icon: BarChart3, labelKey: 'nav.statistics', path: '/household/stats' },
  { icon: Award, labelKey: 'nav.rewards', path: '/household/rewards' },
  { icon: QrCode, labelKey: 'My QR Code', path: '/household/qr' },
  { icon: Bell, labelKey: 'nav.notifications', path: '/household/notifications' },
];

const collectorItems: SidebarItem[] = [
  { icon: Home, labelKey: 'nav.dashboard', path: '/collector' },
  { icon: ScanLine, labelKey: 'Scan QR', path: '/collector/scan' },
  { icon: MapPin, labelKey: 'nav.myRoute', path: '/collector/route' },
  { icon: CheckSquare, labelKey: 'nav.pickups', path: '/collector/pickups' },
  { icon: AlertTriangle, labelKey: 'nav.reportIssue', path: '/collector/report' },
  { icon: Clock, labelKey: 'nav.attendance', path: '/collector/attendance' },
];

const officerItems: SidebarItem[] = [
  { icon: Home, labelKey: 'nav.dashboard', path: '/officer' },
  { icon: MapPin, labelKey: 'nav.cityMap', path: '/officer/map' },
  { icon: Users, labelKey: 'nav.households', path: '/officer/households' },
  { icon: Truck, labelKey: 'nav.collectors', path: '/officer/collectors' },
  { icon: AlertTriangle, labelKey: 'nav.violations', path: '/officer/violations' },
  { icon: BarChart3, labelKey: 'nav.reports', path: '/officer/reports' },
  { icon: Award, labelKey: 'nav.incentives', path: '/officer/incentives' },
];

const stateAdminItems: SidebarItem[] = [
  { icon: LayoutDashboard, labelKey: 'nav.dashboard', path: '/state-admin' },
  { icon: MapPin, labelKey: 'nav.stateMap', path: '/state-admin/map' },
  { icon: Building, labelKey: 'nav.municipalities', path: '/state-admin/municipalities' },
  { icon: FileText, labelKey: 'nav.policies', path: '/state-admin/policies' },
  { icon: BarChart3, labelKey: 'nav.reports', path: '/state-admin/reports' },
];

const municipalAdminItems: SidebarItem[] = [
  { icon: LayoutDashboard, labelKey: 'nav.dashboard', path: '/municipal-admin' },
  { icon: MapPin, labelKey: 'nav.cityMap', path: '/municipal-admin/map' },
  { icon: Map, labelKey: 'nav.wards', path: '/municipal-admin/wards' },
  { icon: Users, labelKey: 'nav.staff', path: '/municipal-admin/staff' },
  { icon: Truck, labelKey: 'nav.fleet', path: '/municipal-admin/fleet' },
];

const sanitationItems: SidebarItem[] = [
  { icon: LayoutDashboard, labelKey: 'nav.dashboard', path: '/dept/sanitation' },
  { icon: MapPin, labelKey: 'nav.liveMap', path: '/dept/sanitation/map' },
  { icon: Clock, labelKey: 'nav.shifts', path: '/dept/sanitation/shifts' },
  { icon: AlertTriangle, labelKey: 'nav.complaints', path: '/dept/sanitation/complaints' },
];

const logisticsItems: SidebarItem[] = [
  { icon: LayoutDashboard, labelKey: 'nav.dashboard', path: '/dept/logistics' },
  { icon: MapPin, labelKey: 'nav.tracking', path: '/dept/logistics/tracking' },
  { icon: Truck, labelKey: 'nav.routes', path: '/dept/logistics/routes' },
  { icon: Wrench, labelKey: 'nav.maintenance', path: '/dept/logistics/maintenance' },
];

const recyclingItems: SidebarItem[] = [
  { icon: LayoutDashboard, labelKey: 'nav.dashboard', path: '/dept/recycling' },
  { icon: Store, labelKey: 'nav.centers', path: '/dept/recycling/centers' },
  { icon: Box, labelKey: 'nav.inventory', path: '/dept/recycling/inventory' },
  { icon: FileBarChart, labelKey: 'nav.sales', path: '/dept/recycling/sales' },
];

const thirdPartyItems: SidebarItem[] = [
  { icon: Home, labelKey: 'nav.dashboard', path: '/third-party' },
  { icon: MapPin, labelKey: 'nav.cityMap', path: '/third-party/map' },
  { icon: FileText, labelKey: 'nav.reports', path: '/third-party/reports' },
];

export function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { role, user, logout } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const location = useLocation();

  const items = role === 'household' ? householdItems :
    role === 'collector' ? collectorItems :
      role === 'third_party' ? thirdPartyItems :
        role === 'state_admin' ? stateAdminItems :
          role === 'municipal_admin' ? municipalAdminItems :
            role === 'sanitation_dept' ? sanitationItems :
              role === 'logistics_dept' ? logisticsItems :
                role === 'recycling_dept' ? recyclingItems :
                  officerItems;

  const getUserName = () => {
    if (!user) return t('common.user');
    if ('name' in user) return user.name;
    if ('houseNumber' in user) return `${t('common.house')} ${user.houseNumber}`;
    return t('common.user');
  };

  const getRoleLabel = () => {
    if (role === 'household') return t('role.household');
    if (role === 'collector') return t('role.collector');
    if (role === 'officer') return t('role.officer');
    if (role === 'third_party') return t('role.third_party');
    if (role === 'state_admin') return t('role.state_admin');
    if (role === 'municipal_admin') return t('role.municipal_admin');
    if (role === 'sanitation_dept') return t('role.sanitation');
    if (role === 'logistics_dept') return t('role.logistics');
    if (role === 'recycling_dept') return t('role.recycling');
    return '';
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ta' : 'en');
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-xl bg-primary/10 backdrop-blur-md text-primary border border-primary/20 shadow-xl transition-all hover:bg-primary/20"
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen transition-all duration-500 ease-in-out flex flex-col border-r border-white/10 shadow-2xl overflow-hidden",
          "backdrop-blur-xl bg-sidebar/80",
          isMobileOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0",
          isCollapsed ? "lg:w-20" : "lg:w-64",
          "lg:relative lg:translate-x-0"
        )}
      >
        {/* Logo and Collapse Button */}
        <div className="p-6 flex items-center justify-between border-b border-white/5">
          <div className={cn("flex items-center gap-3 transition-all duration-300", isCollapsed && "lg:opacity-0 lg:scale-0 lg:w-0")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-900/20">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div className="whitespace-nowrap">
              <h1 className="font-display font-bold text-lg leading-tight tracking-tight text-sidebar-foreground">{t('app.name')}</h1>
              <p className="text-[10px] text-sidebar-foreground/60 font-medium uppercase tracking-wider">{t('app.subtitle')}</p>
            </div>
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-lg hover:bg-white/5 text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* User info */}
        <div className="p-4 border-b border-white/5">
          <div className={cn(
            "flex items-center gap-3 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden",
            isCollapsed && "lg:p-1 lg:justify-center"
          )}>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary/40 shrink-0">
              <span className="text-sm font-bold text-primary">{getUserName().charAt(0)}</span>
            </div>
            <div className={cn("transition-all duration-300 flex-1 min-w-0", isCollapsed && "lg:hidden")}>
              <p className="font-semibold text-sm truncate text-sidebar-foreground">{getUserName()}</p>
              <p className="text-[11px] text-sidebar-foreground/50 truncate font-medium">{getRoleLabel()}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto custom-scrollbar">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "text-sidebar-foreground/60 hover:bg-white/5 hover:text-sidebar-foreground",
                  isCollapsed && "lg:justify-center lg:px-0"
                )}
              >
                <Icon className={cn("w-5 h-5 transition-transform duration-300 group-hover:scale-110 shrink-0", isActive && "scale-110")} />
                <span className={cn("font-medium transition-all duration-300", isCollapsed && "lg:hidden")}>
                  {t(item.labelKey)}
                </span>
                {isActive && !isCollapsed && (
                  <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-primary-foreground/50" />
                )}

                {/* Tooltip for collapsed mode */}
                {isCollapsed && (
                  <div className="fixed left-24 px-3 py-2 bg-sidebar-foreground text-sidebar bg-black rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50 whitespace-nowrap hidden lg:block">
                    {t(item.labelKey)}
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="p-4 border-t border-white/5 space-y-2">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-200 w-full group",
              isCollapsed && "lg:justify-center lg:px-0"
            )}
          >
            <Languages className="w-5 h-5 text-sidebar-foreground/60 group-hover:text-primary transition-colors shrink-0" />
            <span className={cn("text-sm font-medium transition-all duration-300", isCollapsed && "lg:hidden")}>
              {t('language.ta')}
            </span>
          </button>

          <NavLink
            to={`/${role}/settings`}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200",
              location.pathname.includes('/settings')
                ? "bg-white/10 text-sidebar-foreground"
                : "text-sidebar-foreground/60 hover:bg-white/5 hover:text-sidebar-foreground",
              isCollapsed && "lg:justify-center lg:px-0"
            )}
          >
            <Settings className="w-5 h-5 shrink-0" />
            <span className={cn("text-sm font-medium", isCollapsed && "lg:hidden")}>{t('nav.settings')}</span>
          </NavLink>

          <button
            onClick={logout}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-400 hover:bg-red-400/10 transition-all duration-200 w-full text-left",
              isCollapsed && "lg:justify-center lg:px-0"
            )}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span className={cn("text-sm font-medium", isCollapsed && "lg:hidden")}>{t('nav.logout')}</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-md z-30 lg:hidden transition-all duration-500"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
