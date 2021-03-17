const express = require("express");
const productRouter = require('./routes/product-route')
const alumnoRouter = require('./routes/alumno-route')

//express.json()

const app = express();
const port = 3000;

app.get('/', (req,res)=>{
    res.send("Hola mundo!")
})

let log = (req,res,next)=>{
    console.log(req.method);
    console.log(req.url);
    next()
}

app.use(log)
app.use(express.json())
app.use('/products', productRouter)
app.use('/alumnos', alumnoRouter)


app.listen(port, ()=>console.log("Ejecutando en puerto "+port))

// ! JSON productos  nombre, precio, id
// ! get /products/:id   product not found
// ! /products   todos o filtros  ?min =10&max =20  ?min=10  ?max=20


// ! leer header
// ! leer 