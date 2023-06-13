import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../Styles/UserDetails.scss'
import axios from 'axios';

interface UserDetailsProps {

}

interface User {
    id: number;
    [key: string]: any; 
}

const UserDetails: FC<UserDetailsProps> = () => {
        // ID 
    const { userId } = useParams<{ userId: string }>();
    const mainUserId = parseInt(userId!, 10); 
    console.log(userId);

    console.log(mainUserId);
    
        // STATES
    const [showView, setShowView] = useState<string>('general details');
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const [allUsers, setAllUsers] = useState<User[] | null>([]);
    const [updateError, setUpdateError] = useState<boolean>(false);
    const [blacklistError, setBlacklistError] = useState<boolean>(false);
    const [activateDisplay, setActivateDisplay] = useState<boolean>(false);
    const [blacklistDisplay, setBlacklistDisplay] = useState<boolean>(false);
    const [activating, setActivating] = useState<boolean>(false);
    const [blacklisting, setBlacklisting] = useState<boolean>(false);

    //  USE EFFECT
    useEffect(() => {
        if (localStorage.getItem('clientDetails')) {
          const detailsString = localStorage.getItem('clientDetails');
          const details = JSON.parse(detailsString!)
          
          setAllUsers(details.user_details);
        }
        console.log('hyfbuyrgfbrebfvrbusdfbrbvusvdfr vviuyfvryfgigfsbsodyviyevcfiysferreiyfibfib');
        console.log(allUsers);
        
      }, []);    

      useEffect(()=>{

        console.log(allUsers);
        allUsers!.forEach((element: User) => {
          if(element.user_id === mainUserId){
              setUserInfo(element);   
          }
          
      });
      }, [mainUserId, allUsers])

    //  activate function
    const activateUser =async (userId: number) => {
        try {
            setActivating(true);
            const response = await axios.patch(`https://run.mocky.io/v3/db67943a-464f-4447-9c8b-4c906a45a29b/${userId}`, { status: 'Active' });
            console.log(response, 'user activated');
            setActivating(false)
            setUpdateError(false);
            setActivateDisplay(true);
    
        } catch (error) {
            setUpdateError(true);
            console.error('Error Activating user:', error);
            setActivateDisplay(true);
        }
    }

    //  blacklist function
    const blacklistUser =async (userId: number) => {
        try {
            setBlacklisting(true)
            const response = await axios.patch(`https://run.mocky.io/v3/db67943a-464f-4447-9c8b-4c906a45a29b/${userId}`, { status: 'blacklisted' });
            console.log(response, 'user blacklisted');
            setBlacklisting(false)
            setBlacklistDisplay(true);
            setBlacklistError(false);
    
        } catch (error) {
            setBlacklistError(true);
            console.error('Error blacklisting user:', error);
            setBlacklistDisplay(true);
        }
    }
    console.log(userInfo);

    return (
    <>
        <main>
            <Link to={'/dashboard'} className="back"><i className="fa fa-arrow-left"></i> Back to Users</Link>
            <div className="jc">
                <h2 className="heading">Users Details</h2>
                <div className="task-btns">
                    <button className={blacklisting ? 'blacklisting' : 'blacklist'} onClick={()=> blacklistUser(userInfo?.user_id)}>{blacklisting ? 'blacklisting' : 'blacklist user'}</button>
                    <button className={activating ? 'activating' : 'activate'} onClick={()=> activateUser(userInfo?.user_id)}>{activating ? 'activating' : 'activate user'}</button>
                </div>

                <div className='msgs' style={{ display: activateDisplay ? 'block' : 'none' }}>
                
                    <div style={{ display: updateError  ? 'none' : 'block' }} className='success'>
                        <button className="exit" onClick={()=>{setActivateDisplay(false)}}><i className='fa fa-xmark'></i></button>
                        <h1><i className="fa-regular done fa-circle-check"></i></h1>
                        <h2>You have succesfully activated this user.</h2> 
                    </div>

                    <div style={{ display: updateError  ? 'block' : 'none' }} className='error'>
                        <button className="exit" onClick={()=>{setActivateDisplay(false)}}><i className='fa fa-xmark'></i></button>
                        <h1><i className="fa-solid error-icon fa-circle-exclamation"></i></h1>
                        <h2>Error activating user. Pls try again later.</h2> 
                    </div>

                </div>

                <div className='msgs' style={{ display: blacklistDisplay ? 'block' : 'none' }}>
                
                    <div style={{ display: blacklistError ? 'none' : 'block' }} className='success'>
                    <button className="exit" onClick={()=>{setBlacklistDisplay(false)}}><i className='fa fa-xmark'></i></button>
                    <h1><i className="fa-regular done fa-circle-check"></i></h1>
                    <h2>You have succesfully blacklisted this user.</h2>
                    </div>

                    <div style={{ display: blacklistError ? 'block' : 'none' }} className='error'>
                    <button className="exit" onClick={()=>{setBlacklistDisplay(false)}}><i className='fa fa-xmark'></i></button>
                    <h1><i className="fa-solid error-icon fa-circle-exclamation"></i></h1>
                        <h2>Error blacklisting user. Pls try again later.</h2>
                    </div>

                </div>
                {/* */}
            </div>

            <div className="profile-div">
                <div className="personal-details">
                    <div className="info">
                        <div className="info-pic">
                            <img src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} width="45" height="45"  alt=""/>
                        </div>
                        <div className="details-texts">
                            <h3 className="user-name">{userInfo?.name}</h3>
                            <p className="user-id">{userInfo?.user_id}</p>
                        </div>
                    </div>
                    
                <span className="line"></span>

                    <div className="tier">
                        <p className="tier-text">User’s Tier</p>
                        <p className="ratings"><i className='fa fa-star'></i><i className='fa fa-star'></i><i className='fa-regular fa-star'></i></p>
                    </div>

                <span className="line"></span>

                    <div className="finance-details">
                        <h3>{userInfo?.monthly_income}</h3>
                        <p> {userInfo?.Account_Number}/{userInfo?.Bank_Name} </p>
                    </div>
                </div>

                <div className="navigation">
                    <ul>
                        <li onClick={()=> setShowView('general details')} className={showView == 'general details' ? 'rendered-view': ''}>General Details</li>
                        <li onClick={()=> setShowView('documents')} className={showView == 'documents' ? 'rendered-view': ''}>Documents</li>
                        <li onClick={()=> setShowView('bank details')} className={showView == 'bank details' ? 'rendered-view': ''}>Bank Details</li>
                        <li onClick={()=> setShowView('Loans')} className={showView == 'Loans' ? 'rendered-view': ''}>Loans</li>
                        <li onClick={()=> setShowView('Savings')} className={showView == 'Savings' ? 'rendered-view': ''}>Savings</li>
                        <li onClick={()=> setShowView('App and System')} className={showView == 'App and System' ? 'rendered-view': ''}>App and System</li>
                    </ul>
                </div>
            </div>
                {/* General Details */}
            <GeneralDetails showView={showView} userInfo={userInfo}/>

            <Documents showView={showView} userInfo={userInfo!} />

            <BankDetails showView={showView} userInfo={userInfo!}/>

            <Loans showView={showView} userInfo={userInfo!} />

            <Savings showView={showView} userInfo={userInfo!} />

            <AppSystem showView={showView} userInfo={userInfo!} />
      
        </main>
    </>
    );
}

interface GeneralDetailsProps {
    showView: any;
    userInfo?: User | null;
  }
  
  const GeneralDetails: FC<GeneralDetailsProps> = ({showView, userInfo}) => {

    return (
        <div className={`info-view ${showView === 'general details' ? 'info-section': ''}`}>

            <div className="personal-section">

            <h3 className="info-heading">Personal Information</h3>

            <div className="details-jc">
                <div className="details">
                    <p className="detail-head">full Name</p>
                    <h4 className="detail-info">{userInfo?.name}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Phone Number</p>
                    <h4 className="detail-info">{userInfo?.phone_number}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Email Address</p>
                    <h4 className="detail-info">{userInfo?.email}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Bvn</p>
                    <h4 className="detail-info">{userInfo?.bvn_num}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Gender</p>
                    <h4 className="detail-info">{userInfo?.gender}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Marital status</p>
                    <h4 className="detail-info">{userInfo?.marital_status}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Children</p>
                    <h4 className="detail-info">{userInfo?.children}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Type of residence</p>
                    <h4 className="detail-info">{userInfo?.type_of_residence}</h4>
                </div>
            </div>

            </div>

            <div className="personal-section">

            <h3 className="info-heading">Education and Employment</h3>

            <div className="details-jc">
                <div className="details">
                    <p className="detail-head">level of education</p>
                    <h4 className="detail-info">{userInfo?.level_of_education}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">employment status</p>
                    <h4 className="detail-info">{userInfo?.employment_status}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">sector of employment</p>
                    <h4 className="detail-info">{userInfo?.sector_of_employment}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Duration of employment</p>
                    <h4 className="detail-info">{userInfo?.duration_of_employment}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">office email</p>
                    <h4 className="detail-info">{userInfo?.office_email}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Monthly income</p>
                    <h4 className="detail-info">{userInfo?.monthly_income}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">loan repayment</p>
                    <h4 className="detail-info">{userInfo?.loan_repayment}</h4>
                </div>

            </div>

            </div>

            <div className="personal-section">

            <h3 className="info-heading">Socials</h3>

            <div className="details-jc">
                <div className="details">
                    <p className="detail-head">Twitter</p>
                    <h4 className="detail-info">{userInfo?.twitter_account}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Facebook</p>
                    <h4 className="detail-info">{userInfo?.facebook_account}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Instagram</p>
                    <h4 className="detail-info">{userInfo?.instagram_account}</h4>
                </div>

            </div>

            </div>

            <div className="personal-section">

            <h3 className="info-heading">Guarantor</h3>

            <div className="details-jc">
                <div className="details">
                    <p className="detail-head">full Name</p>
                    <h4 className="detail-info">{userInfo?.guarantorname}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Phone Number</p>
                    <h4 className="detail-info">{userInfo?.guarantor_phone_number}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Email Address</p>
                    <h4 className="detail-info">{userInfo?.guarantor_email}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Relationship</p>
                    <h4 className="detail-info">{userInfo?.guarantor_relationship}</h4>
                </div>

            </div>

            </div>

            <div className="personal-section">

            <div className="details-jc">
                <div className="details">
                    <p className="detail-head">full Name</p>
                    <h4 className="detail-info">{userInfo?.guarantorname}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Phone Number</p>
                    <h4 className="detail-info">{userInfo?.guarantor_phone_number}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Email Address</p>
                    <h4 className="detail-info">{userInfo?.guarantor_email}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Relationship</p>
                    <h4 className="detail-info">{userInfo?.guarantor_relationship}</h4>
                </div>

            </div>

            </div>

        </div>
    );
  };

  interface DocumentsProps {
    showView: any;
    userInfo?: User | null;
  }
  
  const Documents: FC<DocumentsProps> = ({showView, userInfo}) => {

    return (
        <div className={`info-view ${showView === 'documents' ? 'info-section': ''}`}>

            <div className="personal-section">

            <h3 className="info-heading">Documents</h3>

            <div className="details-jc">
                <div className="details">
                    <p className="detail-head">full Name</p>
                    <h4 className="detail-info">{userInfo?.name}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Phone Number</p>
                    <h4 className="detail-info">{userInfo?.phone_number}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Email Address</p>
                    <h4 className="detail-info">{userInfo?.email}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Bvn</p>
                    <h4 className="detail-info">{userInfo?.bvn_num}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Gender</p>
                    <h4 className="detail-info">{userInfo?.gender}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Marital status</p>
                    <h4 className="detail-info">{userInfo?.marital_status}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Children</p>
                    <h4 className="detail-info">{userInfo?.children}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Type of residence</p>
                    <h4 className="detail-info">{userInfo?.type_of_residence}</h4>
                </div>
            </div>

            </div>

            <div className="personal-section">

            <h3 className="info-heading">Education and Employment</h3>

            <div className="details-jc">
                <div className="details">
                    <p className="detail-head">level of education</p>
                    <h4 className="detail-info">{userInfo?.level_of_education}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">employment status</p>
                    <h4 className="detail-info">{userInfo?.employment_status}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">sector of employment</p>
                    <h4 className="detail-info">{userInfo?.sector_of_employment}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Duration of employment</p>
                    <h4 className="detail-info">{userInfo?.duration_of_employment}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">office email</p>
                    <h4 className="detail-info">{userInfo?.office_email}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Monthly income</p>
                    <h4 className="detail-info">{userInfo?.monthly_income}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">loan repayment</p>
                    <h4 className="detail-info">{userInfo?.loan_repayment}</h4>
                </div>

            </div>

            </div>

            <div className="personal-section">

            <h3 className="info-heading">Socials</h3>

            <div className="details-jc">
                <div className="details">
                    <p className="detail-head">Twitter</p>
                    <h4 className="detail-info">{userInfo?.twitter_account}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Facebook</p>
                    <h4 className="detail-info">{userInfo?.facebook_account}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Instagram</p>
                    <h4 className="detail-info">{userInfo?.instagram_account}</h4>
                </div>

            </div>

            </div>

            <div className="personal-section">

            <h3 className="info-heading">Guarantor</h3>

            <div className="details-jc">
                <div className="details">
                    <p className="detail-head">full Name</p>
                    <h4 className="detail-info">{userInfo?.guarantorname}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Phone Number</p>
                    <h4 className="detail-info">{userInfo?.guarantor_phone_number}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Email Address</p>
                    <h4 className="detail-info">{userInfo?.guarantor_email}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Relationship</p>
                    <h4 className="detail-info">{userInfo?.guarantor_relationship}</h4>
                </div>

            </div>

            </div>

            <div className="personal-section">

            <div className="details-jc">
                <div className="details">
                    <p className="detail-head">full Name</p>
                    <h4 className="detail-info">{userInfo?.guarantorname}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Phone Number</p>
                    <h4 className="detail-info">{userInfo?.guarantor_phone_number}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Email Address</p>
                    <h4 className="detail-info">{userInfo?.guarantor_email}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Relationship</p>
                    <h4 className="detail-info">{userInfo?.guarantor_relationship}</h4>
                </div>

            </div>

            </div>

        </div>
    );
  };

  interface BankDetailsProp {
    showView: any;
    userInfo?: User | null;
  }
  
  const BankDetails: FC<BankDetailsProp> = ({showView, userInfo}) => {

    return (
        <div className={`info-view ${showView === 'bank details' ? 'info-section': ''}`}>

            <div className="personal-section">
                <h3 className="info-heading">Bank Details</h3>

                <div className="details-jc">
                    <div className="details">
                        <p className="detail-head">Bank Name</p>
                        <h4 className="detail-info">{userInfo?.Bank_Name}</h4>
                    </div>

                    <div className="details">
                    <p className="detail-head">Account Number</p>
                    <h4 className="detail-info">{userInfo?.Account_Number}</h4>
                    </div>

                    <div className="details">
                    <p className="detail-head">Account Holder Name</p>
                    <h4 className="detail-info">{userInfo?.Account_Holder_Name}</h4>
                    </div>

                    <div className="details">
                        <p className="detail-head">Account Balance</p>
                        <h4 className="detail-info">{userInfo?.monthly_income}</h4>
                    </div>
                </div>
            </div>

           <div className="personal-section">

            <h3 className="info-heading">Education and Employment</h3>

            <div className="details-jc">
                <div className="details">
                    <p className="detail-head">level of education</p>
                    <h4 className="detail-info">{userInfo?.level_of_education}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">employment status</p>
                    <h4 className="detail-info">{userInfo?.employment_status}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">sector of employment</p>
                    <h4 className="detail-info">{userInfo?.sector_of_employment}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Duration of employment</p>
                    <h4 className="detail-info">{userInfo?.duration_of_employment}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">office email</p>
                    <h4 className="detail-info">{userInfo?.office_email}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Monthly income</p>
                    <h4 className="detail-info">{userInfo?.monthly_income}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">loan repayment</p>
                    <h4 className="detail-info">{userInfo?.loan_repayment}</h4>
                </div>

            </div>

           </div>

        </div>
    );
  };

  interface LoansProp {
    showView: any;
    userInfo?: User | null;
  }
  
  const Loans: FC<LoansProp> = ({showView, userInfo}) => {

    return (
        <div className={`info-view ${showView === 'Loans' ? 'info-section': ''}`}>

            <div className="personal-section">
                <h3 className="info-heading">Loans</h3>

                <div className="details-jc">

                <div className="details">
                    <p className="detail-head">Loan Amount</p>
                    <h4 className="detail-info">{userInfo?.loan_amount}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Loan Type</p>
                    <h4 className="detail-info">{userInfo?.loan_repayment}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Loan Status</p>
                    <h4 className="detail-info">{userInfo?.loan_status}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Repayment Due Date</p>
                    <h4 className="detail-info">{userInfo?.repayment_due_date}</h4>
                </div>
                
                </div>
            </div>

        </div>
    );
  };

  interface SavingsProp {
    showView: any;
    userInfo?: User | null;
  }
  
  const Savings: FC<SavingsProp> = ({showView, userInfo}) => {

    return (
        <div className={`info-view ${showView === 'Savings' ? 'info-section': ''}`}>

            <div className="personal-section">
                <h3 className="info-heading">Savings</h3>

                <div className="details-jc">

                <div className="details">
                    <p className="detail-head">Amount</p>
                    <h4 className="detail-info">{userInfo?.loan_amount}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Account Duration</p>
                    <h4 className="detail-info">{userInfo?.loan_repayment}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Status</p>
                    <h4 className="detail-info">{userInfo?.loan_status}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Repayment Due Date</p>
                    <h4 className="detail-info">{userInfo?.repayment_due_date}</h4>
                </div>
                
                </div>
            </div>

        </div>
    );
  };
  
  interface AppSystemProp {
    showView: any;
    userInfo?: User | null;
  }

  const AppSystem: FC<AppSystemProp> = ({showView, userInfo}) => {

    return (
        <div className={`info-view ${showView === 'App and System' ? 'info-section': ''}`}>

           <div className="personal-section">

            <h3 className="info-heading">App and System</h3>

            <div className="details-jc">
                <div className="details">
                    <p className="detail-head">full Name</p>
                    <h4 className="detail-info">{userInfo?.name}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Phone Number</p>
                    <h4 className="detail-info">{userInfo?.phone_number}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Email Address</p>
                    <h4 className="detail-info">{userInfo?.email}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Bvn</p>
                    <h4 className="detail-info">{userInfo?.bvn_num}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Gender</p>
                    <h4 className="detail-info">{userInfo?.gender}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Marital status</p>
                    <h4 className="detail-info">{userInfo?.marital_status}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Children</p>
                    <h4 className="detail-info">{userInfo?.children}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Type of residence</p>
                    <h4 className="detail-info">{userInfo?.type_of_residence}</h4>
                </div>
            </div>

            </div>

            <div className="personal-section">

            <h3 className="info-heading">Socials</h3>

            <div className="details-jc">
                <div className="details">
                    <p className="detail-head">Twitter</p>
                    <h4 className="detail-info">{userInfo?.twitter_account}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Facebook</p>
                    <h4 className="detail-info">{userInfo?.facebook_account}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Instagram</p>
                    <h4 className="detail-info">{userInfo?.instagram_account}</h4>
                </div>

            </div>

            </div>

            <div className="personal-section">

            <h3 className="info-heading">Guarantor</h3>

            <div className="details-jc">
                <div className="details">
                    <p className="detail-head">full Name</p>
                    <h4 className="detail-info">{userInfo?.guarantorname}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Phone Number</p>
                    <h4 className="detail-info">{userInfo?.guarantor_phone_number}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Email Address</p>
                    <h4 className="detail-info">{userInfo?.guarantor_email}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Relationship</p>
                    <h4 className="detail-info">{userInfo?.guarantor_relationship}</h4>
                </div>

            </div>

            </div>

            <div className="personal-section">

            <div className="details-jc">
                <div className="details">
                    <p className="detail-head">full Name</p>
                    <h4 className="detail-info">{userInfo?.guarantorname}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Phone Number</p>
                    <h4 className="detail-info">{userInfo?.guarantor_phone_number}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Email Address</p>
                    <h4 className="detail-info">{userInfo?.guarantor_email}</h4>
                </div>

                <div className="details">
                    <p className="detail-head">Relationship</p>
                    <h4 className="detail-info">{userInfo?.guarantor_relationship}</h4>
                </div>

            </div>

            </div>

        </div>
    );
  };
export default UserDetails;


