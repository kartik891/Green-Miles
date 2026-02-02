import { useNavigate } from 'react-router-dom';
import '../styles/components/hero.css';

function Hero() {

    const navigate = useNavigate();

    return (
        <>
            <div id="hero-container">
                <div id="hero">
                    <p id="hero-title">Make short commutes effortless.</p>
                    <p id="hero-subtitle">Easy access to electric vehicles for fast, flexible & reliable city travel.</p>
                </div>
                <div id="button-div">
                    <button id="ride-button" onClick={() => { navigate('/dashboard')}}>Start a ride</button>
                    <button id="host-button">Become a host</button>
                </div>
            </div>
        </>
    );
}
export default Hero;