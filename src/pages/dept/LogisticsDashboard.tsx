import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { DepartmentUser } from '@/types';
import { cityStats } from '@/data/mockData';
import {
    Truck, Map, Clock, Fuel
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function LogisticsDashboard() {
    const { user } = useAuth();
    const deptUser = user as DepartmentUser;

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-display font-bold">
                            Fleet & Logistics
                        </h1>
                        <p className="text-muted-foreground">
                            {deptUser?.name} • {deptUser?.departmentName} Dept
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        title="Active Vehicles"
                        value={cityStats.activeCollectors} // Assuming 1 vehicle per collector for mock
                        subtitle="Currently on routes"
                        icon={Truck}
                        variant="primary"
                    />
                    <StatCard
                        title="Route Completion"
                        value="68%"
                        subtitle="In progress"
                        icon={Map}
                        variant="warning"
                    />
                    <StatCard
                        title="Avg Route Time"
                        value="4.2 hrs"
                        subtitle="Per shift"
                        icon={Clock}
                    />
                    <StatCard
                        title="Fuel Efficiency"
                        value="Good" // Mock
                        subtitle="Green Score: 8.5/10"
                        icon={Fuel}
                        variant="success"
                    />
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Live Fleet Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[400px] w-full bg-muted/20 rounded-lg border-2 border-dashed border-border flex items-center justify-center flex-col gap-2">
                            <Map className="w-12 h-12 text-muted-foreground" />
                            <p className="text-muted-foreground font-medium">Interactive Fleet Map Component</p>
                            <p className="text-sm text-muted-foreground">Shows real-time location of all {cityStats.activeCollectors} collection vehicles</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
