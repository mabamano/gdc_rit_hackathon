
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navigation, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import RouteMap from '@/components/map/RouteMap';

export default function MyRoutePage() {
    // Mock lat/lng for Chennai context
    const routePoints = [
        { id: 1, address: 'Anna Salai, Store', status: 'Pending', time: '09:00 AM', lat: 13.0604, lng: 80.2496 },
        { id: 2, address: 'T. Nagar, Market Lane', status: 'Pending', time: '09:15 AM', lat: 13.0402, lng: 80.2337 },
        { id: 3, address: 'CMBT Bus Stand', status: 'Completed', time: '09:30 AM', lat: 13.0694, lng: 80.2081 },
        { id: 4, address: 'Koyambedu Market', status: 'Completed', time: '09:45 AM', lat: 13.0732, lng: 80.1932 },
        { id: 5, address: 'Vadapalani, Last Stop', status: 'Pending', time: '10:00 AM', lat: 13.0494, lng: 80.2125 },
    ] as const;

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-display font-bold">My Route</h1>
                        <p className="text-muted-foreground">Today's assigned collection path: Chennai West Zone</p>
                    </div>
                    <Button className="gap-2">
                        <Navigation className="w-4 h-4" /> Start Navigation
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Zap className="w-5 h-5 text-green-600" />
                                <div>
                                    <p className="font-semibold text-green-800 text-sm">Smart Route Active</p>
                                    <p className="text-xs text-green-600">Path optimized for fuel efficiency & bin urgency.</p>
                                </div>
                            </div>
                            <Badge variant="outline" className="bg-white text-green-700 border-green-300">
                                Saving 1.2L Fuel
                            </Badge>
                        </div>

                        <Card className="h-[500px] border-2 overflow-hidden">
                            <RouteMap
                                points={[...routePoints]}
                                center={[13.0604, 80.2496]}
                                zoom={13}
                            />
                        </Card>
                    </div>

                    <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Stops (5)</CardTitle>
                                <CardDescription>Estimated completion: 11:30 AM</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                                    {routePoints.map((point) => (
                                        <div key={point.id} className="relative pl-8 flex items-start gap-2">
                                            <div className={`absolute left-0 top-1 w-7 h-7 rounded-full border-2 flex items-center justify-center bg-background z-10 ${point.status === 'Completed' ? 'border-primary text-primary' : 'border-muted-foreground/30 text-muted-foreground'}`}>
                                                <div className={`w-2 h-2 rounded-full ${point.status === 'Completed' ? 'bg-primary' : 'bg-transparent'}`} />
                                            </div>
                                            <div>
                                                <p className="font-medium">{point.address}</p>
                                                <p className="text-sm text-muted-foreground">{point.time}</p>
                                                <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${point.status === 'Completed' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                                    {point.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
