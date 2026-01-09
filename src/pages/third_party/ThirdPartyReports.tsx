import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WasteChart } from '@/components/charts/WasteChart';
import { Button } from '@/components/ui/button';
import { Download, FileBarChart } from 'lucide-react';

export default function ThirdPartyReports() {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-display font-bold">Partner Reports</h1>
                        <p className="text-muted-foreground">Performance metrics for your collection zones</p>
                    </div>
                    <Button className="gap-2" variant="outline">
                        <Download className="w-4 h-4" /> Download Weekly Data
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <WasteChart title="Collection Volume (Your Zones)" />
                    <Card>
                        <CardHeader><CardTitle>Performance Summary</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between p-4 bg-muted rounded-lg">
                                <span>On-Time Pickups</span>
                                <span className="font-bold text-green-600">98%</span>
                            </div>
                            <div className="flex justify-between p-4 bg-muted rounded-lg">
                                <span>Missed Pickups</span>
                                <span className="font-bold text-red-600">2%</span>
                            </div>
                            <div className="flex justify-between p-4 bg-muted rounded-lg">
                                <span>Fuel Efficiency</span>
                                <span className="font-bold">12.5 km/L</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <FileBarChart className="w-5 h-5" /> Recent Logs
                    </h3>
                    <div className="rounded-md border">
                        <div className="p-4 text-center text-muted-foreground">
                            No report logs generated for this week yet.
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
