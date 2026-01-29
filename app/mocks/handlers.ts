import { http, HttpResponse } from "msw";

const AUTH_API_URL = process.env.NEXT_PUBLIC_LOGIN_API!;

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const handlers = [
  http.get(AUTH_API_URL, () => {
    return HttpResponse.json([
      {
        email: "example@gmail.com",
        password: "12345678",
      },
    ]);
  }),

  http.get(API_URL, () => {
    return HttpResponse.json([
      {
        _id: "69750c5ac3a39646f401e526",
        index: 0,
        organization: "Lendsqr",
        username: "Mcknight Horne",
        email: "mcknighthorne@farmage.com",
        phone: "+234 7885695818",
        date_joined: "2022-09-23T09:06:28-01:00",
        status: "Active",
        tier: 1,
        account_balance: 485412.6099,
        account_number: "LSQFf76402977",
        bank_details: "8890751426/Miraclis Bank",
        personal_information: {
          full_name: "Marcy Ortega",
          phone_number: "+234 8040120532",
          email_address: "marcyortega@miraclis.com",
          bvn: 13256913231,
          gender: "female",
          marital_status: "Married",
          children: 2,
          type_of_residence: "Parent’s Apartment",
        },
        education_and_employment: {
          level_of_education: "B.Sc",
          employment_status: "Student",
          sector_of_employment: "Healthcare",
          duration_of_employment: "2 years",
          office_email: "marcyortega@miraclis.com",
          monthly_income: "₦348994.9614-₦885836.1295",
          loan_repayment: "₦76613.765",
        },
        socials: {
          twitter: "@sallie_vasquez",
          facebook: "Norton Robles",
          instagram: "@carlene_yang",
        },
        guarantors: [
          {
            full_name: "Ratliff Cobb",
            phone_number: "+234 7530147139",
            email_address: "ratliffcobb@miraclis.com",
            relationship: "Parent",
          },
          {
            full_name: "Josefina Church",
            phone_number: "+234 8128166604",
            email_address: "josefinachurch@miraclis.com",
            relationship: "Friend",
          },
        ],
      },
      {
        _id: "69750c5a666f0d5f7213c362",
        index: 1,
        organization: "Lendsqr",
        username: "Morgan Conner",
        email: "morganconner@biospan.com",
        phone: "+234 8521964606",
        date_joined: "2021-04-22T13:43:44-01:00",
        status: "Active",
        tier: 2,
        account_balance: 176778.1423,
        account_number: "LSQFf61272668",
        bank_details: "7570166486/Bulljuice Bank",
        personal_information: {
          full_name: "Collins Stephenson",
          phone_number: "+234 8479557027",
          email_address: "collinsstephenson@bulljuice.com",
          bvn: 11292936245,
          gender: "male",
          marital_status: "Married",
          children: 2,
          type_of_residence: "Own Apartment",
        },
        education_and_employment: {
          level_of_education: "M.Sc",
          employment_status: "Employed",
          sector_of_employment: "Education",
          duration_of_employment: "1 years",
          office_email: "collinsstephenson@bulljuice.com",
          monthly_income: "₦105476.8803-₦771984.0519",
          loan_repayment: "₦24549.3599",
        },
        socials: {
          twitter: "@ramos_haynes",
          facebook: "Harding Snyder",
          instagram: "@maria_larson",
        },
        guarantors: [
          {
            full_name: "Marianne Fischer",
            phone_number: "+234 8486039060",
            email_address: "mariannefischer@bulljuice.com",
            relationship: "Brother",
          },
          {
            full_name: "Rosario Saunders",
            phone_number: "+234 7892689665",
            email_address: "rosariosaunders@bulljuice.com",
            relationship: "Friend",
          },
        ],
      },
    ]);
  }),
];
