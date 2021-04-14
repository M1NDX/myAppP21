const { model } = require('mongoose');
const mongoose = require('../db/mongodb_connect')

let alumnoSchema = mongoose.Schema({
    nombre: {
        type:String,
        required: true
    },
    calificacion: {
        type: Number,
        required: true
    }
})

let Alumno = mongoose.model('alumno', alumnoSchema);

async function getAlumnos(){
    let docs = await Alumno.find({});
    console.log(docs);
    return docs;
}

async function guardarDatos(newUser){
    let alumno = new Alumno(newUser);
    let doc = await alumno.save();
    console.log(doc);
    //mostrarAlumnos();
    return doc;
}

//guardarDatos({nombre: 'María', calificacion: 10})
module.exports = Alumno;
