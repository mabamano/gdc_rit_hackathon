export interface DistrictInfo {
    districtName: string;
    sources: string[];
}

export const districtData: Record<string, DistrictInfo> = {
    "khordha": {
        "districtName": "Khordha",
        "sources": [
            "Bhubaneswar Municipal Solid Waste Plant",
            "MRF Unit – Dumduma",
            "Composting Center – Sainik School Area",
            "Chandaka Recycling Facility",
            "Jatni Bio-Gas Plant"
        ]
    },
    "ganjam": {
        "districtName": "Ganjam",
        "sources": [
            "Berhampur Waste Processing Plant",
            "MRF Unit – Gopalpur",
            "Vermi Compost Unit – Chhatrapur",
            "Hinjilicut E-Waste Collection Center"
        ]
    },
    "cuttack": {
        "districtName": "Cuttack",
        "sources": [
            "Sati Chaura Composting Unit",
            "CDA Sector 7 MRF",
            "Plastic Waste Management Unit – Choudwar"
        ]
    },
    "puri": {
        "districtName": "Puri",
        "sources": [
            "Konark Waste to Energy Plant",
            "Puri Sea Beach Cleaning Unit",
            "Smart Compost Hub – Gop"
        ]
    },
    "sundargarh": {
        "districtName": "Sundargarh",
        "sources": [
            "Rourkela Steel City Waste Plant",
            "Rajgangpur Industrial Waste Unit"
        ]
    },
    "balasore": {
        "districtName": "Balasore",
        "sources": [
            "Balasore Municipal Dump Yard",
            "Plastic Recycling Hub – Remuna"
        ]
    },
    "sambalpur": {
        "districtName": "Sambalpur",
        "sources": [
            "Hirakud Industrial Waste Treatment",
            "City Compost Center – Burla"
        ]
    },
    // Default fallback for others to ensure the UI works for all 30
    "default": {
        "districtName": "District",
        "sources": [
            "Local Municipal Collection Center",
            "District MRF Unit",
            "Composting Pit - Block A"
        ]
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
