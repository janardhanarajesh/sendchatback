
import express  from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import cors from "cors"
import multer from "multer"
import nodemailer from 'nodemailer'
import User from "./models/registration.js"
import Mutual from "./models/cont.js"

const app=express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
mongoose.connect("mongodb+srv://janardhanarajesh2:IA1B2uyQ0FZp4l1s@cluster0.eehav6z.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>app.listen(2006))
.then(()=>console.log('connected to data base & listning to 2006'))
app.use('/test',(req,res,next)=>
{
    res.send('working properly')
})

app.post("/register",(req,res,next)=>{
    const{name,password,mail}=req.body
    const user=new User({
        name,
        password,
        mail,

    })
    try{
        user.save();
        return res.status(200).json({msg:"registred successfully"})
        
    }
    catch(err)
    {
        return res.status(200).json({msg:"registraion not success"})
    }
})

app.get('/checkdata/:name', async (req, res, next) => {
    const _name = req.params.name;
 

    try {
        let faclog = await User.find({ name: _name });

        if (faclog.length === 0) {
            return res.status(241).json({ msg: 'no' });
        }
        else{
            return res.status(241).json({ msg: 'yes' });

        }

    } 
    catch (err) { 
        console.error(err);
        return res.status(504).json({ msg: 'Internal server error' });
    }
});

app.get('/findata/:user/:pass', async (req, res, next) => {
    const _name = req.params.user;
    const _pass=req.params.pass
 

    try {
        let xser = await User.find({ name: _name ,password:_pass});
        if (xser.length === 0) {
            return res.status(241).json({ msg: 'no' });
        }
        else{
        let ids=xser[0]._id;

            return res.status(241).json({ msg: 'yes',ids });

        }

    } 
    catch (err) { 
        console.error(err);
        return res.status(504).json({ msg: 'Internal server error' });
    }
});
// app.get('/findata/:user/:pass',async (req, res, next) => {
//     const _name=req.params.user;
//     const _pass=req.params.pass;
//     console.log(_name,_pass)
//     try{
//         let xser=await User.find({name:_name,password:_pass});
//         let ids=xser[0]._id;

//         if(xser.length==0)
//             {
//                 return res.status(243).json({msg:"no"});
//             }
//             else{
//                 // console.log(ids)
//                 return res.status(200).json({msg:"yes",ids});
//             }
//     }
//     catch (err){
//        return res.status(401).json({msg:"error"});
//     }

// })

app.get("/friend",async(req,res,next)=>{
    try{
        let friend=await User.find();
        if(friend.length==0)
            {
                return res.status(243).json({msg:"no"});
            }
            else{
                return res.status(243).json({msg:"yes",friend});

            }
       
    }
    catch(err)
    {
        console.log("error")
    }
})

app.put("/cont/:x",async(req,res,next)=>{
    try{
        const Yid=req.params.x;
        let status="connected"
        let friend=await User.findByIdAndUpdate(Yid,{
            status
        });
        friend.save();
  console.log(friend)
                return res.status(243).json({msg:"yes",friend});
            
            

            
    }
    catch(err)
    {
        console.log("error");
    }
})

app.get("/fsat/:x",async(req,res,next)=>{
    const fast=req.params.x;
    try{
        let frest=await User.find({_id:x});
    if(frest.status=="connectd")
alert("")

    }
    catch(err)
    {

    }

})
app.post("/connection/:x/:user",(req,res,next)=>{
    let id1=req.params.x
    let id2=req.params.user
    const newcont= new mutual({
        id1,
        id2
    })
    try{
        newcont.save()
        return res.status(243).json("connected");
    }
    catch(err)
    {
        return res.status(243).json("error")
    }
})


app.post("/postchat",(req,res,next)=>{
    const{sender,reciver,chating}=req.body
    // const{reciver}=req.body

    // const{dat}=req.body
    // console.log(reciver,sender,dat)
    let chat=new Mutual({
        reciver,
        sender, 
        chating
    });
    try{
chat.save();
return res.status(243).json({msg:"sent"});


    }
    catch(err){
return res.status(243).json({msg:"not sent"})
    }

})
app.get("/getchat/:sender/:reciver",async(req,res,next)=>{
    const Sender=req.params.sender;
    const Reciver=req.params.reciver;
    try{
        let chat=await Mutual.find({
            $or:[
                {sender:Sender,reciver:Reciver},
                {sender:Reciver,reciver:Sender}
                
            ]
        });
        let x=Mutual.sender
    
        return res.status(243).json({msg:"chat",chat,Sender,Reciver})

    }
    catch(err)
    {
        return res.status(243).json({msg:"new chat"})
    }
})
app.delete('/delchat/:kl',async(req,res,next)=>
    {
      let id=req.params.kl
      try{
        let dat=await Mutual.findByIdAndDelete(id);
        return res.status(243).json({msg:"deleted"})
      }
      catch(err)
      {
        console.log('error')
      }
    })
