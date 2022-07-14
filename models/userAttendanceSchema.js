const mongoose=require('mongoose')
const userAttendanceSchema=new mongoose.Schema({
    "memberName":{type:String,required:true},
    "attendanceTime":{type:String,required:true},
    "mobile":{type:Number,required:true},
    "eventId":{type:String,required:true}
})
module.exports=mongoose.model("userAttendanceSchema",userAttendanceSchema)