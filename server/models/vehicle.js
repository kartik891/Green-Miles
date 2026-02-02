import mongoose from "mongoose";

const VehicleSchema = mongoose.Schema({
    
    vehicleId: {
        type: String,
        required: true,
        unique: true
    },

    battery: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },

    location: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    
    status: {
        type:{
            type: String,
            enum: ['Available', 'In-use', 'Under Maintenance']
        }
    }
})

VehicleSchema.index({ location: "2dsphere" });

export default mongoose.model("Vehicle", VehicleSchema);