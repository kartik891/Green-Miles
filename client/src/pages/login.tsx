import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import { Eye, EyeOff} from 'lucide-react';
import axios from 'axios';
import '../styles/pages/login.css';
import bikeImage from '../assets/bike.svg';

function LoginPage() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isDisabled, setIsDisabled] = useState(true);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:8000/login', { email, password }, { withCredentials: true});
            if(response){
                if(response.data.status){
                    navigate('/dashboard');
                }else{
                    setError(response.data.message);
                }
            }
        }
        catch(error){
            setError("Internal Server Error.\nTry again later");
        }
    }

    useEffect(()=>{
        function validate(){
            if(email && password){
                setIsDisabled(false);
            }else{
                setIsDisabled(true);
            }
        }

        validate();

    }, [email, password]);

    return (
        <>
            <div className="outer-container">
                <form onSubmit={handleSubmit} method="post" className='login-card'>
                    <p className='welcome'>Welcome!</p>
                    <p className='title'>Sign in to</p>
                    <p className='subtitle'>Green Miles</p>
                    {error.trim().length > 0 ? <p className='error'>{error}</p> : null}
                    <label >Email</label>
                    <input type="email" required onChange={(e) => setEmail(e.target.value)}/>
                    <label >Password</label>
                    <div className='password-container'>
                        <input type={showPassword ? "text" : "password"} className='password' onChange={(e) => setPassword(e.target.value)} required/>
                        <span className='eye-icon' onClick={() => setShowPassword(!showPassword)}>{showPassword ? <Eye/> : <EyeOff/>}</span>
                    </div>
                    <button type="submit" className='login-button' disabled={isDisabled}>Login</button>
                    <p className='signup'>Don't have an Account ? <Link to='/signup'>Register</Link></p>
                </form>
                <div className='bike-image'>
                    <img src={bikeImage} alt="bike image" />
                </div>
            </div>
        </>
    );
}

export default LoginPage;