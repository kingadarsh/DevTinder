
const adminAuth=(req,res,next)=>{
    console.log("I am inside the the Middleware");
    next();
}

module.exports={
    adminAuth:adminAuth
}