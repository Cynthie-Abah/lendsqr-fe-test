import { ChangeEvent, FC, useState } from 'react';
import union from '../assets/Union.svg'

import lensqr from '../assets/lendsqr.png'
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Login.scss'
import axios from 'axios';

interface LoginProps{
}

const Login: FC<LoginProps> = () => {
    //  USE STATES 
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [check, setCheck] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    const checkInfo = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get('https://run.mocky.io/v3/aac9d9de-41b4-47f0-820e-35dc016a1bb8');
            const clients = response.data.clients
            console.log(clients);
            
            clients.forEach((element: { email: string; password: string; id: number }) => {
            
                if (email == element.email && password == element.password) {
                    setIsLoading(false)
                    localStorage.setItem('id', element.id.toString());
                    navigate('/dashboard');
                    setCheck('')
                } else {
                    setCheck('Oops! You are currently not signed up on Pecunia, kindly click on the "sign up" button in your email to get started')
                    setIsLoading(false)
                }
            });
            // <Dashboard email={email} id={id} />  
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    return (
        <div className="lpage">
            <div className="lmain-pic" >
                <div className="logo-l">
                    <img src={union} alt="" />
                    <img src={lensqr} alt="" />
                </div>
            </div>

            <div className="lmain-text">
                <div className="lcenter">
                    <div className="lheader-text">
                        <h1 className="lheading">Welcome!</h1>
                        <p className="ltext">Enter details to login.</p>
                    </div>
                    <p className="error-msg" style={{ display: check ? 'block' : 'none' }}><i className="fa fa-xmark"></i> {check}</p>
                    
                    <form action="" className="login-form-l" onSubmit={(e) => { e.preventDefault() }}>
                        <div className="linput-area">
                            <input 
                            type="email" 
                            name="password" 
                            required
                            onChange={handleEmailChange} 
                            placeholder="Email" />
                        </div>
                        <div className="linput-area">
                            <input 
                            name="password" 
                            type={showPassword ? 'text' : 'password'}
                            onChange={handlePasswordChange}  
                            required
                            placeholder="Password" />
                            <button className="lvisiblity" onClick={togglePasswordVisibility}>{showPassword ? 'Hide' : 'Show'}</button>
                        </div>
                        <div className="lbtns">
                            <button className="lreset">FORGOT PASSWORD?</button>
                            <Link to="#" className="lsignup">SIGN UP</Link>
                        </div>

                        <button className={isLoading ? 'login-loading' : 'login-l'} type="submit" onClick={checkInfo}>
                            {isLoading ? 'Logging in...' : 'Log in'}
                            <span className="loader"></span>
                        </button>
                    </form>
                </div> 
            </div>
        </div>
    );
}

export default Login;
