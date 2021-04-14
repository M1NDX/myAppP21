const router = require('express').Router()
const fs = require('fs')
const path = require('path')
const Alumno = require('../models/Alumno')

let alumnos = require("../alumnos.json")

router.get('/', async (req,res)=>{
    console.log(req.query);   //  /alumnos?nombre=Juan%20López&edad=20
    let {nombre, rol, correo} = req.query; // {prop1:asdfsdf, pro2: sfd , nombre:'test'}   
    
    let filtro = {}
    if(nombre)
        filtro.nombre = new RegExp(nombre,'i')
    if(rol)
        filtro.rol = rol;
    if(correo)
        filtro.correo = new RegExp(correo,'i')
 

    let lista = await Alumno.getAlumnos(filtro);      //alumnos.slice();
    //  if(nombre){
    //     lista = lista.filter(a => a.nombre == nombre)
    //     if(lista.length > 0)
    //         res.send(lista)
    //     else   
    //         res.status(404).send({error: "no existe"})

    //     return;
    // }
    res.send(lista)

})

// /alumnos

router.get('/:email', async (req,res)=>{
    let doc = await Alumno.getAlumno(req.params.email)
    res.send(doc)
})

router.get('/nombre/:nombre', (req,res)=>{
let nom = req.params.nombre;
res.send(alumnos.filter(a => a.nombre.toLowerCase() == nom.toLowerCase()))

})

function estaAutenticado(req,res,next){
    if(req.get('x-auth')){
        req.uid = 8;
        next()
        return;
    }

    res.status(401).send({error: "falta token"})
}

//asegurar que tenga el header xauth
router.post('/', estaAutenticado, async (req,res)=>{
    console.log(req.body);
    //req.uid
    console.log(req.body);
    let {nombre, calificacion, correo, carreras, password } = req.body;

    if(nombre && calificacion && correo && carreras && password){
        // alumnos.push({nombre, calificacion})
        // fs.writeFileSync(path.join(__dirname,'../alumnos.json'), JSON.stringify(alumnos))
        // res.status(201).send()
        // return;
        let doc = await Alumno.guardarDatos({nombre, calificacion, correo, carreras, password})
        res.status(201).send(doc)
        return;

    }

    res.status(400).send({error: "faltan datos"})
})

//PUT /:id     
//actualizar alumno
//middleware valide el body 

module.exports = router;

