import Navbar from "../components/navbar";
import UserInfo from "../components/information";
import Security from "../components/security";
import '../styles/pages/profile.css';

function Profile() {
    return (
        <>
            <div id="profile-page">
                <Navbar></Navbar>
                <div id="user-info">
                    <UserInfo></UserInfo>
                </div>
                <div id="security">
                    <Security></Security>
                </div>
            </div>
        </>
    );
}

export default Profile;