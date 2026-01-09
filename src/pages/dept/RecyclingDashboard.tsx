import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { WastePieChart } from '@/components/charts/WastePieChart';
import { DepartmentUser } from '@/types';
import { cityStats, monthlyWasteData } from '@/data/mockData'; // Using cityStats as base
import {
    Recycle, Factory, Zap, DollarSign
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function RecyclingDashboard() {
    const { user } = useAuth();
    const deptUser = user as DepartmentUser;

    // Mock revenue calculation
    const revenue = (cityStats.totalWasteToday * 0.38 * 0.05).toFixed(0); // Rough mock

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-display font-bold">
                            Recycling Center Operations
                        </h1>
                        <p className="text-muted-foreground">
                            {deptUser?.name} • {deptUser?.departmentName} Dept
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        title="Daily Recycled Material"
                        value={`${(cityStats.totalWasteToday * cityStats.recyclingRate / 100000).toFixed(1)} tons`}
                        subtitle="Processed today"
                        icon={Recycle}
                        variant="success"
                    />
                    <StatCard
                        title="Processing Efficiency"
                        value="94%"
                        subtitle="Machine uptime"
                        icon={Factory}
                        variant="secondary"
                    />
                    <StatCard
                        title="Energy Generated"
                        value="450 kWh" // Mock
                        subtitle="From Waste-to-Energy"
                        icon={Zap}
                        variant="warning"
                    />
                    <StatCard
                        title="Revenue Generated"
                        value={`₹${revenue}`}
                        subtitle="From recyclables sold"
                        icon={DollarSign}
                        variant="primary"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <WastePieChart title="Incoming Waste Composition" />

                    <Card>
                        <CardHeader>
                            <CardTitle>Processing Center Capacity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Organic Composting (Unit A)</span>
                                        <span className="font-bold">78%</span>
                                    </div>
                                    <div className="h-2 w-full bg-secondary/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 w-[78%]" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Plastic Sorting (Unit B)</span>
                                        <span className="font-bold">65%</span>
                                    </div>
                                    <div className="h-2 w-full bg-secondary/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 w-[65%]" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Metal/Glass (Unit C)</span>
                                        <span className="font-bold">42%</span>
                                    </div>
                                    <div className="h-2 w-full bg-secondary/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-orange-500 w-[42%]" />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
