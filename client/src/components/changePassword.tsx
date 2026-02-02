import { useEffect, useState } from "react";
import axios from "axios";
import '../styles/components/security.css';

function ChangePassword() {

    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isDisabled, setIsDisabled] = useState(true);
    const [message, setMessage] = useState<string>("");

    async function handleChangePassword(e: React.FormEvent<HTMLElement>) {
        e.preventDefault();
        try {
            const response = await axios.patch('http://localhost:8000/changepassword', { oldPassword , newPassword }, { withCredentials: true });
            if(response.data.status){
                setMessage(response.data.message);
            }
            else{
                setError(response.data.message);
            }
        } catch (err) {
            setError("Internal Server Error");
        }
    }

    function validateNew() {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordPattern.test(newPassword)) {
            setError("Password must contain Uppercase Letter, Lowercase Letter, Digit & Special Character");
            return false;
        } else {
            setError("");
            return true;
        }
    }

    useEffect(() => {
        if (oldPassword && validateNew()) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [newPassword, oldPassword])

    return (
        <>
            <div id="password-div">
                {error.length > 0 ? <p className="error-message">{error}</p> : null}
                {message.length > 0 ? <p className="success-message">{message}</p> : null}
                <form onSubmit={handleChangePassword} method="post">
                    <label>Enter previous password</label>
                    <input type="password" onChange={(e) => { setOldPassword(e.target.value) }} required />
                    <label>Enter new password</label>
                    <input type="password" onChange={(e) => { setNewPassword(e.target.value) }} onBlur={validateNew} />
                    <button id="sumit-button" disabled={isDisabled}>Change Password</button>
                </form>
            </div>
        </>
    );
}

export default ChangePassword;