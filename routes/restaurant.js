const { Router } = require("express");
const Restaurant = require ("../models/Restaurant")
const router = Router();
const uploader = require("../helpers/multer");



router.post('/createrestaurant',uploader.single("picture"),(req,res, next)=>{
const {_id:_owner}= req.user

let avatar
if(req.file){
  avatar = req.file.path
}

Restaurant.create({...req.body,_owner,picture})
.then(restaurant=> {
res.status(201).json({restaurant});
})
.catch(err => res.status(400).json(err));
})

router.get('/', function(req, res, next){
Restaurant.find()
.then(restaurant=> res.status(201).json({restaurant}))
.catch(error => res.status(400).json(error))
});

router.patch("/edit-restaurant/:id",(req,res,next)=>{
const { id } = req.params
Restaurant.findByIdAndUpdate(id,req.body, {new:true})
.then(
  newRestaurant=>{
      res.status(201).json(newRestaurant)
  }
)
.catch(error=>{
  res.status(400).json({msj:"Algo salio mal",error})
})
})

router.delete('/delete/:id', (req, res, next) => {
const {id} = req.params
Restaurant.findByIdAndDelete(id)
.then(() => res.status(200).json({msj: "Se ha eliminado correctamente"}))
.catch(error => res.status(400).json(error))
})

module.exports = router;