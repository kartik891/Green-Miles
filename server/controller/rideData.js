import mongoose from "mongoose";
import Ride from "../models/ride.js";

export const getRideData = async (req, res)=>{

    const { userId }  = req.user;
    
    try{

        const rides = await Ride.find({ userId: userId });

        if(rides && rides.length > 0){
            return res.send({status: true, message: "Rides Fetches Successfully!", rides: rides, user: req.user});
        }
        else{
            return res.send({status: true, message: "The user has not start any ride yet."});
        }
    }
    catch(error){
        return res.send({status: false, message: "Error getting the ride Data"});
    }
}