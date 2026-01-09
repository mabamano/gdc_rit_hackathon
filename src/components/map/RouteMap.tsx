
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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

interface RoutePoint {
    id: number;
    lat: number;
    lng: number;
    address: string;
    status: 'Pending' | 'Completed';
    time?: string;
}

interface RouteMapProps {
    points: RoutePoint[];
    center?: [number, number];
    zoom?: number;
}

const RouteMap: React.FC<RouteMapProps> = ({
    points,
    center = [13.0827, 80.2707], // Chennai
    zoom = 14
}) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);

    useEffect(() => {
        if (!mapContainerRef.current) return;

        // Initialize map
        if (!mapInstanceRef.current) {
            mapInstanceRef.current = L.map(mapContainerRef.current).setView(center, zoom);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapInstanceRef.current);
        }

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (!mapInstanceRef.current) return;
        const map = mapInstanceRef.current;
        const layerGroup = L.layerGroup().addTo(map);

        // Draw Polyline
        const latlngs = points.map(p => [p.lat, p.lng] as [number, number]);
        L.polyline(latlngs, {
            color: '#2563eb',
            weight: 4,
            opacity: 0.7,
            dashArray: '10, 10'
        }).addTo(layerGroup);

        // Draw Markers
        points.forEach(point => {
            const circle = L.circleMarker([point.lat, point.lng], {
                radius: 8,
                fillColor: point.status === 'Completed' ? '#22c55e' : '#f59e0b',
                color: '#fff',
                weight: 2,
                opacity: 1,
                fillOpacity: 1
            });

            const popupContent = `
                <div style="font-family: sans-serif; padding: 4px;">
                    <div style="font-weight: 600; margin-bottom: 4px;">${point.address}</div>
                    <div style="font-size: 12px; color: ${point.status === 'Completed' ? '#16a34a' : '#d97706'}">
                        Status: ${point.status}
                    </div>
                </div>
            `;

            circle.bindPopup(popupContent);
            circle.addTo(layerGroup);
        });

        return () => {
            layerGroup.clearLayers();
        };
    }, [points]);


    return (
        <div className="relative w-full h-[500px] rounded-lg overflow-hidden border border-border z-0">
            <div ref={mapContainerRef} style={{ width: '100%', height: '100%', background: '#f0f0f0' }} />

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg p-3 z-[1000] shadow-xl">
                <div className="text-xs font-bold text-gray-800 mb-2">Legend</div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500 border border-white"></div>
                        <span className="text-xs text-gray-600">Completed Stop</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-amber-500 border border-white"></div>
                        <span className="text-xs text-gray-600">Pending Stop</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-0.5 bg-blue-600 border-t border-dashed"></div>
                        <span className="text-xs text-gray-600">Route Path</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RouteMap;
