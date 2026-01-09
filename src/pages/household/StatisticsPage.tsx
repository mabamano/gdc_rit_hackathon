
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WasteChart } from '@/components/charts/WasteChart';
import { WastePieChart } from '@/components/charts/WastePieChart';
import { StatCard } from '@/components/dashboard/StatCard';
import { TrendingUp, TrendingDown, Scale, Leaf } from 'lucide-react';
import { calculateWasteTotals, mockWasteLogs } from '@/data/mockData';

export default function StatisticsPage() {
    const wasteTotals = calculateWasteTotals(mockWasteLogs);
    const avgDaily = wasteTotals.total / 30; // Mock average

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-display font-bold">Waste Statistics</h1>
                    <p className="text-muted-foreground">Detailed analysis of your waste segregation and disposal habits</p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        title="Avg. Daily Waste"
                        value={`${avgDaily.toFixed(2)} kg`}
                        icon={Scale}
                        variant="primary"
                    />
                    <StatCard
                        title="Segregation Rate"
                        value="87%"
                        subtitle="Top 10% in ward"
                        icon={TrendingUp}
                        variant="success"
                    />
                    <StatCard
                        title="Carbon Offset"
                        value="12.5 kg"
                        subtitle="Estimated CO2 saved"
                        icon={Leaf}
                        variant="secondary"
                    />
                    <StatCard
                        title="Contamination"
                        value="2.1%"
                        subtitle="Low contamination"
                        icon={TrendingDown}
                        variant="default" // Using default instead of success/destructive for neutral/good metric
                    />
                </div>

                {/* Detailed Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <WasteChart title="Waste Generation Trends (6 Months)" />
                        <Card variant="stat">
                            <CardHeader>
                                <CardTitle>Peak Disposal Times</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[200px] flex items-center justify-center text-muted-foreground border-2 border-dashed border-muted rounded-xl bg-muted/20">
                                    Feature coming soon: Heatmap of disposal times
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <WastePieChart title="Composition Analysis" />
                        <Card variant="stat">
                            <CardHeader>
                                <CardTitle>Category Breakdown</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div> Organic</span>
                                        <span className="font-semibold">{wasteTotals.organic.toFixed(1)} kg</span>
                                    </div>
                                    <div className="w-full bg-muted rounded-full h-2">
                                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(wasteTotals.organic / wasteTotals.total) * 100}%` }}></div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500"></div> Recyclable</span>
                                        <span className="font-semibold">{wasteTotals.recyclable.toFixed(1)} kg</span>
                                    </div>
                                    <div className="w-full bg-muted rounded-full h-2">
                                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(wasteTotals.recyclable / wasteTotals.total) * 100}%` }}></div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div> Hazardous</span>
                                        <span className="font-semibold">{wasteTotals.hazardous.toFixed(1)} kg</span>
                                    </div>
                                    <div className="w-full bg-muted rounded-full h-2">
                                        <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(wasteTotals.hazardous / wasteTotals.total) * 100}%` }}></div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
