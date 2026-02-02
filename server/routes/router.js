import express from "express";
import { handleSignUp } from '../controller/signup.js';
import { authorizeLogin } from "../middleware/loginMiddleware.js";
import { dashboardData } from "../controller/dashboard.js";
import { handleLogin } from "../controller/login.js";
import { availableVehicles } from "../controller/availableVehicles.js";
import { getRideData } from "../controller/rideData.js";
import { checkLogin } from "../controller/checkLogin.js";
import { changePassword } from "../controller/changePassword.js";
import { handleLogout } from "../controller/logout.js";
import { handleDelete } from "../controller/delete.js";
import { handleDeviceLogout } from "../controller/devicelogout.js";
import { startRide } from "../controller/startRide.js";

const router = express.Router();

router.post('/signup', handleSignUp)
router.get('/dashboard', authorizeLogin, dashboardData);
router.post('/login', handleLogin);
router.get('/vehicles', availableVehicles);
router.get('/userSummary', authorizeLogin, getRideData);
router.get('/checkLogin', checkLogin);
router.patch('/changePassword', authorizeLogin, changePassword);
router.get('/logout', authorizeLogin, handleLogout);
router.get('/delete', authorizeLogin, handleDelete);
router.get('/devicelogout', authorizeLogin, handleDeviceLogout);
router.post('/startride', authorizeLogin, startRide);

export default router;