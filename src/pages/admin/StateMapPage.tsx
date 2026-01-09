import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import TamilNaduInteractiveMap from '@/components/maps/TamilNaduInteractiveMap';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

export default function StateMapPage() {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold font-display">State Infrastructure Map</h1>
                    <p className="text-muted-foreground">Detailed view of waste management facilities across all districts of Tamil Nadu.</p>
                </div>

                <Card className="border-border">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-primary" />
                            Tamil Nadu District Map
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <TamilNaduInteractiveMap />
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
