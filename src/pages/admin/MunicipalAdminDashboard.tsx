import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { WasteChart } from '@/components/charts/WasteChart';
import { WastePieChart } from '@/components/charts/WastePieChart';
import { WardPerformanceChart } from '@/components/charts/WardPerformanceChart';
import { cityStats, mockBins } from '@/data/mockData';
import { Trash2, AlertTriangle, MapPin, CheckCircle, TrendingUp, Users, Truck, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import WasteHeatmap from '@/components/admin/WasteHeatmap';
import { OfficerAIAssistant } from '@/components/officer/OfficerAIAssistant';
import { SmartBinChatbot } from '@/components/SmartBinChatbot';
import { MunicipalAdmin, SmartBin } from '@/types';

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
                    {/* ... existing stats ... */}
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

                    {/* New Festival Alert Card */}
                    <Card className="bg-gradient-to-br from-purple-50 to-white border-l-4 border-l-purple-500 shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground flex justify-between items-center">
                                Festival Alert
                                <Calendar className="w-4 h-4 text-purple-600" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-700">Pongal Surge</div>
                            <p className="text-xs text-muted-foreground mt-1">Predicted: +25% Organic Waste</p>
                            <Button
                                variant="outline"
                                size="sm"
                                className="mt-3 w-full text-xs h-7 border-purple-200 hover:bg-purple-100 text-purple-700"
                                onClick={async () => {
                                    const { PredictionService } = await import('@/services/predictionService');
                                    const prediction = PredictionService.predictSurge();
                                    if (prediction.festival) {
                                        PredictionService.createCalendarAlert(prediction.festival);
                                    }
                                }}
                            >
                                Set Calendar Alert
                            </Button>
                        </CardContent>
                    </Card>

                    <StatCard
                        title="Active Collectors"
                        value={cityStats.activeCollectors}
                        subtitle="On duty today"
                        icon={Truck}
                        variant="warning"
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

                {/* AI & Map Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    <WasteHeatmap />
                    <OfficerAIAssistant />
                </div>

                {/* Operations Feed & Quick Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-primary">
                                <Trash2 className="w-5 h-5" />
                                Critical Operations Feed
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {mockBins.filter(b => b.fillLevel > 90).length === 0 ? (
                                    <p className="text-muted-foreground text-sm italic">No critical bins detected at this moment.</p>
                                ) : (
                                    mockBins.filter(b => b.fillLevel > 90).slice(0, 4).map((bin, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 border rounded-xl bg-destructive/5 border-destructive/10 transition-all hover:bg-destructive/10 group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <AlertTriangle className="w-5 h-5 text-destructive" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-sm">Zone {i + 1} - Bin #{bin.binId}</p>
                                                    <p className="text-xs text-muted-foreground">{bin.location.address}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <Badge variant="destructive" className="mb-2 animate-pulse">CRITICAL</Badge>
                                                <p className="text-xs font-bold text-destructive">{bin.fillLevel}%</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-6 text-sm">
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle className="text-lg">Quick Stats</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                                    <span className="text-muted-foreground">Total Bins Managed</span>
                                    <span className="font-bold text-lg">{mockBins.length}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-destructive/10 rounded-lg">
                                    <span className="text-destructive font-semibold">Immediate Action Required</span>
                                    <span className="font-bold text-lg text-destructive">{mockBins.filter(b => b.fillLevel >= 90).length}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg">
                                    <span className="text-green-600 font-semibold">Healthy Bins</span>
                                    <span className="font-bold text-lg text-green-600">{mockBins.filter(b => b.fillLevel < 50).length}</span>
                                </div>
                            </CardContent>
                        </Card>
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
