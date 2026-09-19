export interface PharmacyBuyLink {
  platform: "Tata 1mg" | "PharmEasy" | "Apollo Pharmacy" | "Netmeds";
  url: string;
  badgeColor?: string;
}

export interface MedicineAlternative {
  id: string;
  name: string;
  type: "Generic Equivalent" | "Substitute Brand";
  manufacturer?: string;
  composition: string;
  priceEstimate: string;
  description: string;
  buyLinks: PharmacyBuyLink[];
}

export interface MedicineItem {
  id: string;
  name: string;
  genericName: string;
  dosage: string;
  frequency: string;
  duration: string;
  timing: {
    morning: boolean;
    afternoon: boolean;
    night: boolean;
    timingNote: string; // e.g. "Take after meals"
  };
  doctorInstructions: string;
  purpose: string;
  isAvailable: boolean; // default true, toggling triggers Feature 2
  alternatives: MedicineAlternative[];
  buyLinks: PharmacyBuyLink[];
}

export interface DoctorDetails {
  name: string;
  qualification?: string;
  clinic?: string;
  date?: string;
  patientName?: string;
}

export interface PrescriptionAnalysis {
  submissionId: string;
  status: "processing" | "completed" | "failed";
  createdAt: string;
  doctorDetails: DoctorDetails;
  medicines: MedicineItem[];
  safetyNotes?: string[];
}
