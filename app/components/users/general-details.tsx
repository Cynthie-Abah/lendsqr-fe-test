import { UserInfo } from "./user-info"
import { Fragment } from "react/jsx-runtime"
import { UserDetails } from "@/app/types/types"

export const GeneralDetails = ({userDetails}: {userDetails: UserDetails}) => {

  const personalInformation = [
  { label: 'Full Name', value: userDetails.personal_information.full_name },
  { label: 'Phone Number', value: userDetails.phone },
  { label: 'Email Address', value: userDetails.email },
  { label: 'BVN', value: userDetails.personal_information.bvn },
  { label: 'Gender', value: userDetails.personal_information.gender },
  { label: 'Marital Status', value: userDetails.personal_information.marital_status },
  { label: 'Children', value: userDetails.personal_information.children},
  { label: 'Type of Residence', value: userDetails.personal_information.type_of_residence },
];

  const educationAndEmployment = [
  {
    label: 'Level of Education',
    value: userDetails.education_and_employment.level_of_education,
  },
  {
    label: 'Employment Status',
    value: userDetails.education_and_employment.employment_status,
  },
  {
    label: 'Sector of Employment',
    value: userDetails.education_and_employment.sector_of_employment,
  },
  {
    label: 'Duration of Employment',
    value: userDetails.education_and_employment.duration_of_employment,
  },
  {
    label: 'Office Email',
    value: userDetails.education_and_employment.office_email,
  },
  {
    label: 'Monthly Income',
    value: userDetails.education_and_employment.monthly_income,
  },
  {
    label: 'Loan Repayment',
    value: userDetails.education_and_employment.loan_repayment,
  },
];

  const socials = [
  { label: "Twitter", value: userDetails.socials.twitter },
  { label: "Facebook", value: userDetails.socials.facebook },
  { label: "Instagram", value: userDetails.socials.instagram }
];

const guarantors = userDetails.guarantors.map((guarantor)=> (
[
  { label: "Full Name", value: guarantor.full_name },
  { label: "Phone Number", value: guarantor.phone_number },
  { label: "Email Address", value: guarantor.email_address },
  { label: "Relationship", value: guarantor.relationship }
]
))

  return (
    <div>
        {/* personal information */}
        <UserInfo heading={"personal information"} info={personalInformation} />
        <div className="seperator"/>

        {/* education and employment */}
        <UserInfo heading={"education and employment"} info={educationAndEmployment} />
         <div className="seperator"/>

         {/* socials */}
        <UserInfo heading={"socials"} info={socials} />
         <div className="seperator"/>
         
         {
            guarantors.map((guarantor, index)=> (
                <Fragment key={index}>
                <UserInfo heading={"guarantor"} info={guarantor} />
                {index != guarantors.length -1 && <div className="seperator"/>}
                </Fragment>
            
            ))
         }
         
    </div>
  )
}
