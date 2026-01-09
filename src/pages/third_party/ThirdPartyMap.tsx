import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import BinMap from '@/components/map/BinMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SmartBin } from '@/types';
import { MapPin, Trash2, AlertTriangle, CheckCircle } from 'lucide-react';

// Reusing same mock data for now, in real app this might come from API with restricted fields
const mockBins: SmartBin[] = [
    {
        id: '1',
        binId: 'BIN001',
        wardNumber: 'W01',
        location: { lat: 13.0827, lng: 80.2707, address: 'Chennai Main Market' },
        fillLevel: 85,
        wasteType: 'mixed',
        lastUpdated: new Date(),
        status: 'active',
    },
    {
        id: '2',
        binId: 'BIN002',
        wardNumber: 'W01',
        location: { lat: 13.0694, lng: 80.2081, address: 'CMBT Bus Stand' },
        fillLevel: 45,
        wasteType: 'organic',
        lastUpdated: new Date(),
        status: 'active',
    },
    {
        id: '3',
        binId: 'BIN003',
        wardNumber: 'W02',
        location: { lat: 13.0104, lng: 80.2356, address: 'Anna University Area' },
        fillLevel: 92,
        wasteType: 'recyclable',
        lastUpdated: new Date(),
        status: 'active',
    },
    {
        id: '7',
        binId: 'BIN007',
        wardNumber: 'W04',
        location: { lat: 13.0850, lng: 80.2100, address: 'Anna Nagar New Colony' },
        fillLevel: 95,
        wasteType: 'mixed',
        lastUpdated: new Date(),
        status: 'active',
    },
];

const ThirdPartyMap = () => {
    const [selectedBin, setSelectedBin] = useState<SmartBin | null>(null);

    const criticalBins = mockBins.filter(b => b.fillLevel >= 90);
    const warningBins = mockBins.filter(b => b.fillLevel >= 70 && b.fillLevel < 90);
    const normalBins = mockBins.filter(b => b.fillLevel < 70);

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">City Waste Map (Partner View)</h1>
                    <p className="text-muted-foreground">Monitoring assigned collection zones</p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="border-border">
                        <CardContent className="pt-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Monitored Bins</p>
                                    <p className="text-2xl font-bold text-foreground">{mockBins.length}</p>
                                </div>
                                <Trash2 className="h-8 w-8 text-primary" />
                            </div>
                        </CardContent>
                    </Card>
                    {/* Simplified stats for 3rd party */}
                </div>

                {/* Map and Details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2 border-border">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-primary" />
                                Zone Locations
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[500px]">
                                <BinMap
                                    bins={mockBins}
                                    onBinClick={setSelectedBin}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-primary">
                                <Trash2 className="h-5 w-5" />
                                Bin Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3 max-h-[460px] overflow-y-auto">
                                {mockBins.map((bin) => (
                                    <div
                                        key={bin.id}
                                        className="p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors"
                                        onClick={() => setSelectedBin(bin)}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-medium text-foreground">#{bin.binId}</span>
                                            <Badge variant={bin.fillLevel > 90 ? "destructive" : "outline"}>
                                                {bin.fillLevel}% Full
                                            </Badge>
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            <p>{bin.location.address}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ThirdPartyMap;
