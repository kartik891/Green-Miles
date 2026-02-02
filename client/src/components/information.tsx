import axios from "axios";
import { useEffect, useState } from "react";
import '../styles/components/information.css';

interface User{
    username: string,
    email: string
}

function UserInfo(){

    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        async function getDetails(){
            try{
                const response = await axios.get('http://localhost:8000/checkLogin', { withCredentials: true });

                if(response.data.status){
                    setUser(response.data.user);
                }
            }
            catch(err){
                setError("Internal Server Error");
            }finally{
                setLoading(false);
            }
        }

        getDetails();

    }, []);

    if(loading){
        return <p>Loading...</p>
    }

    return(
        <>
            <div id="user-details">
                {error.trim().length > 0 ? <p>{error}</p> : null}
                <h2 id="heading">User Information</h2>
                <p>Email: {user?.email}</p>
                <p>Username: {user?.username}</p>
            </div>
        </>
    );
}

export default UserInfo;