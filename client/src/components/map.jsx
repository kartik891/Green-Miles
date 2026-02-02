import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import markerImage from '../assets/userMarker.png';
import vehicleImage from '../assets/vehicleMarker.png';
import selectionMarker from '../assets/selectionMarker.png';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/components/map.css";

function Map() {
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [mapError, setMapError] = useState(null);
    const [vehicleError, setVehicleError] = useState(null);
    const [message, setMessage] = useState(null);
    const [otp, setOtp] = useState(null);

    function generateOTP() {

        const digits = '0123456789';
        let OTP = '';
        let len = 10;
        for (let i = 0; i < 4; i++) {
            OTP += digits[Math.floor(Math.random() * len)];
        }

        return OTP;
    }

    const userMarker = L.icon({
        iconUrl: markerImage,
        iconSize: [30, 30],
    });

    const vehicleMarker = L.icon({
        iconUrl: vehicleImage,
        iconSize: [30, 30]
    })

    const selectedMarker = L.icon({
        iconUrl: selectionMarker,
        iconSize: [30, 30]
    });

    async function handleStartRide() {
        if (!selectedVehicle) {
            setVehicleError("Select a vehicle to begin the Journey!");
            return;
        }

        try {

            const newOtp = generateOTP();
            setOtp(newOtp);

            const response = await axios.post('http://localhost:8000/startride', { vehicleId: selectedVehicle.vehicleId, otp: newOtp }, { withCredentials: true });

            if (response.data.status) {


                if (!newOtp) {
                    setVehicleError("Error while generating OTP");
                } else {
                    setVehicleError("");
                    setMapError("");
                }

            } else {
                setVehicleError(response.data.message);
            }

        } catch (err) {
            setVehicleError("Internal Server Error");
        }
    }

    function displayVehicle() {
        return (
            <>
                <div id="vehicle-details">
                    <p id="vehicle-id">Vehicle Id: {selectedVehicle.vehicleId}</p>
                    <p id="vehicle-battery">Battery: {selectedVehicle.battery}</p>
                    {message ? <p className="success-message">{message}</p> : null}
                </div>
            </>
        );
    }

    useEffect(() => {

        navigator.geolocation.getCurrentPosition((pos) => {
            setLatitude(pos.coords.latitude);
            setLongitude(pos.coords.longitude);
        }, () => {
            setMapError("Unable to get current location")
        })

    }, [])

    useEffect(() => {

        if (latitude && longitude && mapRef.current) {
            mapRef.current.setView([latitude, longitude], 13);

            L.marker([latitude, longitude], { icon: userMarker }).addTo(mapRef.current);

        }

        async function getVehicleData() {

            try {
                const response = await axios.get('http://localhost:8000/vehicles');
                if (response.data.status) {
                    const locationArray = response.data.vehicle;

                    let activeMarker = null;

                    locationArray.map((vehicle) => {
                        const marker = L.marker([vehicle.latitude, vehicle.longitude], { icon: vehicleMarker }).addTo(mapRef.current);

                        marker.addEventListener('click', () => {
                            if (activeMarker) {
                                activeMarker.setIcon(vehicleMarker);
                            }

                            marker.setIcon(selectedMarker);
                            activeMarker = marker;

                            setSelectedVehicle(vehicle);
                        })
                    })


                } else {
                    setMapError(response.data.message);
                }
            } catch (error) {
                setMapError("Error while getting the vehicle data");
            }
        }

        getVehicleData();

    }, [latitude, longitude])

    useEffect(() => {

        if (!mapContainerRef.current) return;

        mapRef.current = L.map(mapContainerRef.current).setView(
            [18.52, 73.87],
            13
        );

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: "&copy; OpenStreetMap contributors",
        }).addTo(mapRef.current);

        return () => {
            mapRef.current?.remove();
        };
    }, []);

    return (
        <>
            {mapError ? <p>{mapError}</p> : null}
            <div id="map" ref={mapContainerRef} />
            <div id="select-ride-div">
                {vehicleError ? <p className="error-message">{vehicleError}</p> : null}
                {selectedVehicle ? displayVehicle() : null}
                {otp ? <p>Enter OTP to start the ride: {otp}</p> : <button onClick={handleStartRide} id="select-ride">{selectedVehicle ? "Start Ride" : "Select ride to start"}</button>}

            </div>
        </>
    );
}

export default Map;
