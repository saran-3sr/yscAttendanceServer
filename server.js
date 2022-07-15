console.log("checking nodemon ")
const express = require('express')
const mongoose = require ('mongoose')
const { find } = require('./models/eventSchema')
const app = express()
const cors=require('cors')
const eventDetails=require('./models/eventSchema')
const attendanceRegister=require('./models/userAttendanceSchema')
app.use(express.json())
app.use(cors())
//models
// const eventSchema = new mongoose.Schema({
//     eventName:String,
//     eventDate:Number,
//     type:String,
// })
// module.exports=mongoose.model("EventSchema",eventSchema)


//mongodb connect
mongoose.connect("mongodb://127.0.0.1:27017/YsGctAttendance")

//
app.get('/',(req,res)=>{
    console.log("check res")
    res.send("Working")
})

//event creation
//REQ as json file,RES as object id
app.post('/attendance/createEvent',(req,res)=>{
    console.log("create Event")
    const event= new eventDetails({
        eventName:req.body.eventName,
        eventDate:req.body.eventDate,
        type:req.body.type,
        Completed:false
    })
    
    event.save()
    .then((eventDetails)=>{console.log(eventDetails._id);res.send(eventDetails._id)})
    .catch((err)=>{console.log(err);res.send("Event name already exist")})
})
//
//Attendance Register
//REQ as json file , RES
app.post('/attendance/userAttendance/:EventId',(req,res)=>{
const attendance=new attendanceRegister({
    memberName:req.body.memberName,
    attendanceTime:req.body.attendanceTime,
    mobile:req.body.mobile,
    eventId:req.params.EventId
})
attendance.save().then(()=>{console.log("success");res.send("success idiot")})
})
//

//Global API for All events
app.get('/attendance/listOfEvents',(req,res)=>{
    eventDetails.find({},'',function(err,docs){
        console.log(docs.length,docs)
        var count=docs.length
        res.send({docs,count})
    })
})
//
//API to fetch UNCompleted event
app.get('/attendance/unCompleted',(req,res)=>{
    eventDetails.find({Completed:false},'',function(err,docs){
        console.log(docs)
        var unCompletedCount=docs.length
        res.send({docs,unCompletedCount})
    })
})
//


app.listen(5000)
