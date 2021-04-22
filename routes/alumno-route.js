const router = require('express').Router()
const fs = require('fs')
const path = require('path')
const bcrypt = require('bcryptjs')
const validaciones = require('../middlewares/validaciones')

const Alumno = require('../models/Alumno')


let alumnos = require("../alumnos.json")



router.get('/', validaciones.estaAutenticado ,async (req,res)=>{
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


//asegurar que tenga el header xauth
router.post('/', async (req,res)=>{
    console.log(req.body);
    //req.uid
    console.log(req.body);
    let {nombre, calificacion, correo, carreras, password } = req.body;

    if(nombre && calificacion && correo && carreras && password){
        // alumnos.push({nombre, calificacion})
        // fs.writeFileSync(path.join(__dirname,'../alumnos.json'), JSON.stringify(alumnos))
        // res.status(201).send()
        // return;
        let hash = bcrypt.hashSync(password,8);

        let doc = await Alumno.guardarDatos({nombre, calificacion, correo, carreras, password:hash})
        if(doc && !doc.error ){
            res.status(201).send(doc)
        }else{
            res.status(400).send(doc)
        }
        return;
    }

    res.status(400).send({error: "faltan datos"})
})

router.put('/:email', async (req,res)=>{
    let doc = await Alumno.updateDatos(req.params.email, req.body);
    res.send(doc)
})



//PUT /:id     
//actualizar alumno
//middleware valide el body 

module.exports = router;

