import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const employeeDepartments = [
  { id: 1, value: "Computer Science and Engineering (CSE)" },
  { id: 2, value: "Industrial and Production Engineering (IPE)" },
  { id: 3, value: "Petroleum and Mining Engineering (PME)" },
  { id: 4, value: "Chemical Engineering (ChE)" },
  { id: 5, value: "Electrical and Electronic Engineering (EEE)" },
  { id: 6, value: "Biomedical Engineering (BME)" },
  { id: 7, value: "Textile Engineering (TE)" },
  { id: 8, value: "Microbiology (MB)" },
  { id: 9, value: "Fisheries and Marine Bioscience (FMB)" },
  { id: 10, value: "Genetic Engineering and Biotechnology (GEBT)" },
  { id: 11, value: "Pharmacy (PHAR)" },
  { id: 12, value: "Biochemistry and Molecular Biology (BMB)" },
  { id: 13, value: "Environmental Science and Technology (EST)" },
  { id: 14, value: "Nutrition and Food Technology (NFT)" },
  { id: 15, value: "Food Engineering (FE)" },
  { id: 16, value: "Climate and Disaster Management (CDM)" },
  { id: 17, value: "Physical Education and Sports Science (PESS)" },
  { id: 18, value: "Physiotherapy and Rehabilitation (PTR)" },
  { id: 19, value: "Nursing and Health Science (NHS)" },
  { id: 20, value: "English (ENG)" },
  { id: 21, value: "Physics (PHY)" },
  { id: 22, value: "Chemistry (CHEM)" },
  { id: 23, value: "Mathematics (MATH)" },
  { id: 24, value: "Applied Statistics and Data Science (ASDS)" },
  { id: 25, value: "Accounting and Information Systems (AIS)" },
  { id: 26, value: "Management (MGT)" },
  { id: 27, value: "Marketing (MKT)" },
  { id: 28, value: "Finance and Banking (FB)" },
  { id: 29, value: "Veterinary Medicine (DVM)" },
];
