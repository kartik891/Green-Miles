export const dashboardData = async (req, res) =>{
    
    res.send({status: true, message: "Hi from dashboard", user: req.user});

}