export type UserRole = 'household' | 'collector' | 'officer' | 'third_party' | 'state_admin' | 'municipal_admin' | 'sanitation_dept' | 'logistics_dept' | 'recycling_dept';

export type OfficerRole = 'admin' | 'ward_officer' | 'supervisor';

export type WasteType = 'organic' | 'recyclable' | 'hazardous';

export interface HouseholdUser {
  id: string;
  wardNumber: string;
  streetNumber: string;
  houseNumber: string;
  pin: string;
  aadharNumber?: string;
  ebNumber?: string;
  name?: string;
  phone?: string;
  rewardPoints: number;
  createdAt: Date;
}

export interface Collector {
  id: string;
  collectorId: string;
  name: string;
  assignedWard: string;
  phone: string;
  password?: string;
  employeeId?: string; // Improvised
  createdAt: Date;
}

export interface Officer {
  id: string;
  officerId: string;
  name: string;
  role: OfficerRole;
  assignedWards: string[];
  govtId?: string; // Improvised
  department?: string; // Improvised
  createdAt: Date;
}

export interface ThirdPartyUser {
  id: string;
  partnerId: string;
  name: string;
  role: 'third_party';
  email: string;
  gstNumber?: string;
  createdAt: Date;
}

export interface StateAdmin {
  id: string;
  adminId: string;
  name: string;
  role: 'state_admin';
  state: string; // e.g. "Odisha"
  email: string;
  createdAt: Date;
}

export interface MunicipalAdmin {
  id: string;
  adminId: string;
  name: string;
  role: 'municipal_admin';
  municipality: string; // e.g. "Bhubaneswar"
  email: string;
  createdAt: Date;
}

export interface DepartmentUser {
  id: string;
  employeeId: string;
  name: string;
  role: 'sanitation_dept' | 'logistics_dept' | 'recycling_dept';
  departmentName: string;
  email: string;
  createdAt: Date;
}

export interface WasteLog {
  id: string;
  houseId: string;
  wasteType: WasteType;
  weight: number;
  timestamp: Date;
  fillLevel: number;
  mlConfidence: number;
  imageUrl?: string;
}

export interface Pickup {
  id: string;
  houseId: string;
  collectorId: string;
  timestamp: Date;
  status: 'scheduled' | 'completed' | 'missed';
}

export interface Violation {
  id: string;
  houseId: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: Date;
  resolved: boolean;
}

export interface Reward {
  id: string;
  houseId: string;
  points: number;
  month: string;
  taxIncentive: number;
}

export interface IoTLog {
  id: string;
  houseId: string;
  wasteType: WasteType;
  weight: number;
  fillLevel: number;
  timestamp: Date;
  mlConfidence: number;
  imageUrl?: string;
}

export interface BinStatus {
  houseId: string;
  fillLevel: number;
  lastUpdated: Date;
  status: 'empty' | 'partial' | 'full' | 'overflow';
}

export interface WardStats {
  wardNumber: string;
  totalWaste: number;
  organicPercentage: number;
  recyclablePercentage: number;
  hazardousPercentage: number;
  segregationScore: number;
  householdsCompliant: number;
  totalHouseholds: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: Date;
  read: boolean;
}

export interface SmartBin {
  id: string;
  binId: string;
  wardNumber: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  fillLevel: number;
  wasteType: WasteType | 'mixed';
  lastUpdated: Date;
  status: 'active' | 'inactive' | 'maintenance';
}
