import mongoose from "mongoose";

const RideSchema = mongoose.Schema({
    rideId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    vehicleId: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['Completed', 'In-progress', 'Cancelled']
    },
    startLocation: {
        type: {
            type: String,
            enum: ["Point"]
        },
        coordinates:{
            type: [Number]
        }
    },
    endLocation: {
        type: {
            type: String,
            enum: ["Point"]
        },
        coordinates:{
            type: [Number]
        }
    },
    distance:{
        type: Number
    },
    duration: {
        type: Number
    },
    cost: {
        type: Number
    }
})

RideSchema.index({ location: "2dsphere" });

export default mongoose.model("Ride", RideSchema);