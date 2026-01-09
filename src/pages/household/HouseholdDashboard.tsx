import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { BinStatusIndicator } from '@/components/dashboard/BinStatusIndicator';
import { NotificationList } from '@/components/dashboard/NotificationList';
import { WasteHistoryTable } from '@/components/dashboard/WasteHistoryTable';
import { WasteChart } from '@/components/charts/WasteChart';
import { WastePieChart } from '@/components/charts/WastePieChart';
import { mockNotifications, calculateWasteTotals } from '@/data/mockData';
import { useRealtimeData } from '@/hooks/useRealtimeData';
import { HouseholdUser } from '@/types';
import { Trash2, Recycle, AlertTriangle, Award, Calendar, TrendingUp } from 'lucide-react';


export default function HouseholdDashboard() {
  const { user } = useAuth();
  const household = user as HouseholdUser;
  const { wasteLogs, binStatuses, isConnected } = useRealtimeData();

  // Filter logs for this household (assuming user.id matches houseId, or fallback to 'h1')
  const userLogs = wasteLogs.filter(log => log.houseId === (user?.id || 'h1'));

  // Get current bin status
  const currentBin = binStatuses.find(bin => bin.houseId === (user?.id || 'h1')) || binStatuses[0];

  const wasteTotals = calculateWasteTotals(userLogs);
  const segregationScore = 87;
  const nextPickupDate = new Date();
  nextPickupDate.setDate(nextPickupDate.getDate() + 1);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold">
              Welcome, House {household?.houseNumber}
            </h1>
            <p className="text-muted-foreground">
              Ward {household?.wardNumber} • Street {household?.streetNumber}
              {isConnected && <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Live</span>}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <div className="flex items-center gap-2 px-4 py-2 bg-accent rounded-lg">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Next Pickup</p>
                <p className="font-medium">{nextPickupDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Today's Waste"
            value={`${wasteTotals.total.toFixed(1)} kg`}
            subtitle="Deposited today"
            icon={Trash2}
            variant="primary"
          />
          <StatCard
            title="Segregation Score"
            value={`${segregationScore}%`}
            subtitle="Accuracy rating"
            icon={TrendingUp}
            trend={{ value: 5, isPositive: true }}
            variant="success"
          />
          <StatCard
            title="Reward Points"
            value={household?.rewardPoints || 0}
            subtitle="Redeemable points"
            icon={Award}
            variant="warning"
          />
          <StatCard
            title="Hazardous Items"
            value={userLogs.filter(l => l.wasteType === 'hazardous').length}
            subtitle="This month"
            icon={AlertTriangle}
            variant="destructive"
          />
        </div>

        {/* Waste categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Organic Waste"
            value={`${wasteTotals.organic.toFixed(1)} kg`}
            icon={Recycle}
            className="border-l-4 border-l-success"
          />
          <StatCard
            title="Recyclable Waste"
            value={`${wasteTotals.recyclable.toFixed(1)} kg`}
            icon={Recycle}
            className="border-l-4 border-l-primary"
          />
          <StatCard
            title="Hazardous Waste"
            value={`${wasteTotals.hazardous.toFixed(1)} kg`}
            icon={AlertTriangle}
            className="border-l-4 border-l-destructive"
          />
        </div>

        {/* Charts and Bin Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <WasteChart title="Your Monthly Waste Trends" />
          </div>
          <div className="space-y-6">
            <BinStatusIndicator
              fillLevel={currentBin?.fillLevel || 0}
              lastUpdated={new Date(currentBin?.lastUpdated || new Date())}
            />
            <WastePieChart title="Your Waste Distribution" />
          </div>
        </div>

        {/* Notifications and History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <NotificationList notifications={mockNotifications} />
          <WasteHistoryTable logs={userLogs} maxItems={5} />
        </div>
      </div>
    </DashboardLayout>
  );
}
