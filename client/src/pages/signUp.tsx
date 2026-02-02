import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import '../styles/pages/login.css';
import bikeImage from '../assets/bike.svg';
import axios from 'axios';

function SignUp() {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string>(""); 
    const [isDisabled, setIsDisabled] = useState(true);

    const navigate = useNavigate();

    function validateUsername(): boolean{

        const namePattern = /^[a-zA-Z0-9_-]{6,}$/;

        if(!namePattern.test(username)){
            setError(`Username should only conatin letters, digits & '-,_'`);
            return false;
        }else{
            setError("");
        }

        return true;
    }

    function validateAllFields(): boolean {

        const namePattern =  /^[a-zA-Z0-9_-]{6,}$/;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        return (
            namePattern.test(username) &&
            passwordPattern.test(password) &&
            email.trim().length > 0 &&
            password === confirmPassword
        );
    }

    function validateConfirmPassword(): boolean{

        if(password !== confirmPassword){
            setError("\nPassword do not match");
            return false;
        }else{
            setError("");
        }

        return true;
    }

    function validateEmail(): boolean{
        if(email.trim().length === 0){
            setError("Email is required");
            return false;
        }else{
            setError("");
        }

        return true;
    }

    function validatePassword(): boolean{

        const passwordPattern =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if(!passwordPattern.test(password)){
            setError("Password must contain Uppercase Letter, Lowercase Letter, Digit & Cpecial Character");
            return false;
        }else{
            setError("");
        }

        return true;
    }

    async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            if(validateAllFields() === true){
                const response = await axios.post('http://localhost:8000/signup', {email, username, password}, { withCredentials: true });
                if(response.data.status){
                    navigate('/');
                }else{
                    setError(response.data.message || "Error while handling the data.\nTry again later");
                }
            }
        }
        catch (err) {
            console.log("Error handlin data:", err);
        }
    }

    useEffect(()=>{
        if(validateAllFields()){
            setIsDisabled(false);
        }else{
            setIsDisabled(true);
        }
    }, [email, password, confirmPassword, username])

    return (
        <>
            <div className="outer-container">
                <form onSubmit={handleUpload} method="post" className='signup-card'>
                    <p className='welcome'>Welcome!</p>
                    <p className='title'>Sign in to</p>
                    <p className='subtitle'>Green Miles</p>
                    {error.length > 0 ? <p className='error'>{error}</p> : null}
                    <label >Email</label>
                    <input type="email" required onChange={(e) => setEmail(e.target.value)} onBlur={validateEmail}/>
                    <label >User Name</label>
                    <input type="text" required onChange={(e) => setUsername(e.target.value)}  onBlur={validateUsername}/>
                    <label >Password</label>
                    <div className='password-container'>
                        <input type={showPassword ? "text" : "password"} className='password' required onChange={(e) => setPassword(e.target.value)} onBlur={validatePassword}/>
                        <span className='eye-icon' onClick={() => setShowPassword(!showPassword)}>{showPassword ? <Eye /> : <EyeOff />}</span>
                    </div>
                    <label >Confirm Password</label>
                    <div className='password-container'>
                        <input type={showConfirmPassword ? "text" : "password"} className='password' required onChange={(e) => setConfirmPassword(e.target.value)} onBlur={validateConfirmPassword}/>
                        <span className='eye-icon' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <Eye /> : <EyeOff />}</span>
                    </div>
                    <button id="submit-button" type="submit" className='login-button' disabled={isDisabled} >Sign Up</button>
                    <p className='signup'>Already have an Account ? <Link to='/login'>Login</Link></p>
                </form>
                <div className='bike-image'>
                    <img src={bikeImage} alt="bike image" />
                </div>
            </div>
        </>
    );
}

export default SignUp