const { Router } = require("express");
const Burger = require ("../models/Burger")
const router = Router();
const uploader = require("../helpers/multer");


//CREATE
router.post("/createburger",uploader.single("picture"),(req,res,next)=>{

    const {_id:_owner}= req.user

    console.log(req.file)
    
    let picture
    if(req.file){
        picture = req.file.path
    }
  
    Burger.create({...req.body,_owner, picture})
    .then(burger=> {
        res.status(201).json({burger});
     })
     .catch(err => res.status(400).json({err}) );
})


//READ
router.get('/allburgers', function(req, res, next){
    Burger.find()
    .then(burgers=> res.status(201).json({burgers}))
    .catch(error => res.status(400).json(error))
  });



  //hacer un get por id con un parametro y haga busqueda por restaurante
  router.get("/burgerbyrestaruant/:resturant", function (req,res,next){
    const { restaruant } = req.params
    Burger.find({_restaruant:restaruant})
      .then(burgers=> res.status(201).json({burgers}))
      .catch(error => res.status(400).json(error))
  })

  router.get("/burgerbyuser/:user", function (req,res,next){
    const { user } = req.params
    Burger.find({_owner:user})
      .then(burgers=> res.status(201).json({burgers}))
      .catch(error => res.status(400).json(error))
  })


  router.patch("/edit-burger/:id",(req,res,next)=>{
      const { id } = req.params
      Burger.findByIdAndUpdate(id,req.body, {new:true})
      .then(
          newBurger=>{
              res.status(201).json(newBurger)
          }
      )
      .catch(error=>{
          res.status(400).json({msj:"Algo salio mal",error})
      })
  })

  // Delete
router.delete('/delete/:id', (req, res, next) => {
    const {id} = req.params
    Burger.findByIdAndDelete(id)
    .then(() => res.status(200).json({msj: "Se ha eliminado correctamente"}))
    .catch(error => res.status(400).json(error))
})

module.exports = router;