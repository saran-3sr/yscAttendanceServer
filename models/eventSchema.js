const mongoose=require('mongoose')

const eventSchema = new mongoose.Schema({
    eventName:{
        type:String,
        unique:true,
        required:true
    },
    eventDate:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    Completed:{
        type:Boolean,
        required:true
    }
})
module.exports=mongoose.model("EventSchema",eventSchema)