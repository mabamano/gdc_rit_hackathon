import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import BinMap from '@/components/map/BinMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SmartBin } from '@/types';
import { MapPin, Trash2, AlertTriangle, CheckCircle } from 'lucide-react';

// Mock bin data for Chennai, Tamil Nadu
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
    id: '4',
    binId: 'BIN004',
    wardNumber: 'W02',
    location: { lat: 13.0827, lng: 80.2755, address: 'Chennai Central Station' },
    fillLevel: 30,
    wasteType: 'mixed',
    lastUpdated: new Date(),
    status: 'active',
  },
  {
    id: '5',
    binId: 'BIN005',
    wardNumber: 'W03',
    location: { lat: 13.0012, lng: 80.2565, address: 'Adyar River View' },
    fillLevel: 72,
    wasteType: 'organic',
    lastUpdated: new Date(),
    status: 'active',
  },
  {
    id: '6',
    binId: 'BIN006',
    wardNumber: 'W03',
    location: { lat: 13.0336, lng: 80.2698, address: 'Mylapore Temple Street' },
    fillLevel: 15,
    wasteType: 'hazardous',
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
  {
    id: '8',
    binId: 'BIN008',
    wardNumber: 'W05',
    location: { lat: 13.0163, lng: 80.2155, address: 'Guindy Industrial Estate' },
    fillLevel: 55,
    wasteType: 'recyclable',
    lastUpdated: new Date(),
    status: 'active',
  },
];

const BinMapPage = () => {
  const [selectedBin, setSelectedBin] = useState<SmartBin | null>(null);

  const criticalBins = mockBins.filter(b => b.fillLevel >= 90);
  const warningBins = mockBins.filter(b => b.fillLevel >= 70 && b.fillLevel < 90);
  const normalBins = mockBins.filter(b => b.fillLevel < 70);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Live Bin Map</h1>
          <p className="text-muted-foreground">Real-time bin status across Chennai</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Bins</p>
                  <p className="text-2xl font-bold text-foreground">{mockBins.length}</p>
                </div>
                <Trash2 className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Critical</p>
                  <p className="text-2xl font-bold text-destructive">{criticalBins.length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Warning</p>
                  <p className="text-2xl font-bold text-amber-500">{warningBins.length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Normal</p>
                  <p className="text-2xl font-bold text-green-500">{normalBins.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map and Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map */}
          <Card className="lg:col-span-2 border-border">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Bin Locations
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

          {/* Critical Bins List */}
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                Bins Needing Attention
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[460px] overflow-y-auto">
                {[...criticalBins, ...warningBins].map((bin) => (
                  <div
                    key={bin.id}
                    className="p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => setSelectedBin(bin)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">#{bin.binId}</span>
                      <Badge
                        variant={bin.fillLevel >= 90 ? 'destructive' : 'secondary'}
                        className={bin.fillLevel >= 70 && bin.fillLevel < 90 ? 'bg-amber-500 text-white' : ''}
                      >
                        {bin.fillLevel}%
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>{bin.location.address}</p>
                      <p className="text-xs mt-1">Ward: {bin.wardNumber}</p>
                    </div>
                  </div>
                ))}

                {criticalBins.length === 0 && warningBins.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-500" />
                    <p>All bins are at normal levels!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BinMapPage;
