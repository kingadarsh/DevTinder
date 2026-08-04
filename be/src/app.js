const {adminAuth}=require('./middlewares/auth');
const express=require("express");
require("dotenv").config();
const connectToDb=require('./config/database');
const User = require('./models/userSchema');
const PORT=process.env.PORT;
const app=express();
app.use(express.json())




app.post('/signup', async (req,res)=>{
    const userObj=req.body;

    const user=new User(userObj);
    try{
        await user.save();
        res.json({
            msg:"Data sent to the database safely",
            obj:userObj
        });
    }
    catch(err){
        throw new Error(`There was an error : ${err.message}`);
    }
});


app.get('/feed',async (req,res)=>{
    const {firstName,age}=req.query;
    // console.log(name)
    
    try{
        const response=await User.findOne({firstName:firstName}).where("age").gt(age);
        if(response){
            return res.json({
                res:response
            })
        }
        else{
            res.send("User not found")
            throw new Error("User not found");
        }

    }
    catch(err){
        console.error("There was an error");
    }

});


app.use('/delete',async (req,res,next)=>{
    const emailId=req.query.emailId;
    try{
        const resp=await User.findOne({emailId:emailId});
        req.resp=resp;
        next();
    }catch(err){
        console.error("There was an error");
        return;
    }
});

app.delete('/delete', async (req,res)=>{
    const id=req.resp.id;
    if(id===undefined){
        console.log("Id is not given");
        res.send("The id is undefined");
    }
    try{
        await User.findByIdAndDelete(id)
        res.send("Deleted successfully");
    }
    catch(err){
        console.error("There was error deleting a document");
    }
})


app.use('/update',async (req,res,next)=>{
    const emailId=req.query.emailId;
    try{
        const resp = await User.findOne({emailId:emailId});
        if(resp===null){
            res.status(404).send("NO user email found");
            return;
        }
        req.resp=resp;
        next();
    }
    catch(err){
        console.log("There was an error in the emailId fetch : "+err);
    }

})


app.put('/update', async (req,res)=>{
    console.log(req.resp);
    // console.log(req.resp.id);
    const id=req.resp.id;

    const {firstName}=req.body;
    console.log(firstName)

    try{
        await User.findByIdAndUpdate(id,{firstName:firstName});
        res.send("Done successfully");
    }
    catch(er){
        console.error("Unable to update there was a problem");
    }




})




connectToDb()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`The app is listening on http://localhost:${PORT}`)
    })
})



