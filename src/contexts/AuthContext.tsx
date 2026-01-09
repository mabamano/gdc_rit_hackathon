import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { UserRole, HouseholdUser, Collector, Officer, ThirdPartyUser, StateAdmin, MunicipalAdmin, DepartmentUser } from '@/types';

interface AuthState {
  isAuthenticated: boolean;
  role: UserRole | null;
  user: HouseholdUser | Collector | Officer | ThirdPartyUser | StateAdmin | MunicipalAdmin | DepartmentUser | null;
}

interface AuthContextType extends AuthState {
  loginHousehold: (wardNumber: string, streetNumber: string, houseNumber: string, pin: string) => Promise<boolean>;
  loginCollector: (collectorId: string, password: string) => Promise<boolean>;
  loginOfficer: (officerId: string, password: string) => Promise<boolean>;
  loginThirdParty: (partnerId: string, password: string) => Promise<boolean>;
  loginStateAdmin: (adminId: string, password: string) => Promise<boolean>;
  loginMunicipalAdmin: (adminId: string, password: string) => Promise<boolean>;
  loginDeptUser: (employeeId: string, password: string) => Promise<boolean>;
  registerHousehold: (data: Partial<HouseholdUser>) => Promise<boolean>;
  registerCollector: (data: Partial<Collector>) => Promise<boolean>;
  registerOfficer: (data: Partial<Officer>) => Promise<boolean>;
  registerThirdParty: (data: Partial<ThirdPartyUser> & { password: string }) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for demo purposes
const mockHouseholds: Record<string, HouseholdUser> = {
  'W01-S01-H001': {
    id: 'h1',
    wardNumber: 'W01',
    streetNumber: 'S01',
    houseNumber: 'H001',
    pin: '1234',
    rewardPoints: 450,
    createdAt: new Date(),
  },
  'W02-S03-H015': {
    id: 'h2',
    wardNumber: 'W02',
    streetNumber: 'S03',
    houseNumber: 'H015',
    pin: '5678',
    rewardPoints: 320,
    createdAt: new Date(),
  },
};

const mockCollectors: Record<string, Collector & { password: string }> = {
  'COL001': {
    id: 'c1',
    collectorId: 'COL001',
    name: 'Ramesh Kumar',
    assignedWard: 'W01',
    phone: '9876543210',
    password: 'collector123',
    createdAt: new Date(),
  },
  'COL002': {
    id: 'c2',
    collectorId: 'COL002',
    name: 'Suresh Patel',
    assignedWard: 'W02',
    phone: '9876543211',
    password: 'collector123',
    createdAt: new Date(),
  },
};

const mockOfficers: Record<string, Officer & { password: string }> = {
  'OFF001': {
    id: 'o1',
    officerId: 'OFF001',
    name: 'Dr. Priya Sharma',
    role: 'admin',
    assignedWards: ['W01', 'W02', 'W03', 'W04', 'W05'],
    password: 'admin123',
    createdAt: new Date(),
  },
  'OFF002': {
    id: 'o2',
    officerId: 'OFF002',
    name: 'Anil Mohapatra',
    role: 'ward_officer',
    assignedWards: ['W01', 'W02'],
    password: 'officer123',
    createdAt: new Date(),
  },
};

const mockPartners: Record<string, ThirdPartyUser & { password: string }> = {
  'PARTNER1': {
    id: 'tp1',
    partnerId: 'PARTNER1',
    name: 'CleanCity Partners Ltd.',
    role: 'third_party',
    email: 'admin@cleancity.com',
    password: 'password',
    createdAt: new Date(),
  },
};

const mockStateAdmins: Record<string, StateAdmin & { password: string }> = {
  'TN01': {
    id: 'sa1',
    adminId: 'TN01',
    name: 'Rajesh Verma',
    role: 'state_admin',
    state: 'Tamil Nadu',
    email: 'cm_office@tn.gov.in',
    password: 'admin',
    createdAt: new Date(),
  },
};

const mockMunicipalAdmins: Record<string, MunicipalAdmin & { password: string }> = {
  'MUN001': {
    id: 'ma1',
    adminId: 'MUN001',
    name: 'Sunita Das',
    role: 'municipal_admin',
    municipality: 'Chennai',
    email: 'admin@chennaicorporation.gov.in',
    password: 'admin',
    createdAt: new Date(),
  },
};

const mockDeptUsers: Record<string, DepartmentUser & { password: string }> = {
  'SAN001': {
    id: 'd1',
    employeeId: 'SAN001',
    name: 'Sanitation Chief',
    role: 'sanitation_dept',
    departmentName: 'Sanitation',
    email: 'head@sanitation.com',
    password: 'admin',
    createdAt: new Date(),
  },
  'LOG001': {
    id: 'd2',
    employeeId: 'LOG001',
    name: 'Logistics Head',
    role: 'logistics_dept',
    departmentName: 'Logistics',
    email: 'head@logistics.com',
    password: 'admin',
    createdAt: new Date(),
  },
  'REC001': {
    id: 'd3',
    employeeId: 'REC001',
    name: 'Recycling Officer',
    role: 'recycling_dept',
    departmentName: 'Recycling',
    email: 'head@recycling.com',
    password: 'admin',
    createdAt: new Date(),
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    role: null,
    user: null,
  });

  const loginHousehold = useCallback(async (
    wardNumber: string,
    streetNumber: string,
    houseNumber: string,
    pin: string
  ): Promise<boolean> => {
    const key = `${wardNumber}-${streetNumber}-${houseNumber}`;
    const household = mockHouseholds[key];

    if (household && household.pin === pin) {
      setAuthState({
        isAuthenticated: true,
        role: 'household',
        user: household,
      });
      return true;
    }
    return false;
  }, []);

  const loginCollector = useCallback(async (
    collectorId: string,
    password: string
  ): Promise<boolean> => {
    const collector = mockCollectors[collectorId];

    if (collector && collector.password === password) {
      const { password: _, ...collectorData } = collector;
      setAuthState({
        isAuthenticated: true,
        role: 'collector',
        user: collectorData,
      });
      return true;
    }
    return false;
  }, []);

  const loginOfficer = useCallback(async (
    officerId: string,
    password: string
  ): Promise<boolean> => {
    const officer = mockOfficers[officerId];

    if (officer && officer.password === password) {
      const { password: _, ...officerData } = officer;
      setAuthState({
        isAuthenticated: true,
        role: 'officer',
        user: officerData,
      });
      return true;
    }
    return false;
  }, []);

  const loginThirdParty = useCallback(async (
    partnerId: string,
    password: string
  ): Promise<boolean> => {
    const partner = mockPartners[partnerId];

    if (partner) {
      const { password: _, ...partnerData } = partner;
      setAuthState({
        isAuthenticated: true,
        role: 'third_party',
        user: partnerData,
      });
      return true;
    }

    // Fallback/Demo logic
    if (partnerId.length > 3) {
      setAuthState({
        isAuthenticated: true,
        role: 'third_party',
        user: {
          id: 'tp_demo',
          partnerId: partnerId,
          name: 'Demo Partner Entity',
          role: 'third_party',
          email: 'demo@partner.com',
          createdAt: new Date()
        },
      });
      return true;
    }

    return false;
  }, []);

  const loginStateAdmin = useCallback(async (
    adminId: string,
    password: string
  ): Promise<boolean> => {
    const admin = mockStateAdmins[adminId];
    if (admin && admin.password === password) {
      const { password: _, ...adminData } = admin;
      setAuthState({
        isAuthenticated: true,
        role: 'state_admin',
        user: adminData,
      });
      return true;
    }
    return false;
  }, []);

  const loginMunicipalAdmin = useCallback(async (
    adminId: string,
    password: string
  ): Promise<boolean> => {
    const admin = mockMunicipalAdmins[adminId];
    if (admin && admin.password === password) {
      const { password: _, ...adminData } = admin;
      setAuthState({
        isAuthenticated: true,
        role: 'municipal_admin',
        user: adminData,
      });
      return true;
    }
    return false;
  }, []);

  const loginDeptUser = useCallback(async (
    employeeId: string,
    password: string
  ): Promise<boolean> => {
    const user = mockDeptUsers[employeeId];
    if (user && user.password === password) {
      const { password: _, ...userData } = user;
      setAuthState({
        isAuthenticated: true,
        role: user.role,
        user: userData,
      });
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setAuthState({
      isAuthenticated: false,
      role: null,
      user: null,
    });
  }, []);

  const registerHousehold = useCallback(async (data: Partial<HouseholdUser>): Promise<boolean> => {
    const key = `${data.wardNumber}-${data.streetNumber}-${data.houseNumber}`;
    // In a real app, validation and API call here
    // Mock registration
    const newUser: HouseholdUser = {
      id: `h_new_${Date.now()}`,
      wardNumber: data.wardNumber || '',
      streetNumber: data.streetNumber || '',
      houseNumber: data.houseNumber || '',
      pin: data.pin || '',
      aadharNumber: data.aadharNumber,
      ebNumber: data.ebNumber,
      name: data.name,
      phone: data.phone,
      rewardPoints: 0,
      createdAt: new Date(),
    };

    // Update mock (in memory only)
    mockHouseholds[key] = newUser;

    setAuthState({
      isAuthenticated: true,
      role: 'household',
      user: newUser,
    });
    return true;
  }, []);

  const registerCollector = useCallback(async (data: Partial<Collector>): Promise<boolean> => {
    // Mock registration
    const newUser: Collector = {
      id: `c_new_${Date.now()}`,
      collectorId: data.collectorId || '',
      name: data.name || '',
      assignedWard: data.assignedWard || '',
      phone: data.phone || '',
      password: data.password, // In real app, hash this
      employeeId: data.employeeId,
      createdAt: new Date(),
    };
    // For mock login to work later, we'd need to add to mockCollectors, but for now we just auto-login
    setAuthState({
      isAuthenticated: true,
      role: 'collector',
      user: newUser,
    });
    return true;
  }, []);

  const registerOfficer = useCallback(async (data: Partial<Officer>): Promise<boolean> => {
    const newUser: Officer = {
      id: `o_new_${Date.now()}`,
      officerId: data.officerId || '',
      name: data.name || '',
      role: data.role || 'ward_officer',
      assignedWards: data.assignedWards || [],
      govtId: data.govtId,
      department: data.department,
      createdAt: new Date(),
    };
    setAuthState({
      isAuthenticated: true,
      role: 'officer',
      user: newUser,
    });
    return true;
  }, []);

  const registerThirdParty = useCallback(async (data: Partial<ThirdPartyUser> & { password: string }): Promise<boolean> => {
    const newUser: ThirdPartyUser = {
      id: `tp_new_${Date.now()}`,
      partnerId: data.partnerId || '',
      name: data.name || '',
      role: 'third_party',
      email: data.email || '',
      gstNumber: data.gstNumber,
      createdAt: new Date(),
    };
    setAuthState({
      isAuthenticated: true,
      role: 'third_party',
      user: newUser,
    });
    return true;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        loginHousehold,
        loginCollector,
        loginOfficer,
        loginThirdParty,
        loginStateAdmin,
        loginMunicipalAdmin,
        loginDeptUser,
        registerHousehold,
        registerCollector,
        registerOfficer,
        registerThirdParty,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
