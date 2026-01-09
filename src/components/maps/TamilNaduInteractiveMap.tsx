
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { districtData } from '@/data/tamilNaduDistricts';

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

export default function TamilNaduInteractiveMap() {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);

    useEffect(() => {
        if (!mapContainerRef.current) return;

        if (!mapInstanceRef.current) {
            // Center roughly on Tamil Nadu
            mapInstanceRef.current = L.map(mapContainerRef.current).setView([11.1271, 78.6569], 7);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapInstanceRef.current);

            // Add markers for each district
            Object.values(districtData).forEach(district => {
                if (district.districtName === 'District') return; // Skip default

                const { lat, lng } = district.coordinates;
                const marker = L.marker([lat, lng])
                    .addTo(mapInstanceRef.current!)
                    .bindPopup(`
                        <div class="font-sans">
                            <h3 class="font-bold text-lg mb-1">${district.districtName}</h3>
                            <p class="text-sm font-semibold mb-1">Key Facilities:</p>
                            <ul class="list-disc pl-4 text-xs">
                                ${district.sources.map(s => `<li>${s}</li>`).join('')}
                            </ul>
                        </div>
                    `);
            });

        }

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    return (
        <div className="relative w-full h-[600px] rounded-xl overflow-hidden border border-border shadow-xl z-0">
            <div ref={mapContainerRef} style={{ width: '100%', height: '100%', background: '#f0f0f0' }} />
        </div>
    );
}
