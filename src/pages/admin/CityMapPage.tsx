import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import BinMap from '@/components/map/BinMap';
import { mockBins } from '@/data/mockData';
import { SmartBin } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function CityMapPage() {
    const [selectedBin, setSelectedBin] = useState<SmartBin | null>(null);

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold font-display">City Waste Map</h1>
                    <p className="text-muted-foreground">Live monitoring of smart bins and vehicles within the municipal corporation.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2 border-border">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-primary" />
                                Live Bin Map
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[600px] w-full bg-muted/20 rounded-lg overflow-hidden border border-border">
                                <BinMap
                                    bins={mockBins}
                                    onBinClick={setSelectedBin}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-4">
                        <Card className="border-border">
                            <CardHeader>
                                <CardTitle>Selected Bin</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {selectedBin ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Bin ID</span>
                                            <Badge variant="outline">{selectedBin.binId}</Badge>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-sm font-medium">Location</span>
                                            <p className="text-sm text-muted-foreground">{selectedBin.location.address}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-sm font-medium">Fill Level</span>
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 flex-1 bg-secondary rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${selectedBin.fillLevel > 90 ? 'bg-destructive' : 'bg-green-500'}`}
                                                        style={{ width: `${selectedBin.fillLevel}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm font-bold">{selectedBin.fillLevel}%</span>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-sm font-medium">Ward</span>
                                            <p className="text-sm text-muted-foreground">{selectedBin.wardNumber}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                        Click a bin marker to view details
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
