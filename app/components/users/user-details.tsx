"use client"
import { Fragment } from 'react'
import { UserDetailsHeading } from './user-details-heading'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Image from "next/image";
import { Icons } from '../ui/icons';
import { GeneralDetails } from './general-details';
import { UserDetails as UserDetailsType } from '@/app/types/types';
import { useUserDetails } from '@/app/hooks/useUserDetails';

export const UserDetails = ({id}: {id: string}) => {
    const {data, isPending} = useUserDetails(id)
    const user = data as UserDetailsType

    if(isPending) return
  return (
    <Fragment>
        <UserDetailsHeading
      status={user.status} 
      id={id}
      username={user.personal_information.full_name}
      />

      <div className="">
          <TabGroup>
            <div className="user-details__profile">

              <div className="profile-details">

                  <div className="user-info">

                    <div className="avatar">
                      <Image src={'/images/user-placeholder.jpg'} fill alt={""} />
                    </div>

                    <div className="name">
                      <h3 className="full-name">{user.personal_information.full_name}</h3>
                      <p>{user._id.substring(0, 9)}</p>
                    </div>

                  </div>

                <div className="seperator"/>

                <div className="user-tier">
                  <h4>User’s Tier</h4>
                  <div className="star">

                    {Array.from({length: user.tier}).map((_, id)=> (
                      <Icons.starFilled key={id} />
                    ))}

                    {user.tier < 3 && 
                    Array.from({length: 3-user.tier}).map((_, id)=> (
                      <Icons.star key={id} />
                    ))}

                  </div>
                </div>

                <div className="seperator"/>

                <div className="acc-details">
                  <h2>₦{user.account_balance.toLocaleString()}</h2>
                  <h4>{user.bank_details}</h4>
                </div>

              </div>
              
              <TabList className={'tabs-list'}>
              <Tab>general details</Tab>
              <Tab>Document</Tab>
              <Tab>bank details</Tab>
              <Tab>loan</Tab>
              <Tab>saving</Tab>
              <Tab>app and system</Tab>
            </TabList>
            </div>
            

            <TabPanels className={'user-details__panels'}>
              <TabPanel><GeneralDetails userDetails={user} /></TabPanel>
              <TabPanel>Content 2</TabPanel>
              <TabPanel>Content 3</TabPanel>
            </TabPanels>
          </TabGroup>
      </div>
    </Fragment>
  )
}
