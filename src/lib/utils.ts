import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const employeeDepartments = [
  { "value": "CSE", "name": "Computer Science and Engineering" },
  { "value": "IPE", "name": "Industrial and Production Engineering" },
  { "value": "PME", "name": "Petroleum and Mining Engineering" },
  { "value": "ChE", "name": "Chemical Engineering" },
  { "value": "EEE", "name": "Electrical and Electronic Engineering" },
  { "value": "BME", "name": "Biomedical Engineering" },
  { "value": "TE", "name": "Textile Engineering" },
  { "value": "MB", "name": "Microbiology" },
  { "value": "FMB", "name": "Fisheries and Marine Bioscience" },
  { "value": "GEBT", "name": "Genetic Engineering and Biotechnology" },
  { "value": "PHAR", "name": "Pharmacy" },
  { "value": "BMB", "name": "Biochemistry and Molecular Biology" },
  { "value": "EST", "name": "Environmental Science and Technology" },
  { "value": "NFT", "name": "Nutrition and Food Technology" },
  { "value": "FE", "name": "Food Engineering" },
  { "value": "CDM", "name": "Climate and Disaster Management" },
  { "value": "PESS", "name": "Physical Education and Sports Science" },
  { "value": "PTR", "name": "Physiotherapy and Rehabilitation" },
  { "value": "NHS", "name": "Nursing and Health Science" },
  { "value": "ENG", "name": "English" },
  { "value": "PHY", "name": "Physics" },
  { "value": "CHEM", "name": "Chemistry" },
  { "value": "MATH", "name": "Mathematics" },
  { "value": "ASDS", "name": "Applied Statistics and Data Science" },
  { "value": "AIS", "name": "Accounting and Information Systems" },
  { "value": "MGT", "name": "Management" },
  { "value": "MKT", "name": "Marketing" },
  { "value": "FB", "name": "Finance and Banking" },
  { "value": "DVM", "name": "Veterinary Medicine" }
]
