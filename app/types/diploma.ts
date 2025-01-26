import diplomaLogo from "@/public/images/MTN master.svg";

// types/diploma.ts
export interface DiplomaFeature {
  id: string;
  name: string;
}

export interface Diploma {
  id: string;
  title: string;
  logoUrl: string;
  features: DiplomaFeature[];
  isPopular?: boolean;
}

// data/diplomas.ts
export const diplomasData: Diploma[] = [
  {
    id: "1",
    title: "Classification Medicine Diploma",
    logoUrl: diplomaLogo,
    features: [
      { id: "1", name: "Emotional Literacy" },
      { id: "2", name: "Psychological Fitness Training" },
      { id: "3", name: "Self-Healing Guide" },
      { id: "4", name: "Emotional Balance Technique" },
      { id: "5", name: "Adam and Eve - Basic Level" },
      { id: "6", name: "Male-Female Communication" },
      { id: "7", name: "Adam and Eve Marriage" },
      { id: "8", name: "Typological Medicine" },
      { id: "9", name: "Typological Medicine" },
    ],
  },
  {
    id: "2",
    title: "Classification Medicine Diploma",
    logoUrl: diplomaLogo,
    features: [
      { id: "1", name: "Emotional Literacy" },
      { id: "2", name: "Psychological Fitness Training" },
      { id: "3", name: "Self-Healing Guide" },
      { id: "4", name: "Emotional Balance Technique" },
      { id: "5", name: "Adam and Eve - Basic Level" },
      { id: "6", name: "Male-Female Communication" },
      { id: "7", name: "Adam and Eve Marriage" },
      { id: "8", name: "Typological Medicine" },
      { id: "9", name: "Typological Medicine" },
      { id: "10", name: "Luscher Color Diagnostic" },
      { id: "11", name: "Color Diagnostic Psychological Clinic" },
    ],
  },
  {
    id: "3",
    title: "Classification Medicine Diploma",
    logoUrl: diplomaLogo,
    features: [
      { id: "1", name: "Emotional Literacy" },
      { id: "2", name: "Psychological Fitness Training" },
      { id: "3", name: "Self-Healing Guide" },
      { id: "4", name: "Emotional Balance Technique" },
      { id: "5", name: "Adam and Eve - Basic Level" },
      { id: "6", name: "Male-Female Communication" },
      { id: "7", name: "Adam and Eve Marriage" },
      { id: "8", name: "Typological Medicine" },
      { id: "9", name: "Typological Medicine" },
      { id: "10", name: "Luscher Color Diagnostic" },
      { id: "11", name: "Color Diagnostic Psychological Clinic" },
    ],
  },
  {
    id: "4",
    title: "Classification Medicine Diploma",
    logoUrl: diplomaLogo,
    features: [
      { id: "1", name: "Emotional Literacy" },
      { id: "2", name: "Psychological Fitness Training" },
      { id: "3", name: "Self-Healing Guide" },
      { id: "4", name: "Emotional Balance Technique" },
      { id: "5", name: "Adam and Eve - Basic Level" },
      { id: "6", name: "Male-Female Communication" },
      { id: "7", name: "Adam and Eve Marriage" },
      { id: "8", name: "Typological Medicine" },
      { id: "9", name: "Typological Medicine" },
      { id: "10", name: "Luscher Color Diagnostic" },
      { id: "11", name: "Color Diagnostic Psychological Clinic" },
    ],
  },
  // Add more diplomas as needed
];
