import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import '../styles/components/navbar.css';
import axios from "axios";

function Navbar() {

    const [loggedin, setLoggedin] = useState(false);
    
    useEffect(() => {
        async function checkLogin() {
            const response = await axios.get('http://localhost:8000/checkLogin', { withCredentials: true });

            if (response.data.status) {
                setLoggedin(true);
            } else {
                setLoggedin(false);
            }
        }

        checkLogin();
    }, []);

    return (
        <>
            <div id="navbar">
                <div id="left-side">
                    <p><Link to='/'>Home</Link></p>
                    <p><Link to='/dashboard'>Dashboard</Link></p>
                </div>
                <div id="right-side">
                    <p><Link to='/dashboard'>Start Ride</Link></p>
                    <p>{loggedin ? <Link to='/profile'>Profile</Link> : <Link to='/login'>Login</Link>}</p>
                </div>
            </div>
        </>
    );
}

export default Navbar;