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
    setLanguage(language === 'en' ? 'or' : 'en');
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-primary text-primary-foreground shadow-lg"
      >
        {isCollapsed ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-sidebar text-sidebar-foreground transition-all duration-300 flex flex-col",
          isCollapsed ? "w-64" : "w-0 lg:w-64",
          "lg:relative shadow-2xl"
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border bg-sidebar-accent/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-900/20">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg leading-tight tracking-tight">{t('app.name')}</h1>
              <p className="text-xs text-sidebar-foreground/70 font-medium">{t('app.subtitle')}</p>
            </div>
          </div>
        </div>

        {/* User info */}
        <div className="p-4 border-b border-sidebar-border bg-sidebar-accent/5">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent/50 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-sidebar-primary/20 flex items-center justify-center border-2 border-sidebar-primary">
              <span className="text-sm font-bold text-sidebar-primary">{getUserName().charAt(0)}</span>
            </div>
            <div className="overflow-hidden">
              <p className="font-semibold text-sm truncate">{getUserName()}</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">{getRoleLabel()}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  "sidebar-item group relative overflow-hidden",
                  isActive && "active font-medium"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-sidebar-primary rounded-r-full" />
                )}
                <Icon className={cn("w-5 h-5 transition-transform duration-200 group-hover:scale-110")} />
                <span className={cn()}>{t(item.labelKey)}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="p-4 border-t border-sidebar-border space-y-2 bg-sidebar-accent/5">
          {/* Language Toggle */}
          {/* Language Toggle (Simple) */}
          <button
            onClick={toggleLanguage}
            className="flex items-center justify-between px-4 py-2 rounded-lg bg-sidebar-accent/20 border border-sidebar-border/50 cursor-pointer hover:bg-sidebar-accent/40 transition-colors w-full"
          >
            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4 text-sidebar-foreground/70" />
              <span className="text-sm font-medium">
                {language === 'en' ? 'English' :
                  language === 'or' ? 'Odia' :
                    language === 'hi' ? 'Hindi' :
                      language === 'bn' ? 'Bengali' : 'Telugu'}
              </span>
            </div>
          </button>

          <NavLink
            to={`/${role}/settings`}
            className={cn(
              "sidebar-item",
              location.pathname.includes('/settings') && "active"
            )}
          >
            <Settings className="w-5 h-5" />
            <span>{t('nav.settings')}</span>
          </NavLink>

          <button
            onClick={logout}
            className="sidebar-item w-full text-left hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>{t('nav.logout')}</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isCollapsed && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsCollapsed(false)}
        />
      )}
    </>
  );
}
