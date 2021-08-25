const {Schema,model}= require("mongoose")

const restaurantSchema = new Schema({

    name:{
        type:String,
        unique:true,
        required: true,
    },
    Description:{
        type:String,
        unique:true,
        required: true,
    },
    _burgerReviews:{
        type:Schema.Types.ObjectId,
        ref:"Burger"
    },
    location:{

    },
    avatar:{type:String},


},{timestamps:true}) 


module.exports = model("Restaurant",restaurantSchema)