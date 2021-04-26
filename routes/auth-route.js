const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Alumno = require("../models/Alumno");
const validaciones = require('../middlewares/validaciones')

console.log("cargando auth-router.js");

router.post('/login', validaciones.validarLogin, async (req,res)=>{
    //buscar alumno con ese correo
    let alumno = await Alumno.getAlumno(req.body.correo)
    if(alumno){
         //comparar el password con el hash de la base de datos
        if(bcrypt.compareSync(req.body.password, alumno.password)){
            //generación del token
            let token= jwt.sign({correo: alumno.correo},'DASWP21', {expiresIn: '1h'})
            res.send({token: token})
        }else{
            res.status(401).send({error: "password incorrecto"})
        }
    }else{
        res.status(404).send({error: "No existe ese alumno"})
    }

})

router.get('/logout',(req,res)=>{})

module.exports = router;