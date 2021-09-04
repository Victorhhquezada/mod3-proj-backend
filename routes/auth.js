const { Router } = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User")
const passport = require("../helpers/passport");
const router = Router();
const uploader = require("../helpers/multer");



router.post("/signup",async (req,res,next)=>{
    const {username,password,role,...restUser} = req.body
    try{
        if(!username || !password){
            return res.status(400).json({msg:"Usuario o Contraseña Vacíos"})
        }

        const hasPass = bcrypt.hashSync(password,bcrypt.genSaltSync(12))

        const newUser = await User.create({
                username,
                password:hasPass,
                ...restUser
            })
        res.status(201).json({result:newUser})

    }catch(error){
        res.status(400).json( {error} )
    }
})


router.post("/login",(req,res,next)=>{

    passport.authenticate("local", (error,user,errDetails)=>{
        if(error){
            return res.status(500).json({error})
        }
        if(!user){
            return res.status(500).json({ error: errDetails })

        }

        req.login(user, (err)=>{
            if(err){
                return res.status(500).json({ error: err })
            }
            req.user=user
            res.status(200).json({result:user})
        })
    })(req,res,next)
});

router.get("/logout",(req,res)=>{
    req.user={}
    req.logout()
    res.status(200).json({msg:"Saliendo"})
})


router.get("/current-user",(req,res)=>{
    res.status(200).json({result: req.user || {} })
})

module.exports = router;