const router = require("express").Router();
// let products = require("../productos.json")
let Product = require('../models/Product')

router.get('/', async (req,res)=>{
    res.send(await Product.getProducts())
})

router.get('/:id', (req,res)=>{
    let prod = products.find(p => p.id == req.params.id)
    if(prod){
        res.send(prod)
        return;
    }
    res.status(404).send({error: "No existe producto"})
})

router.post('/', async (req,res)=>{
    let {nombre, clave, precio} = req.body;
    if(nombre && clave && precio){
        let doc = await Product.saveProduct({nombre, precio, clave})
        res.status(201).send(doc);
    }else{
        res.status(400).send({error: "faltan datos"})
    }
})

// Pasos en model/Product.js
// crear esquema
// funcion statics para post
// funcion statics para get
// crear el modelo
// exportar el modelo

// pasos en la ruta
// importar el modelo
// crear ruta de post
// validar body
// guardar datos (llamar la función)
// responder con 201

// get
// mandar llamar la funnción de getProductos
// 


module.exports = router;