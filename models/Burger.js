const {Schema,model}= require("mongoose")

const burgerSchema = new Schema({

    burgername:{
        type:String,
        required: true,
    },
    category: {
        type: String, 
        enum: ['Cheeseburger (Classic)', 'Smash', 'Veggie', 'Slider','Monster', `Gourmet`,'Other']
    },
    price:{
        type:Number,
        required: true,
    },
    meat:{
        type: Number, 
        enum: [1,2,3,4,5],
    },
    bread:{
        type: Number, 
        enum: [1,2,3,4,5],
    },
    cheese:{
        type: Number, 
        enum: [1,2,3,4,5],
    },
    toppings:{
        type: Number, 
        enum: [1,2,3,4,5],
    },
    fries:{
        type: Number, 
        enum: [1,2,3,4,5],
    },
    picture:{type:String,
    default: "https://res.cloudinary.com/arenagoodgame/image/upload/v1630775685/burgers/tkcgcvkijjf3e5pb9z2c.jpg"}, 
    _restaurant:{
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
     //   required: true
    },
    _owner: {
        type:Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
    //agregar el userid
},{timestamps:true}) 


module.exports = model("Burger",burgerSchema)