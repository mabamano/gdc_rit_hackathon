import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { WasteChart } from '@/components/charts/WasteChart';
import { WastePieChart } from '@/components/charts/WastePieChart';
import { WardPerformanceChart } from '@/components/charts/WardPerformanceChart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Officer } from '@/types';
import { cityStats, mockWardStats, mockBinStatuses, mockViolations } from '@/data/mockData';
import { 
  Building2, Users, Truck, Trash2, Recycle, AlertTriangle, 
  TrendingUp, MapPin, Award 
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function OfficerDashboard() {
  const { user } = useAuth();
  const officer = user as Officer;

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'ward_officer': return 'Ward Officer';
      case 'supervisor': return 'Supervisor';
      default: return role;
    }
  };

  const unresolvedViolations = mockViolations.filter(v => !v.resolved);
  const overflowBins = mockBinStatuses.filter(b => b.status === 'overflow' || b.status === 'full');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold">
              Municipal Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome, {officer?.name} • {getRoleLabel(officer?.role || '')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm py-1.5 px-3">
              Wards: {officer?.assignedWards?.join(', ')}
            </Badge>
          </div>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Waste Today"
            value={`${(cityStats.totalWasteToday / 1000).toFixed(1)} tons`}
            subtitle="City-wide collection"
            icon={Trash2}
            variant="primary"
          />
          <StatCard
            title="Active Households"
            value={cityStats.totalHouseholds}
            subtitle="Registered users"
            icon={Users}
          />
          <StatCard
            title="Active Collectors"
            value={cityStats.activeCollectors}
            subtitle="On duty today"
            icon={Truck}
            variant="success"
          />
          <StatCard
            title="Recycling Rate"
            value={`${cityStats.recyclingRate}%`}
            subtitle="Of total waste"
            icon={Recycle}
            trend={{ value: 3, isPositive: true }}
            variant="secondary"
          />
        </div>

        {/* Performance & Alerts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Segregation Score"
            value={`${cityStats.segregationScore}%`}
            subtitle="City average"
            icon={TrendingUp}
            variant="success"
          />
          <StatCard
            title="Hazardous Alerts"
            value={cityStats.hazardousAlerts}
            subtitle="Active alerts"
            icon={AlertTriangle}
            variant="destructive"
          />
          <StatCard
            title="Overflow Bins"
            value={overflowBins.length}
            subtitle="Need attention"
            icon={MapPin}
            variant="warning"
          />
          <StatCard
            title="Violations"
            value={unresolvedViolations.length}
            subtitle="Pending review"
            icon={Building2}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <WasteChart title="City-wide Waste Collection Trends" />
          </div>
          <WastePieChart title="Waste Category Split" />
        </div>

        {/* Ward Performance */}
        <WardPerformanceChart />

        {/* Ward Leaderboard & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ward Leaderboard */}
          <Card variant="stat">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="w-5 h-5 text-warning" />
                Ward Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockWardStats
                  .sort((a, b) => b.segregationScore - a.segregationScore)
                  .map((ward, index) => (
                    <div
                      key={ward.wardNumber}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-lg",
                        index === 0 ? "bg-warning/10 border border-warning/30" :
                        index === 1 ? "bg-muted/50" :
                        index === 2 ? "bg-accent/50" : "bg-card"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                          index === 0 ? "bg-warning text-warning-foreground" :
                          index === 1 ? "bg-muted-foreground/20 text-foreground" :
                          index === 2 ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                        )}>
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-medium">{ward.wardNumber}</p>
                          <p className="text-xs text-muted-foreground">
                            {ward.householdsCompliant}/{ward.totalHouseholds} compliant
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{ward.segregationScore}%</p>
                        <p className="text-xs text-muted-foreground">Score</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Violations */}
          <Card variant="stat">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                Recent Violations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockViolations.map((violation) => (
                  <div
                    key={violation.id}
                    className={cn(
                      "p-3 rounded-lg border",
                      violation.resolved ? "bg-muted/30 border-muted" : "bg-destructive/5 border-destructive/20"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-sm">{violation.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          House: {violation.houseId} • {violation.timestamp.toLocaleDateString()}
                        </p>
                      </div>
                      <Badge
                        variant={violation.resolved ? "secondary" : "destructive"}
                        className="shrink-0"
                      >
                        {violation.resolved ? 'Resolved' : violation.severity}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bin Status Map Placeholder */}
        <Card variant="stat">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Live Bin Status Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-accent/30 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Interactive city map with bin locations</p>
                <p className="text-sm text-muted-foreground">Color-coded by fill level</p>
                <div className="flex items-center justify-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-success" />
                    <span className="text-xs">Empty</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-warning" />
                    <span className="text-xs">Partial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive" />
                    <span className="text-xs">Full/Overflow</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
