import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { WasteChart } from '@/components/charts/WasteChart';
import { WastePieChart } from '@/components/charts/WastePieChart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import BinMap from '@/components/map/BinMap';
import { mockBins } from '@/data/mockData';
import { SmartBin } from '@/types';
import { StateAdmin } from '@/types';
import { cityStats, mockWardStats } from '@/data/mockData';
import {
    Building, Users, TrendingUp, MapPin, Award, Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function StateAdminDashboard() {
    const { user } = useAuth();
    const admin = user as StateAdmin;
    const [selectedBin, setSelectedBin] = useState<SmartBin | null>(null);

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-display font-bold">
                            State Overview Dashboard
                        </h1>
                        <p className="text-muted-foreground">
                            Welcome, {admin?.name} • Chief Minister's Office • {admin?.state}
                        </p>
                    </div>
                </div>

                {/* Key Performance Indicators (State Level) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        title="Total Waste Processed"
                        value="12,580 tons"
                        subtitle="Across all municipalities"
                        icon={Activity}
                        variant="primary"
                    />
                    <StatCard
                        title="Avg Segregation Score"
                        value={`${cityStats.segregationScore}%`}
                        subtitle="State average"
                        icon={TrendingUp}
                        variant="success"
                        trend={{ value: 5, isPositive: true }}
                    />
                    <StatCard
                        title="Active Municipalities"
                        value="1" // Mock value
                        subtitle="Reporting live data"
                        icon={Building}
                    />
                    <StatCard
                        title="Total Households"
                        value={cityStats.totalHouseholds.toLocaleString()}
                        subtitle="Covered under Smart Bin"
                        icon={Users}
                        variant="secondary"
                    />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <WasteChart title="State-wide Waste Trends (Monthly)" />
                    </div>
                    <WastePieChart title="Aggregate Waste Composition" />
                </div>

                {/* State Map Section */}
                <Card className="border-border">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-primary" />
                            Live State Monitoring
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[500px] w-full bg-muted/20 rounded-lg overflow-hidden border border-border">
                            <BinMap
                                bins={mockBins}
                                onBinClick={setSelectedBin}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Municipality Performance (Mocked as Wards for now) */}
                <Card variant="stat">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Award className="w-5 h-5 text-warning" />
                            Municipality Performance Leaderboard
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {mockWardStats
                                .slice(0, 3)
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
                                                <p className="font-medium">Bhubaneswar (Zone {ward.wardNumber})</p>
                                                <p className="text-xs text-muted-foreground">
                                                    High compliance rating
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
            </div>
        </DashboardLayout>
    );
}
