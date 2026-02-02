import Vehicle from "../models/vehicle.js";

export const availableVehicles = async (req, res) => {
    try {
        const available = await Vehicle.find({ status: 'Available' });

        const vehicles = available.map((vehicle) => ({
            vehicleId: vehicle.vehicleId,
            battery: vehicle.battery,
            status: vehicle.status,
            latitude: vehicle.location.coordinates[0],
            longitude: vehicle.location.coordinates[1]
        }))

        return res.send({ status: true, message: "Vehicles Available", vehicle: vehicles });
    } catch (error) {
        return res.send({ status: false, message: "Error Fetching Available Vehicles" });
    }
}
