import { UserDetails } from "@/app/components/users/user-details";
import {
  logRoles,
  render,
  screen,
} from "@/app/test-utils/testing-library-utils";

const mockUserDetails = {
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
};

vi.mock("@/app/hooks/useUserDetails", () => {
  return {
    useUserDetails: (id: string) => ({
      data: mockUserDetails,
      isPending: false,
    }),
  };
});

describe("user details", () => {
  it("should render user details correctly", () => {
    const { container } = render(
      <UserDetails id={"69750c5ac3a39646f401e526"} />,
    );

    screen.getAllByText(mockUserDetails.personal_information.full_name);
    expect(screen.getByText("mcknighthorne@farmage.com")).toBeInTheDocument();
    expect(
      screen.getByText(mockUserDetails.education_and_employment.monthly_income),
    ).toBeInTheDocument();
    logRoles(container);
  });
});
