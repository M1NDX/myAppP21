const express = require("express");
const productRouter = require('./routes/product-route')
const alumnoRouter = require('./routes/alumno-route')
const {log, test} = require('./middlewares/logs')
const authRouter = require('./routes/auth-route')
//express.json()

const app = express();
const port = process.env.PORT || 3000;
             

// app.get('/', (req,res)=>{
//     res.send("Hola mundo!")
// })

app.use(log, test)
app.use(express.static(__dirname+'/public'))
app.use('/student', express.static(__dirname+'/public/alumnos'))
app.use(express.json())
app.use('/api/products', productRouter)
app.use('/api/alumnos', alumnoRouter)
app.use('/api/auth', authRouter)



app.listen(port, ()=>console.log("Ejecutando en puerto "+port))

