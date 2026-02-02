import Vehicle from "../models/vehicle.js";

export const startRide = async (req, res) => {
    const { vehicleId } = req.body;

    if (!vehicleId) {
        return res.send({ status: false, message: "Vehicle not selected" });
    }

    try {
        const selectVehicle = await Vehicle.findOneAndUpdate({ vehicleId: vehicleId, status: "Available" }, { status: "In-use"}, { new: true });

        if (!selectVehicle) {
            return res.send({ status: false, message: "Ride not available" });
        }

        return res.send({ status: true, message: "Ride confirmed!" });
    } catch (err) {
        console.log(err);
        return res.send({ status: false, message: "Selected Ride is under maintenance" });
    }
}