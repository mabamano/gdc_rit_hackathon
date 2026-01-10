
import React, { useState, useMemo, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SmartBin } from '@/types';

// Fix for default marker icons missing in webpack/vite builds
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const center: [number, number] = [13.0827, 80.2707]; // Chennai

// Mock Data for Tamil Nadu Structure
const CORPORATIONS = ['Chennai', 'Coimbatore', 'Madurai', 'Trichy', 'Salem'];
const ZONES = ['Zone 1', 'Zone 2', 'Zone 3', 'Zone 4', 'Zone 5'];
const WARDS = Array.from({ length: 15 }, (_, i) => `Ward ${i + 1}`);

// Mock Bins Generation
const generateMockBins = (count: number, baseLat: number, baseLng: number): SmartBin[] => {
    return Array.from({ length: count }).map((_, i) => ({
        id: `bin-${i}`,
        binId: `TN-BIN-${1000 + i}`,
        wardNumber: 'Ward ' + (i % 15 + 1),
        location: {
            lat: baseLat + (Math.random() - 0.5) * 0.05,
            lng: baseLng + (Math.random() - 0.5) * 0.05,
            address: `Street ${i}, Chennai`
        },
        fillLevel: Math.floor(Math.random() * 100),
        wasteType: Math.random() > 0.5 ? 'organic' : 'mixed',
        lastUpdated: new Date(),
        status: 'active'
    }));
};

const WasteHeatmapLeaflet = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);
    const markerLayerRef = useRef<L.LayerGroup | null>(null);

    const [selectedCorp, setSelectedCorp] = useState(CORPORATIONS[0]);
    const [selectedZone, setSelectedZone] = useState(ZONES[0]);
    const [selectedWard, setSelectedWard] = useState<string>('All');

    // Mock data for the heatmap
    const bins = useMemo(() => generateMockBins(50, center[0], center[1]), []);

    const filteredBins = useMemo(() => {
        if (selectedWard === 'All') return bins;
        return bins.filter(b => b.wardNumber === selectedWard);
    }, [bins, selectedWard]);

    const getBinColor = (level: number) => {
        if (level > 90) return '#EF4444'; // Red - Critical
        if (level > 70) return '#F97316'; // Orange - High
        if (level > 50) return '#EAB308'; // Yellow - Medium
        return '#22C55E'; // Green - Low
    };

    // Initialize Map
    useEffect(() => {
        if (!mapContainerRef.current || mapInstanceRef.current) return;

        mapInstanceRef.current = L.map(mapContainerRef.current).setView(center, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstanceRef.current);

        markerLayerRef.current = L.layerGroup().addTo(mapInstanceRef.current);

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    // Update Markers
    useEffect(() => {
        if (!markerLayerRef.current) return;

        markerLayerRef.current.clearLayers();

        filteredBins.forEach(bin => {
            const circle = L.circle([bin.location.lat, bin.location.lng], {
                radius: 150,
                color: getBinColor(bin.fillLevel),
                fillColor: getBinColor(bin.fillLevel),
                fillOpacity: 0.4,
                weight: 2
            });

            const popupContent = `
                <div style="font-family: sans-serif; min-width: 120px;">
                    <p style="margin: 0; font-weight: bold;">Bin: ${bin.binId}</p>
                    <p style="margin: 3px 0; font-size: 13px; color: ${getBinColor(bin.fillLevel)}">${bin.fillLevel}% Full</p>
                    <p style="margin: 0; font-size: 11px; color: #666;">${bin.location.address}</p>
                </div>
            `;

            circle.bindPopup(popupContent);
            circle.addTo(markerLayerRef.current!);
        });
    }, [filteredBins]);

    return (
        <Card className="w-full shadow-lg border-t-4 border-t-primary h-full flex flex-col">
            <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center flex-wrap gap-4 text-lg font-bold text-primary">
                    <span>Ward-Level Waste Heatmap</span>
                    <div className="flex gap-2">
                        <select
                            className="p-1 px-2 border rounded-md text-xs bg-background"
                            value={selectedCorp}
                            onChange={(e) => setSelectedCorp(e.target.value)}
                        >
                            {CORPORATIONS.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <select
                            className="p-1 px-2 border rounded-md text-xs bg-background"
                            value={selectedZone}
                            onChange={(e) => setSelectedZone(e.target.value)}
                        >
                            {ZONES.map(z => <option key={z} value={z}>{z}</option>)}
                        </select>
                        <select
                            className="p-1 px-2 border rounded-md text-xs bg-background"
                            value={selectedWard}
                            onChange={(e) => setSelectedWard(e.target.value)}
                        >
                            <option value="All">All Wards</option>
                            {WARDS.map(w => <option key={w} value={w}>{w}</option>)}
                        </select>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0 relative min-h-[400px]">
                <div ref={mapContainerRef} className="absolute inset-0 z-0 h-full w-full rounded-b-xl" />

                {/* Legend Overlay */}
                <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm border border-border rounded-lg p-2 z-[1000] shadow-md pointer-events-none">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[10px] font-bold">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E]"></div>
                            <span>Low (&lt;50%)</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#EAB308]"></div>
                            <span>Medium (50-70%)</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#F97316]"></div>
                            <span>High (70-90%)</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></div>
                            <span>Critical (&gt;90%)</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default WasteHeatmapLeaflet;
