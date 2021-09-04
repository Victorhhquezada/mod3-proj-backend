const {Schema,model}= require("mongoose")

const restaurantSchema = new Schema({

    name:{
        type:String,
        unique:true,
        required: true,
    },
    description:{
        type:String,
        unique:true,
        required: true,
    },
    //location:{

//    },
    avatar:{type:String},
    _owner: {
        type:Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{timestamps:true}) 


module.exports = model("Restaurant",restaurantSchema)