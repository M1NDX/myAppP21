const router = require('express').Router()
const fs = require('fs')
const path = require('path')
const Alumno = require('../models/Alumno')

let alumnos = require("../alumnos.json")

router.get('/', async (req,res)=>{
    let lista = await Alumno.getAlumnos();      //alumnos.slice();
    console.log(req.query);   //  /alumnos?nombre=Juan%20López&edad=20
    let {nombre} = req.query; // {prop1:asdfsdf, pro2: sfd , nombre:'test'}   
    if(nombre){
        lista = lista.filter(a => a.nombre == nombre)
        if(lista.length > 0)
            res.send(lista)
        else   
            res.status(404).send({error: "no existe"})

        return;
    }
    res.send(lista)

})

// /alumnos

router.get('/:id', (req,res)=>{
 let n = Number(req.params.id);
 res.send(alumnos[n])

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
router.post('/', estaAutenticado, (req,res)=>{
    console.log(req.body);
    //req.uid
    
    let {nombre, calificacion } = req.body;

    if(nombre && calificacion){
        alumnos.push({nombre, calificacion})
        fs.writeFileSync(path.join(__dirname,'../alumnos.json'), JSON.stringify(alumnos))
        res.status(201).send()
        return;
    }

    res.status(400).send({error: "faltan datos"})
})

//PUT /:id     
//actualizar alumno
//middleware valide el body 

module.exports = router;

