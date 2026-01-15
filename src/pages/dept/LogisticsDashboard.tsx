import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { DepartmentUser } from '@/types';
import { cityStats } from '@/data/mockData';
import { Truck, Map, Clock, Fuel, AlertTriangle, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WasteHeatmap from '@/components/admin/WasteHeatmap';
import { OfficerAIAssistant } from '@/components/officer/OfficerAIAssistant';

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

                {/* AI & Fleet Map Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    <WasteHeatmap />
                    <OfficerAIAssistant />
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Truck className="w-5 h-5 text-primary" />
                            Live Fleet Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="h-[300px] w-full bg-muted/20 rounded-lg border border-border flex items-center justify-center flex-col gap-2 relative overflow-hidden">
                                <Map className="w-12 h-12 text-muted-foreground opacity-20" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center p-6 bg-background/80 backdrop-blur-sm rounded-xl border shadow-sm">
                                        <p className="text-foreground font-semibold">Active Fleet: {cityStats.activeCollectors} Units</p>
                                        <p className="text-sm text-muted-foreground mt-1">Real-time GPS tracking active for all zones.</p>
                                        <Badge variant="secondary" className="mt-3">System Online</Badge>
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
