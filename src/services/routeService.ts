import { SmartBin } from "@/types";

export const RouteService = {
    // Simulate route optimization for collectors
    calculateOptimalRoute: (bins: SmartBin[], startLocation: { lat: number; lng: number }): SmartBin[] => {
        // Simple logic:
        // 1. Filter bins that are active and need collection (>50% full or organic)
        // 2. Sort by fill level (highest first) -> heuristic for "urgency"
        // 3. (Optional) Simple nearest neighbor could be added here, but fill level is priority for "Smart" management.

        const priorityBins = bins.filter(b => b.status === 'active' && b.fillLevel > 50);

        // Sort by fill level descending
        return priorityBins.sort((a, b) => b.fillLevel - a.fillLevel);
    },

    checkCriticalAlerts: (bins: SmartBin[]): SmartBin[] => {
        return bins.filter(b => b.fillLevel >= 90);
    },

    // Simulate checking fuel efficiency
    estimateFuelSavings: (originalRouteLength: number, optimizedRouteLength: number) => {
        const fuelPrice = 102; // Approx price in TN
        const mileage = 15; // km/l
        const savingsKm = originalRouteLength - optimizedRouteLength;
        const fuelSaved = savingsKm / mileage;
        return {
            liters: Math.max(0, fuelSaved).toFixed(2),
            cost: Math.max(0, fuelSaved * fuelPrice).toFixed(2)
        };
    }
};
