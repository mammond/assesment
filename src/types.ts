export interface FamilyMember {
  id: string;
  name: string;
  age: number;
  relationship: string;
  occupation: string;
  monthlyIncome: number;
}

export interface PatientData {
  // Patient Info
  date: string;
  hospitalNumber: string;
  patientName: string;
  age: number;
  sex: string;
  civilStatus: string;
  address: string;
  contactNumber: string;
  philhealthNumber: string;
  membershipType: string;
  referralSource: string;
  assignedSocialWorker: string;
  patientType: 'OPD' | 'ER' | 'IP';
  ageGroup: 'Adult' | 'Pediatric' | 'Geriatric';
  
  // Medical Info
  chiefComplaint: string;
  currentMedicalCondition: string;
  finalDiagnosis: string;
  attendingPhysician: string;
  wardUnit: string;
  dateAdmitted: string;
  purpose: string[];

  // Socio-Economic
  householdSize: number;
  monthlyIncome: number;
  monthlyBasicNeeds: number;
  medicalExpenses: number;
  sourceOfIncome: string;
  occupation: string;
  employmentStatus: string;
  manualOverride: boolean;
  catastrophicIllness: boolean;
  
  // Social
  familyComposition: FamilyMember[];
  livingCondition: string;
  utilities: string[];
  transportation: string;
  education: string;
  supportSystem: string;
  religion: string;
}

export type TabType = 'Dashboard' | 'Assessment' | 'CaseHistory' | 'Assistance' | 'Reports' | 'Administration';
