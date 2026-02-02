import { useState } from "react";
import ChangePassword from "./changePassword";
import axios from "axios";
import '../styles/components/security.css';

function Security() {

    const [changePassword, setChangePassword] = useState(false);
    const [LogoutMessage, setLogoutMessage] = useState<string>("");
    const [LogoutError, setLogoutError] = useState<string>("");
    const [deleteMessage, setDeleteMessage] = useState<string>("");
    const [deleteError, setDeleteError] = useState<string>("");

    async function handleLogout() {
        try {
            const response = await axios.get('http://localhost:8000/logout', { withCredentials: true });

            if (response.data.status) {

                setLogoutMessage(response.data.message);
            } else {
                setLogoutError(response.data.message);
            }
        }
        catch (err) {
            setLogoutError("Internal Server Error");
        }
    }

    async function handleCurrentLogout() {
        try {
            const response = await axios.get('http://localhost:8000/devicelogout', { withCredentials: true });

            if (response.data.status) {
                setLogoutMessage(response.data.message);
            } else {
                setLogoutError(response.data.message);
            }
        }
        catch (err) {
            setLogoutError("Internal Server Error");
        }
    }

    async function handleDelete() {
        try {
            const response = await axios.get('http://localhost:8000/delete', { withCredentials: true });
            if (response.data.status) {
                setDeleteMessage(response.data.message);
            } else {
                setDeleteError(response.data.message);
            }
        } catch {
            setDeleteError("Internal Server Error");
        }
    }

    return (
        <>
            <div id="security-container">

                <h2>Security</h2>

                <div id="password-change">
                    <button id="change-toggle" onClick={() => { setChangePassword(!changePassword) }}>{changePassword ? "Cancel Change Password" : "Change Password"}</button>
                    {changePassword ? <ChangePassword></ChangePassword> : null}
                </div>
                <div id="logout-div">
                    <h2>Logout:</h2>
                    {LogoutError.length > 0 ? <p className="error-message">{LogoutError}</p> : null}
                    {LogoutMessage.length > 0 ? <p className="success-message">{LogoutMessage}</p> : null}
                    <div id="logout-button-div">
                        <button className="logout-button" onClick={handleLogout}>Logout of all Sessions</button>
                        <button className="logout-button" onClick={handleCurrentLogout}>Logout Current Session</button>
                    </div>
                </div>
                <div id="delete-account">
                    <p id="delete-heading">Delete Account:</p>
                    {deleteError.length > 0 ? <p className="error-message">{deleteError}</p> : null}
                    {deleteMessage.length > 0 ? <p className="success-message">{deleteMessage}</p> : null}
                    <button id="delete-button" onClick={handleDelete}>Delete Account</button>
                </div>
            </div>
        </>
    );
}

export default Security;