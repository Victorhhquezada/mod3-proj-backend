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
        typer:Number,
        required: true,
    },
    meat:{
        type: Number, 
        enum: ['1', '2', '3', '4','5'],
    },
    bread:{
        type: Number, 
        enum: ['1', '2', '3', '4','5'],
    },
    cheese:{
        type: Number, 
        enum: ['1', '2', '3', '4','5'],
    },
    toppings:{
        type: Number, 
        enum: ['1', '2', '3', '4','5'],
    },
    fries:{
        type: Number, 
        enum: ['1', '2', '3', '4','5'],
    },
    picture:{type:String}, 
},{timestamps:true}) 


module.exports = model("Burger",burgerSchema)