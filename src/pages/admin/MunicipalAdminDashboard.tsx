import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { WasteChart } from '@/components/charts/WasteChart';
import { WastePieChart } from '@/components/charts/WastePieChart';
import { WardPerformanceChart } from '@/components/charts/WardPerformanceChart';
import { MunicipalAdmin } from '@/types';
import { cityStats, mockBins } from '@/data/mockData';
import BinMap from '@/components/map/BinMap';
import { SmartBin } from '@/types';
import {
    Users, Truck, Trash2, Recycle, TrendingUp, MapPin
} from 'lucide-react';
import { SmartBinChatbot } from '@/components/SmartBinChatbot';

export default function MunicipalAdminDashboard() {
    const { user } = useAuth();
    const admin = user as MunicipalAdmin;
    const [selectedBin, setSelectedBin] = useState<SmartBin | null>(null);

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-display font-bold">
                            Municipal Corporation Dashboard
                        </h1>
                        <p className="text-muted-foreground">
                            Welcome, {admin?.name} • Admin • {admin?.municipality}
                        </p>
                    </div>
                </div>

                {/* City Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        title="Total Waste Today"
                        value={`${(cityStats.totalWasteToday / 1000).toFixed(1)} tons`}
                        subtitle="City-wide collection"
                        icon={Trash2}
                        variant="primary"
                    />
                    <StatCard
                        title="Segregation Score"
                        value={`${cityStats.segregationScore}%`}
                        subtitle="City average"
                        icon={TrendingUp}
                        variant="success"
                    />
                    <StatCard
                        title="Active Collectors"
                        value={cityStats.activeCollectors}
                        subtitle="On duty today"
                        icon={Truck}
                        variant="warning"
                    />
                    <StatCard
                        title="Recycling Rate"
                        value={`${cityStats.recyclingRate}%`}
                        subtitle="Target: 50%"
                        icon={Recycle}
                        variant="secondary"
                    />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <WasteChart title="City Waste Collection Trends" />
                    </div>
                    <WastePieChart title="Waste Category Breakdown" />
                </div>

                {/* Ward Performance */}
                <WardPerformanceChart />
                <WardPerformanceChart />

                {/* City Map Section */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold font-display flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        Live City Monitoring
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-card rounded-lg border border-border overflow-hidden shadow-sm">
                            <BinMap
                                bins={mockBins}
                                onBinClick={setSelectedBin}
                            />
                        </div>
                        <div className="space-y-4">
                            <div className="border border-border rounded-lg p-4 bg-card shadow-sm">
                                <h3 className="font-semibold mb-2">Selected Bin Details</h3>
                                {selectedBin ? (
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground text-sm">Bin ID:</span>
                                            <span className="font-medium">#{selectedBin.binId}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground text-sm">Location:</span>
                                            <span className="font-medium text-right">{selectedBin.location.address}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground text-sm">Fill Level:</span>
                                            <span className={`font-medium ${selectedBin.fillLevel > 90 ? 'text-red-500' : 'text-green-500'}`}>
                                                {selectedBin.fillLevel}%
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground text-sm">Last Update:</span>
                                            <span className="font-medium text-xs text-right">
                                                {new Date(selectedBin.lastUpdated).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-6 text-muted-foreground text-sm">
                                        Select a bin on the map to view details
                                    </div>
                                )}
                            </div>

                            <div className="border border-border rounded-lg p-4 bg-card shadow-sm">
                                <h3 className="font-semibold mb-2">Quick Stats</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Total Bins</span>
                                        <span className="font-medium">{mockBins.length}</span>
                                    </div>
                                    <div className="flex justify-between text-red-500">
                                        <span>Critical</span>
                                        <span className="font-medium">{mockBins.filter(b => b.fillLevel >= 90).length}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SmartBinChatbot
                userRole="ADMIN"
                userUid={admin?.id}
                contextData={{ cityStats, mockBins, selectedBin }}
            />
        </DashboardLayout>
    );
}
