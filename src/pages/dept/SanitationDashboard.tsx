import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { DepartmentUser, SmartBin } from '@/types';
import { cityStats, mockBinStatuses, mockViolations, mockBins } from '@/data/mockData';
import BinMap from '@/components/map/BinMap';
import {
    Trash2, AlertTriangle, MapPin, CheckCircle
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import WasteHeatmap from '@/components/admin/WasteHeatmap';
import { OfficerAIAssistant } from '@/components/officer/OfficerAIAssistant';

export default function SanitationDashboard() {
    const { user } = useAuth();
    const deptUser = user as DepartmentUser;
    const [selectedBin, setSelectedBin] = useState<SmartBin | null>(null);

    const overflowBins = mockBinStatuses.filter(b => b.status === 'overflow' || b.status === 'full');
    const criticalViolations = mockViolations.filter(v => v.severity === 'high' && !v.resolved);

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-display font-bold">
                            Sanitation Operations
                        </h1>
                        <p className="text-muted-foreground">
                            {deptUser?.name} • {deptUser?.departmentName} Dept
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        title="Bins Requiring Action"
                        value={overflowBins.length}
                        subtitle="Full or overflowing"
                        icon={Trash2}
                        variant={overflowBins.length > 0 ? "destructive" : "success"}
                    />
                    <StatCard
                        title="Active Issues"
                        value={criticalViolations.length}
                        subtitle="High severity violations"
                        icon={AlertTriangle}
                        variant="warning"
                    />
                    <StatCard
                        title="Collection Coverage"
                        value="92%"
                        subtitle="Today's target"
                        icon={CheckCircle}
                        variant="success"
                    />
                    <StatCard
                        title="Field Staff Active"
                        value={cityStats.activeCollectors}
                        subtitle="On ground"
                        icon={MapPin}
                    />
                </div>

                {/* AI & Map Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    <WasteHeatmap />
                    <OfficerAIAssistant />
                </div>

                {/* Critical Status Feed */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary">
                            <Trash2 className="w-5 h-5" />
                            Operations Feed
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {overflowBins.length === 0 ? (
                                <p className="text-muted-foreground">No bins currently require immediate attention.</p>
                            ) : (
                                overflowBins.slice(0, 3).map((bin, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 border rounded-xl bg-destructive/5 border-destructive/10 transition-colors hover:bg-destructive/10">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
                                                <AlertTriangle className="w-5 h-5 text-destructive" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm">Zone 12 - Bin #{bin.houseId}</p>
                                                <p className="text-xs text-muted-foreground">Status: {bin.status} ({bin.fillLevel}%)</p>
                                            </div>
                                        </div>
                                        <Badge variant="destructive" className="animate-pulse">URGENT</Badge>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
