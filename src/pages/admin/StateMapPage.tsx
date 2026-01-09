import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import OdishaInteractiveMap from '@/components/maps/OdishaInteractiveMap';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

export default function StateMapPage() {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold font-display">State Infrastructure Map</h1>
                    <p className="text-muted-foreground">Detailed view of waste management facilities across all 30 districts.</p>
                </div>

                <Card className="border-border">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-primary" />
                            Odisha District Map
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <OdishaInteractiveMap />
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
