
import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Truck, Battery, Signal, PauseCircle, PlayCircle } from 'lucide-react';

interface Collector {
    id: string;
    name: string;
    zone: string;
    status: 'On Duty' | 'On Break' | 'Offline';
    battery: number;
    location: string;
    vehicleId: string;
}

export default function CollectorsPage() {
    const [collectors, setCollectors] = useState<Collector[]>([
        { id: 'COL001', name: 'Rajesh Kumar', zone: 'Zone A', status: 'On Duty', battery: 85, location: 'Ward 4, Main St', vehicleId: 'OR-02-B-1122' },
        { id: 'COL002', name: 'Sunil Sethi', zone: 'Zone B', status: 'On Duty', battery: 60, location: 'Ward 2, Market', vehicleId: 'OR-02-B-3344' },
        { id: 'COL003', name: 'Amit Patra', zone: 'Zone C', status: 'On Break', battery: 92, location: 'Depot 1', vehicleId: 'OR-02-B-5566' },
        { id: 'COL004', name: 'B. Nayak', zone: 'Zone A', status: 'Offline', battery: 0, location: '-', vehicleId: 'OR-02-B-7788' },
        { id: 'COL005', name: 'P. Pradhan', zone: 'Zone D', status: 'On Duty', battery: 34, location: 'Ward 8, School Rd', vehicleId: 'OR-02-B-9900' },
    ]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'On Duty': return 'bg-green-500';
            case 'On Break': return 'bg-yellow-500';
            default: return 'bg-gray-300';
        }
    };

    const getBatteryColor = (level: number) => {
        if (level > 50) return 'text-green-600';
        if (level > 20) return 'text-yellow-600';
        return 'text-red-600';
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-display font-bold">Waste Collectors</h1>
                        <p className="text-muted-foreground">Track real-time location and status of field staff</p>
                    </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-card border rounded-lg p-4 shadow-sm">
                        <div className="text-muted-foreground text-xs uppercase font-medium">Active Staff</div>
                        <div className="text-2xl font-bold mt-1 text-green-600">{collectors.filter(c => c.status === 'On Duty').length}</div>
                    </div>
                    <div className="bg-card border rounded-lg p-4 shadow-sm">
                        <div className="text-muted-foreground text-xs uppercase font-medium">On Break</div>
                        <div className="text-2xl font-bold mt-1 text-yellow-600">{collectors.filter(c => c.status === 'On Break').length}</div>
                    </div>
                    <div className="bg-card border rounded-lg p-4 shadow-sm">
                        <div className="text-muted-foreground text-xs uppercase font-medium">Offline</div>
                        <div className="text-2xl font-bold mt-1 text-gray-400">{collectors.filter(c => c.status === 'Offline').length}</div>
                    </div>
                    <div className="bg-card border rounded-lg p-4 shadow-sm">
                        <div className="text-muted-foreground text-xs uppercase font-medium">Total Fleet</div>
                        <div className="text-2xl font-bold mt-1">{collectors.length}</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {collectors.map(collector => (
                        <Card key={collector.id} className="relative overflow-hidden group hover:shadow-md transition-all">
                            <div className={`absolute top-0 left-0 w-1 h-full ${getStatusColor(collector.status)}`} />

                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    {collector.name}
                                </CardTitle>
                                <Badge variant={collector.status === 'On Duty' ? 'default' : 'secondary'} className={getStatusColor(collector.status) + ' text-white border-none'}>
                                    {collector.status}
                                </Badge>
                            </CardHeader>

                            <CardContent>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div className="text-muted-foreground">ID</div>
                                        <div className="font-medium text-right">{collector.id}</div>

                                        <div className="text-muted-foreground">Zone</div>
                                        <div className="font-medium text-right">{collector.zone}</div>
                                    </div>

                                    <div className="space-y-2 pt-2 border-t">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <MapPin className="w-4 h-4" /> Location
                                            </div>
                                            <span className="truncate max-w-[150px]">{collector.location}</span>
                                        </div>

                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Truck className="w-4 h-4" /> Vehicle
                                            </div>
                                            <span>{collector.vehicleId}</span>
                                        </div>

                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Battery className="w-4 h-4" /> Battery
                                            </div>
                                            <span className={`font-medium ${getBatteryColor(collector.battery)}`}>{collector.battery}%</span>
                                        </div>
                                    </div>

                                    <div className="pt-2 flex gap-2">
                                        <Button size="sm" variant="outline" className="w-full gap-2 hover:bg-primary/5 hover:text-primary hover:border-primary/30">
                                            <Phone className="w-4 h-4" /> Call
                                        </Button>
                                        <Button size="sm" className="w-full gap-2">
                                            <Signal className="w-4 h-4" /> Track
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
