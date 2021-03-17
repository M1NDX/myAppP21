const router = require("express").Router();
let products = require("../productos.json")

router.get('/', (req,res)=>{
    res.send(products)
})

router.get('/:id', (req,res)=>{
    let prod = products.find(p => p.id == req.params.id)
    if(prod){
        res.send(prod)
        return;
    }
    res.status(404).send({error: "No existe producto"})
})

module.exports = router;