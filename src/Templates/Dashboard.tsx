import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import '../Styles/Dashboard.scss'
import { useNavigate } from 'react-router-dom';
import './UserDetails'


interface DashboardProps {
        
}

interface User{
    [key: string]: any; 
}

const Dashboard: FC<DashboardProps> = () => {
    // USE STATES 
    const [users, setUsers] = useState<User[]>([]);

    // USE EFFECTS
    useEffect(()=>{

        if(localStorage.getItem('clientDetails')){
            const detailsString = JSON.parse(localStorage.getItem('clientDetails')!);
            setUsers(detailsString.user_details)
            console.log(users, 'USERS');    
        }
        console.log(users);
    }, [])    
        
    return (
        <>
        {/* <!-- VIEW RENDERED --> */}
            <main>
                <h1 className="heading">Users</h1>

                <Status users={users} />
                <UserRecord users={users} />
              
            </main>
        </>
    );
}

interface StatusProps {
    users: User[];
}

const Status: FC<StatusProps> = ({users}) => {
        // USE STATES
    const [activeUser, setActiveUser] = useState<number>(0);
    const [loanUser, setLoanUser] = useState<number>(0);
    const [withSavings, setWithSavings] = useState<number>(0);


    useEffect(() => {
        let activeCount = 0;
        let loanCount = 0;
        let savingsCount = 0;
        for (let index = 0; index < users.length; index++) {
          if (users[index].status === 'Active') {
            activeCount++;
          }
          if (users[index].with_loan ) {
            loanCount++;
          }
          if (users[index].with_savings) {
            savingsCount++;
          }
        }
        setActiveUser(activeCount);
        setLoanUser(loanCount);
        setWithSavings(savingsCount);
      }, [users]);


    return (
        <div className="status">
            <div className="status-box">
                <div className="icon users"><i className="fa fa-users"></i></div>
                <p className="status-name">Users</p>
                <h3 className="count">{users.length}</h3>
            </div>
            <div className="status-box">
                <div className="icon active-users"><i className="fa fa-user"></i></div>
                <p className="status-name">Active Users</p>
                <h3 className="count">{activeUser}</h3>
            </div>
            <div className="status-box">
                <div className="icon loan-users"><i className="fa fa-file"></i></div>
                <p className="status-name">Users with Loans</p>
                <h3 className="count">{loanUser}</h3>
            </div>
            <div className="status-box">
                <div className="icon savings-users"><i className="fa fa-coins"></i></div>
                <p className="status-name">Users with Savings</p>
                <h3 className="count">{withSavings}</h3>
            </div>
        </div>
    );
}

interface UserRecordProps {
    users: User[];
}

const UserRecord: FC<UserRecordProps> = ({users}) => {
        // USE STATES
    const navigate = useNavigate();
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const pages = Math.ceil(users.length / itemsPerPage)
    const allPages = Array.from({ length: pages }, (_, index) => index + 1);
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [orgFilter, setOrgFilter] = useState<string>('');
    const [nameFilter, setNameFilter] = useState<string>('');
    const [emailFilter, setEmailFilter] = useState<string>('');
    const [phoneFilter, setPhoneFilter] = useState<string>('');
    const [dateFilter, setDateFilter] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('');
        // use effect
        useEffect(()=>{
            setAllUsers(users);
        }, [users])

        // GET INPUT VALUES
        const handleOrgChange = (e: ChangeEvent<HTMLSelectElement>) => {
            setOrgFilter(e.target.value);
        }
        const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
            setNameFilter(e.target.value);
        }
        const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
            setEmailFilter(e.target.value);
        }
        const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
            setPhoneFilter(e.target.value);
        }
        const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
            setDateFilter(e.target.value);
        }
        const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
            setStatusFilter(e.target.value);
        }
    
        // FILTER FUNCTION
    const filterUser = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const filtered = allUsers?.filter((user) => {
          return (
            (orgFilter && user.organization.toLowerCase().includes(orgFilter.toLowerCase())) ||
            (nameFilter && user.name.toLowerCase().includes(nameFilter.toLowerCase())) ||
            (emailFilter && user.email.toLowerCase().includes(emailFilter.toLowerCase())) ||
            (phoneFilter && user.phone_number.toLowerCase().includes(phoneFilter.toLowerCase())) ||
            (dateFilter && user.date_joined.toLowerCase().includes(dateFilter.toLowerCase())) ||
            (statusFilter && user.status.toLowerCase().includes(statusFilter.toLowerCase()))
          );
        });
        setAllUsers(filtered || []);
        setCurrentPage(1);
      };

    const startIndex = (currentPage - 1) * itemsPerPage; // 1 * 8 = 8
    const endIndex = startIndex + itemsPerPage; // 8 + 8 = 16
    const currentUsers = allUsers.slice(startIndex, endIndex);
    const itemIndex = itemsPerPage * currentPage
    let indexpage = 1;
    console.log(allUsers, 'userdff');
        //    RESET FUNCTION
    const reset = () =>{

        setAllUsers(users);
        console.log(allUsers);

    }

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
      };
    
    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, pages));
        indexpage --
    };


    const statusClassNames: Record<User['status'], string> = {
        Active: 'pills-active',
        blacklisted: 'pills-blacklisted',
        pending: 'pills-pending',
        Inactive: 'pills-inactive',
      };
    const statusClassMobile: Record<User['status'], string> = {
        Active: 'status-circle-active',
        blacklisted: 'status-circle-blacklisted',
        pending: 'status-circle-pending',
        Inactive: 'status-circle-inactive',
      };
    const lessPages = allPages.length > 5 ? allPages.slice(0, 3).concat(allPages.slice(-2)): [];
       
    return (
        <>
        <div className="table-wrapper">
            <div className="info-table">
                <table>
                    <thead>
                    <tr className="hover-heading">
                        <th>organization <i className="fa fa-filter"></i></th>
                        <th>Username <i className="fa fa-filter"></i></th>
                        <th>Email <i className="fa fa-filter"></i></th>
                        <th>Phone number <i className="fa fa-filter"></i></th>
                        <th>Date joined <i className="fa fa-filter"></i></th>
                        <th>Status <i className="fa fa-filter"></i></th>
                        <th> 
                        <div className="filter-div">
                            <form action="" onSubmit={(e)=>{filterUser(e)}}>

                                <div className="input-div">
                                    <label htmlFor="organization">Organization</label>
                                    <select name="organization" id="organization" onChange={handleOrgChange} className="filter-input">
                                        <option value="" hidden>Select</option>
                                        <option value="lendsqr">Lendsqr</option>
                                        <option value="lend star">Lend star</option>
                                        <option value="irorun">Irorun</option>
                                    </select>
                                </div>

                                <div className="input-div">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" id="username" className="filter-input" onChange={handleNameChange} placeholder="User" />
                                </div>

                                <div className="input-div">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" className="filter-input" onChange={handleEmailChange}  placeholder="Email" />
                                </div>

                                <div className="input-div">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input type="number" id="phone" onChange={handlePhoneChange} className="filter-input" placeholder="Phone Number" />
                                </div>

                                <div className="input-div">
                                    <label htmlFor="date">Date</label>
                                    <input type="date" id="date" onChange={handleDateChange} className="filter-input" placeholder="Date" />
                                </div>

                                <div className="input-div">
                                    <label htmlFor="status">Status</label>
                                    <select name="status" onChange={handleStatusChange} id="status" className="filter-input">
                                        <option value="default" hidden>Select</option>
                                        <option value="default">Select</option>
                                        <option value="default">Select</option>
                                        <option value="default">Select</option>
                                    </select>
                                </div>

                                <div className="btn-jc">
                                    <button className="reset" onClick={(e)=>{e.preventDefault(); reset()}}>Reset</button>
                                    <button className="filter">Filter</button>
                                </div>
                            </form>
                        </div>
                        </th>
                        
                    </tr>
                    </thead>
                    
                    { 
                    currentUsers.map((currentUsers)=>{
                        return ( 
                    <tbody key={currentUsers.user_id}>
                        <tr className="hover">
                            <td>{currentUsers.organization}</td>
                            <td>{currentUsers.name}</td>
                            <td>{currentUsers.email}</td>
                            <td>{currentUsers.phone_number}</td>
                            <td>{currentUsers.date_joined}</td>
                            <td><div className={` 'pills' ${statusClassNames[currentUsers.status]} || ''`}>{currentUsers.status}</div></td>
                            <td className="bars"><i className="fa fa-bars"></i>
                                <div className="toggle-user">
                                    <ul>
                                    <li onClick={() => { navigate(`/user-details/${currentUsers.user_id}`); }}> <i className="fa fa-eye"></i> View Details</li>
                                        <li> <i className="fa fa-user-slash"></i> Blacklist User</li>
                                        <li> <i className="fa fa-user-check"></i> Activate User</li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </tbody>)
                    })
                    }
                    
                </table>
            </div>

            <div className="info-table info-table-mobile">
                        <table>
                            <thead>
                                <tr className="hover-heading" onClick={()=> setShowFilter(!showFilter)}>
                                    <th> </th>
                                    <th><div className="heading-content"></div>Organization <i className=" fil-icon fa fa-filter"></i></th>
                                    <th><div className="heading-content"></div>Username <i className=" fil-icon fa fa-filter"></i></th>
                                    <th><div className="heading-content"></div>Email <i className="fil-icon fa fa-filter"></i></th>
                                    <th><div className="heading-content"></div>Phone <i className="fil-icon fa fa-filter"></i></th>
                                    <th><div className="heading-content"></div>Date joined <i className="fil-icon fa fa-filter"></i></th>
                                </tr>
                            </thead>
                            
                            {
                            currentUsers?.map((currentUsers)=>{
                                return ( 
                        
                            <tbody key={currentUsers.user_id}>
                                <tr className="hover">
                                    <td className={statusClassMobile[currentUsers.status] || ''}>
                                        <abbr
                                title={currentUsers.status} 
                                className='status-name'>
                                        <i className=" fa fa-circle"></i>
                                        </abbr>
                                    </td>
                                    <td>{currentUsers.organization}</td>
                                    <td>{currentUsers.name}</td>
                                    <td>{currentUsers.email}</td>
                                    <td>{currentUsers.phone_number}</td>
                                    <td>{currentUsers.date_joined}</td>
                                    <td className="bars"><i className="fa fa-bars"></i>
                                        <div className="toggle-user">
                                            <ul>
                                            <li onClick={() => { navigate(`/user-details/${currentUsers.user_id}`); }}> <i className="fa fa-eye"></i> View Details</li>
                                                <li> <i className="fa fa-user-slash"></i> Blacklist User</li>
                                                <li> <i className="fa fa-user-check"></i> Activate User</li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>

                            )
                            })
                            }

                        </table>
            </div> 

            <div className="table-main">
            <div className={showFilter ? 'filter-div' : 'filter-display'}>
                <form action="" onSubmit={(e)=>{filterUser(e)}}>
                    <div className="input-div">
                        <label htmlFor="organization">Organization</label>
                        <select name="organization" onChange={handleOrgChange} id="organization" className="filter-input">
                            <option value="default" hidden>Select</option>
                            <option value="Lendsqr">Lendsqr</option>
                            <option value="lend star">Lend Star</option>
                            <option value="irorun">Irorun</option>
                        </select>
                    </div>

                    <div className="input-div">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" onChange={handleNameChange} className="filter-input" placeholder="User" />
                    </div>

                    <div className="input-div">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={handleEmailChange} className="filter-input" placeholder="Email" />
                    </div>

                    <div className="input-div">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="number" id="phone" onChange={handlePhoneChange} className="filter-input" placeholder="Phone Number" />
                    </div>

                    <div className="input-div">
                        <label htmlFor="date">Date</label>
                        <input type="date" id="date" onChange={handleDateChange} className="filter-input" placeholder="Date" />
                    </div>

                    <div className="input-div">
                        <label htmlFor="status">Status</label>
                        <select name="status" onChange={handleStatusChange} id="status" className="filter-input">
                            <option value="default" hidden>Select</option>
                            <option value="default">Select</option>
                            <option value="default">Select</option>
                            <option value="default">Select</option>
                        </select>
                    </div>

                    <div className="btn-jc">
                        <button className="reset" onClick={(e)=>{e.preventDefault(); reset()}}>Reset</button>
                        <button className="filter">Filter</button>
                    </div>
                </form>
            </div>

            <div className="bottom">

                    <div className="count-info">
                            <p>Showing</p>
                            <button>{itemIndex}</button>
                            <p>out of {allUsers?.length}</p>
                    </div>

                    <div className="pagination">
                        <button onClick={handlePreviousPage}  disabled={currentPage === 1}>
                        <i className='fa fa-caret-left'></i>
                        </button>
                        
                        {lessPages.map((page)=>{

                                if(page === lessPages[3]){
                                    return(
                                        <span className={indexpage === page ? 'showing': ' '} key={page}> ... {page} </span> 
                                    

                                    )
                                }
                                return(
                                    <span key={page} className={ indexpage === page ? 'showing': ' '}> {page} </span>
                                )
                        })}
                        <button onClick={handleNextPage} disabled={endIndex >= users.length}>
                        <i className='fa fa-caret-right'></i>
                        </button>
                    </div>
            </div>
            </div>
            </div>
        </>
    );
}

export default Dashboard;

