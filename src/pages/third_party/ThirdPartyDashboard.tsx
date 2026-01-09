import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { WasteChart } from '@/components/charts/WasteChart';
import { Truck, Recycle, Activity, MapPin } from 'lucide-react';

export default function ThirdPartyDashboard() {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-display font-bold">Partner Dashboard</h1>
                    <p className="text-muted-foreground">Monitor collection channels and city-wide metrics</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        title="Collection Zones"
                        value="12"
                        subtitle="Active zones monitored"
                        icon={MapPin}
                        variant="primary"
                    />
                    <StatCard
                        title="Total Waste Monitored"
                        value="45.2 tons"
                        subtitle="This month"
                        icon={Recycle}
                        variant="success"
                    />
                    <StatCard
                        title="Collection Efficiency"
                        value="94%"
                        subtitle="+2% from last month"
                        icon={Activity}
                        variant="warning"
                    />
                    <StatCard
                        title="Active Vehicles"
                        value="28"
                        subtitle="Currently on route"
                        icon={Truck}
                        variant="default"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <WasteChart title="Collection Trends by Channel" />
                    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                        <h3 className="font-semibold mb-4">Channel Performance</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span>Municipal Trucks</span>
                                <span className="font-bold">65%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                                <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
                            </div>

                            <div className="flex justify-between items-center">
                                <span>Private Contractors</span>
                                <span className="font-bold">25%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                            </div>

                            <div className="flex justify-between items-center">
                                <span>Community Collection</span>
                                <span className="font-bold">10%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
