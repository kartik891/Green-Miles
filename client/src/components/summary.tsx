import { useEffect, useState } from "react";
import axios from "axios";
import '../styles/components/summary.css';
import { useNavigate } from "react-router-dom";

interface Ride {
    status: string,
    distanceKm: number,
    durationMin: number
}

function Summary() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");
    const [completeRides, setCompleteRides] = useState<number>(0);
    const [distance, setDistance] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);

    const navigate = useNavigate();

    const cards = [
        {
            title: "Rides Completed",
            amount: completeRides 
        },
        {
            title: "Total Distance Travelled",
            amount: distance + " Km"
        },
        {
            title: "Total Time Spent on Travel",
            amount: duration + " min"
        }
    ]

    useEffect(() => {

        async function getSummary() {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8000/userSummary`, { withCredentials: true });

                if (response.data.status) {
                    const rides: Ride[] = response.data.rides;

                    const completed = rides.filter((ride) => ride.status === 'Completed');
                    setCompleteRides(completed.length);

                    const travelled = rides.reduce((sum, ride) => sum + (ride.distanceKm || 0), 0);
                    setDistance(travelled);

                    const time = rides.reduce((sum, ride) => sum + (ride.durationMin || 0), 0);
                    setDuration(time);

                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                setError("Internal Server Error");
            }
            finally {
                setLoading(false);
            }

        }

        getSummary();

    }, []);

    function navigateLogin(){
        navigate('/login');
    }

    if (loading) {
        return (<p className="loading">Loading...</p>)
    }

    return (
        <>
            {error.length > 0 ? <button onClick={navigateLogin}id="login-message">Login to view the stats</button> : null}
            <div id="summary-container">

                {cards.map((card, index) => (
                    <div key={index} id="summary-card">
                        <p id="card-title">{card.title}</p>
                        <p id="card-value">{card.amount}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Summary;