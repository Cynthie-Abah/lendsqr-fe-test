import { ReactNode } from "react";

export type User = {
  email: string;
  password: string;
}

export type UserSession = {
    email: string;
  password: string;
  profilePic: string;
  username: string;
}

export type UserBoxProps = {
  icon: ReactNode,
  name: string,
  value: number,
  color: string

}

export interface Pagination {
  current_page: number;
  from: number;
  has_more_pages: boolean;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

export interface PersonalInformation {
  full_name: string;
  phone_number: string;
  email_address: string;
  bvn: number;
  gender: "male" | "female";
  marital_status: "Single" | "Married" | "Divorced";
  children: number;
  type_of_residence: string;
}

export interface EducationAndEmployment {
  level_of_education: string;
  employment_status: "Employed" | "Unemployed" | "Student";
  sector_of_employment: string;
  duration_of_employment: string;
  office_email: string;
  monthly_income: string;
  loan_repayment: string;
}
export interface Socials {
  twitter: string;
  facebook: string;
  instagram: string;
}

export interface Guarantor {
  full_name: string;
  phone_number: string;
  email_address: string;
  relationship: string;
}

export type UserStatus = "Active" | "Inactive" | "Pending" | "Blacklisted";

export interface UserDetails {
  _id: string;
  index: number;
  organization: string;
  username: string;
  email: string;
  phone: string;
  date_joined: string; 
  status: UserStatus;
  tier: number; 
  account_balance: number;
  account_number: string;
  bank_details: string;

  personal_information: PersonalInformation;
  education_and_employment: EducationAndEmployment;
  socials: Socials;
  guarantors: Guarantor[];
}
