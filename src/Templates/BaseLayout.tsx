import { FC, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import union from '../assets/Union.svg'
import lendsqr from '../assets/lendsqr.png'
import axios from 'axios';

interface Client {
    id: number;
    [key: string]: any; 
}

interface ClientDetails {
    company_profile: string;
    company_name: string;

  }

interface BaseLayoutProps {}

const BaseLayout: FC<BaseLayoutProps> = () => {
// USE STATE
const [viewSearch, setViewSearch] = useState<boolean>(false);
const [viewProfile, setViewProfile] = useState<boolean>(false);
const [clientId, setClientId] = useState<number>();
const [clientDetails, setClientDetails] = useState<ClientDetails>();
const [allClients, setAllClients] = useState<Client[]>([]);
const [showView, setShowView] = useState<boolean>(false);
// ASYNC FUNCTION
useEffect(()=>{
    const fetchInfo = async ()  =>{

        try {
            const response = await axios.get('https://run.mocky.io/v3/db67943a-464f-4447-9c8b-4c906a45a29b');
            const clients = response.data.clients
            setAllClients(clients);         
    
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    fetchInfo();
}, [])

//  USE EFFECT
useEffect(() => {
        if (localStorage.getItem('id')) {
        setClientId(parseInt(localStorage.getItem('id') || '/welcome', 10));
        }

  }, []);
    
useEffect(() => {

    allClients.forEach((element: Client) => {
        if (element.id === clientId) {
            localStorage.setItem('clientDetails', JSON.stringify(element));    
        }
        if(localStorage.getItem('clientDetails')){
            const detailsString = localStorage.getItem('clientDetails');
            setClientDetails(JSON.parse(detailsString!))
        }
    });
}, [allClients, clientId]);

    return (
<>
    <div className="homepage">
            {/* <!-- HEADER --> */}
        <header>
            <div className="logo">
                <img src={union} alt="" />
                <img src={lendsqr} alt=""/>
            </div>
            <div className="search">
                <input type="text" placeholder="Search for anything"/>
                <button className="search-btn"><i className="fa fa-search"></i></button>
            </div>
            <div className="profile-info">
                <Link to="#" className='profile-link'>Docs</Link>
                <Link to="#" className='profile-link'><i className="fa fa-bell"></i></Link>
                <div className="profile">
                <img src={clientDetails?.company_profile} width={50} alt=""/>
                    <div><h3 className="name">{clientDetails?.company_name} <i className="fa fa-caret-down"></i></h3></div>
                </div>
            </div>
        </header>

        <header className="mobile-header" >
            <div className="res-jc">
               <div className="logo">
                    <img src={union} alt=""/>
                    <img src={lendsqr} alt=""/>
                </div>
                <ul className="mobile-nav">
                    <li onClick={()=> setViewSearch(!viewSearch)}><i className="fa fa-search"></i>
                        <div className={viewSearch ? 'search search-bar-mobile': 'search-visible'}>
                            <input type="text" placeholder="Search for anything"/>
                            <button className="search-btn"><i className="fa fa-search"></i></button>
                        </div>
                    </li>

                    <li onClick={()=> setViewProfile(!viewProfile)}><i className="fa fa-user"></i>
                    <div className={`profile-info ${viewProfile ? 'profile-mobile': 'search-visible'}`}>
                        <Link className='profile-link' to="#&">Docs</Link>
                        <Link className='profile-link' to="#&"><i className="fa fa-bell"></i></Link>
                        <div className="profile">
                            <img src={clientDetails?.company_profile} width={50} alt=""/>
                            <div><h3 className="name">{clientDetails?.company_name} <i className="fa fa-caret-down"></i></h3></div>
                        </div>
                     </div>
                    </li>
                </ul>
            </div>
        </header>

        <div className="body">
            {/* <!-- SIDE BAR  --> */}
            <div className="same">
            <div className="sidebar">
                <div className="switch">
                    <button><i className="fa fa-home"></i> Switch Organization  <i className="fa fa-caret-down"></i></button>
                </div>
                    {/* <!-- DASHBOARD --> */}
                <div className="menu">
                    <ul>
                        <li><Link to="/welcome" className='Link'><i className="fa fa-home awe"></i> Dashboard</Link></li>
                    </ul>
                </div>
                        {/* <!-- CUSTOMERS --> */}
                <div className="menu">
                    <ul>
                        <h1 className="menue-title">CUSTOMERS</h1>
                        <li><Link to={'/dashboard'} onClick={()=>{setShowView(showView!)}} className={` Link ${showView ? 'rendered-nav': ''}`}><i className="fa fa-user awe "></i> Users</Link></li>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-users awe "></i> Guarantors</Link></li>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-user awe "></i> Loans</Link></li>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-handshake awe "></i> Decision Models </Link></li>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-user awe "></i> Savings</Link></li>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-handshake awe "></i> Loan Requests</Link></li>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-user-check awe "></i> Whitelist</Link></li>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-user-slash awe "></i> Karma</Link></li>
                    </ul>
                </div>
                    {/* <!-- BUSINESSES --> */}
                <div className="menu">
                    <ul>
                        <h1 className="menue-title">BUSINESSES</h1>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-suitcase awe"></i> Organization</Link></li>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-hand-holding-heart awe"></i> Loan Products</Link></li>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-coins awe"></i> Savings Products </Link></li>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-coins awe"></i> Fees and Charges</Link></li>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-suitcase awe"></i> Transactions</Link></li>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-hand-holding-heart awe"></i> Services</Link></li>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-coins awe"></i> Service Account</Link></li>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-suitcase awe"></i> Settlements</Link></li>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-hand-holding-heart awe"></i> Reports</Link></li>
                        
                    </ul>
                </div>
                        {/* <!-- SETTINGS --> */}
                <div className="menu">
                    <ul>
                        <h1 className="menue-title">SETTINGS</h1>
                        <li><Link to={'#'} className="Link"><i className="fa fa-wrench awe"></i> Preferences</Link></li>
                        <li><Link to={'#'} className="Link"><i className="fa fa-arrow-right awe"></i> Fees and Pricing</Link></li>
                        <li><Link to={'#'} className="Link"><i className="fa fa-arrow-left awe"></i> Audit Logs </Link></li>
                    </ul>
                </div>
            </div>
            <div className="sidebar-mobile">
                        {/* <!-- CUSTOMERS --> */}
                <div className="menu">
                    <ol className="res-nav">
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-user awe"></i></Link></li>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-users awe"></i></Link></li>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-user awe"></i></Link></li>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-handshake awe"></i></Link></li>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-user awe"></i></Link></li>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-handshake awe"></i></Link></li>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-user-check awe"></i></Link></li>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-user-slash awe"></i></Link></li>
                    </ol>
                </div>
                    {/* <!-- BUSINESSES --> */}
                <div className="menu">
                    <ol className="res-nav">
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-user awe"></i></Link></li>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-users awe"></i></Link></li>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-user awe"></i></Link></li>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-handshake awe"></i></Link></li>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-user awe"></i></Link></li>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-handshake awe"></i></Link></li>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-user-check awe"></i></Link></li>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-user-slash awe"></i></Link></li>
                    </ol>
                </div>
                        {/* <!-- SETTINGS --> */}
                <div className="menu">
                    <ol className="res-nav">
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-user awe"></i></Link></li>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-users awe"></i></Link></li>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-user awe"></i></Link></li>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-handshake awe"></i></Link></li>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-user awe"></i></Link></li>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-handshake awe"></i></Link></li>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-user-check awe"></i></Link></li>
                        <li><Link to={'/welcome'} className="Link"><i className="fa fa-user-slash awe"></i></Link></li>
                    </ol>
                </div>
            </div>
            </div>
            <div className="main-body">
             <Outlet />   
            </div>
            
        </div> 
    </div>  

</>    
           
    );
}

export default BaseLayout;
