const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require("../models/User")



passport.serializeUser((user,callback)=>{
    callback(null,user._id)
});

passport.deserializeUser(async (id,callback)=>{
    try{
        const user = await  User.findById(id)
        callback(null,user)
    }catch(error){
        //console.log("Error en el deseralizeUser")
        callback(error,null)
    }
});


passport.use(
    new LocalStrategy(
        {
            usernameField: "username"
        },
        async (username, password, callback)=>{
            try{
                const user = await User.findOne({ username })
                if(!user){
                    return callback(null,false,{msg:"Incorrect Username or ..."})
                }
                if(!bcrypt.compareSync(password,user.password)){
                    return callback(null,false,{msg:"Incorrect passowr or  ..."})
                }
                callback(null,user)

            }catch(error){
                callback(error,null)
            }
        }
    )
);


module.exports  = passport