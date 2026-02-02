import Summary from "../components/summary";
import Map from "../components/map.jsx";
import Navbar from "../components/navbar";
import '../styles/pages/dashboard.css';

function Dashboard() {


    return (
        <>
            <div id="dashboard">
                <Navbar></Navbar>
                <div id="dashboard-content">
                    <div id="summary-section">
                        <Summary />
                    </div>
                    <div id="map-section">
                        <Map />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;