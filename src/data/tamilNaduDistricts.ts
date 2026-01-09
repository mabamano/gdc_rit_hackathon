export interface DistrictInfo {
    districtName: string;
    sources: string[];
    coordinates: {
        lat: number;
        lng: number;
    };
}

export const districtData: Record<string, DistrictInfo> = {
    "chennai": {
        "districtName": "Chennai",
        "sources": [
            "Kodungaiyur Dump Yard",
            "Perungudi Dump Yard",
            "Chennai Bio-Methanation Plant",
            "Manali Recycling Hub"
        ],
        "coordinates": { "lat": 13.0827, "lng": 80.2707 }
    },
    "coimbatore": {
        "districtName": "Coimbatore",
        "sources": [
            "Vellalore Waste Processing Plant",
            "Ukadam Sewage Treatment Plant",
            "Kurichi E-Waste Collection Center"
        ],
        "coordinates": { "lat": 11.0168, "lng": 76.9558 }
    },
    "madurai": {
        "districtName": "Madurai",
        "sources": [
            "Vellaikal Compost Yard",
            "Avaniapuram Recycling Unit",
            "Kochadai Plastic Management"
        ],
        "coordinates": { "lat": 9.9252, "lng": 78.1198 }
    },
    "tiruchirappalli": {
        "districtName": "Tiruchirappalli",
        "sources": [
            "Ariyamangalam Garbage Dump",
            "Srirangam Micro Composting Center",
            "Golden Rock Waste Recovery"
        ],
        "coordinates": { "lat": 10.7905, "lng": 78.7047 }
    },
    "salem": {
        "districtName": "Salem",
        "sources": [
            "Chettichavadi Dump Yard",
            "Suramangalam Waste Plant"
        ],
        "coordinates": { "lat": 11.6643, "lng": 78.1460 }
    },
    "tirunelveli": {
        "districtName": "Tirunelveli",
        "sources": [
            "Ramayanpatti Compost Yard",
            "Palayamkottai Waste Unit"
        ],
        "coordinates": { "lat": 8.7139, "lng": 77.7567 }
    },
    "erode": {
        "districtName": "Erode",
        "sources": [
            "Vendipalayam Compost Yard",
            "Cauvery River Bank Cleaning Unit"
        ],
        "coordinates": { "lat": 11.3410, "lng": 77.7172 }
    },
    // Default fallback
    "default": {
        "districtName": "District",
        "sources": [
            "Local Municipal Collection Center",
            "District MRF Unit",
            "Composting Pit - Block A"
        ],
        "coordinates": { "lat": 11.1271, "lng": 78.6569 }
    }
};

// Helper to get data safely
export const getDistrictData = (name: string): DistrictInfo => {
    const key = name.toLowerCase().replace(/ /g, '');
    return districtData[key] || {
        ...districtData['default'],
        districtName: name
    };
};
