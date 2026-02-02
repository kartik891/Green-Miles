import Navbar from "../components/navbar";
import Hero from "../components/hero";
import Card from "../components/card";
import Working from "../components/working";
import FinalHome from "../components/finalHome";
import '../styles/pages/home.css';

function HomePage() {
    return (
        <>
            <div className="home-page">
                <Navbar></Navbar>
                <div className="section">
                    <Hero></Hero>
                </div>
                <div className="section">
                    <Card></Card>
                </div>
                <div className="section">
                    <Working></Working>
                </div>
                <div className="section" id="full">
                    <FinalHome></FinalHome>
                </div>
            </div>
        </>
    );
}

export default HomePage;