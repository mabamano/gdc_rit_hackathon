
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
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

interface BinMapProps {
  bins: SmartBin[];
  center?: [number, number];
  zoom?: number;
  onBinClick?: (bin: SmartBin) => void;
}

const getFillColor = (fillLevel: number): string => {
  if (fillLevel >= 90) return '#dc2626'; // red
  if (fillLevel >= 70) return '#f59e0b'; // amber
  if (fillLevel >= 50) return '#eab308'; // yellow
  return '#22c55e'; // green
};

const BinMap: React.FC<BinMapProps> = ({
  bins,
  center = [19.0816, 83.8198], // Gunupur default
  zoom = 14,
  onBinClick
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapContainerRef.current).setView(center, zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstanceRef.current);
    } else {
      // If center changes, update view
      mapInstanceRef.current.setView(center, zoom);
    }

    // Cleanup not strictly necessary for single page mounting but good practice
    // Keeping it simple to avoid strict mode double-mount issues causing blank maps
    // We will just let it persist until unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []); // Run on mount (and we handle updates separately)

  // Handle prop updates (center/zoom)
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(center, zoom);
    }
  }, [center, zoom]);

  // Update markers
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Create a LayerGroup if not exists, or verify how we manage markers
    // Simplest approach: remove all markers and re-add.
    // L.layerGroup is useful here.

    // We'll attach a custom property to map to hold our marker layer so we can clear it
    // @ts-ignore
    if (!map._markerLayer) {
      // @ts-ignore
      map._markerLayer = L.layerGroup().addTo(map);
    }
    // @ts-ignore
    const markerLayer = map._markerLayer as L.LayerGroup;
    markerLayer.clearLayers();

    bins.forEach(bin => {
      const circle = L.circleMarker([bin.location.lat, bin.location.lng], {
        radius: 10,
        fillColor: getFillColor(bin.fillLevel),
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      });

      const popupContent = `
            <div style="font-family: sans-serif; min-width: 150px;">
                <h3 style="font-weight: bold; margin-bottom: 5px;">Bin #${bin.binId}</h3>
                <p style="margin: 0; font-size: 13px;">${bin.location.address}</p>
                <p style="margin: 5px 0 0 0; font-weight: bold; color: ${getFillColor(bin.fillLevel)}">
                    ${bin.fillLevel}% Full
                </p>
            </div>
        `;

      circle.bindPopup(popupContent);
      circle.on('click', () => onBinClick?.(bin));
      circle.addTo(markerLayer);
    });
  }, [bins, onBinClick]);

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden border border-border z-0">
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%', background: '#f0f0f0' }} />

      {/* Legend Overlay */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg p-3 z-[1000] shadow-xl">
        <div className="text-xs font-bold text-gray-800 mb-2">Fill Level</div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-[#22c55e]"></div>
            <span className="text-gray-600">Good (&lt;50%)</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-[#eab308]"></div>
            <span className="text-gray-600">Moderate (50-70%)</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-[#f59e0b]"></div>
            <span className="text-gray-600">Warning (70-90%)</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-[#dc2626]"></div>
            <span className="text-gray-600">Critical (&gt;90%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinMap;
