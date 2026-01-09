
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WasteChart } from '@/components/charts/WasteChart';
import { WastePieChart } from '@/components/charts/WastePieChart';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export default function ReportsPage() {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-display font-bold">Analytics & Reports</h1>
                        <p className="text-muted-foreground">City-wide waste generation and management metrics</p>
                    </div>
                    <Button className="gap-2">
                        <Download className="w-4 h-4" /> Export Report (PDF)
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <WasteChart title="Total Waste Collected (City Wide)" />
                    <WastePieChart title="City Waste Composition" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader><CardTitle className="text-lg">Efficiency Score</CardTitle></CardHeader>
                        <CardContent><p className="text-4xl font-bold text-green-600">94%</p><p className="text-sm text-muted-foreground">+2% from last month</p></CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle className="text-lg">Landfill Diversion</CardTitle></CardHeader>
                        <CardContent><p className="text-4xl font-bold text-blue-600">68%</p><p className="text-sm text-muted-foreground">Target: 75%</p></CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle className="text-lg">Revenue Generated</CardTitle></CardHeader>
                        <CardContent><p className="text-4xl font-bold text-orange-600">₹4.2L</p><p className="text-sm text-muted-foreground">From recycled materials</p></CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
