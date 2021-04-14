const mongoose = require('../db/mongodb_connect')

let alumnoSchema = mongoose.Schema({
    nombre: {
        type:String,
        required: true,
        // unique: true
    },
    calificacion: {
        type: Number,
        required: true
    },
    carreras: {
        type: [String],
        required: true,
        enum: ['ISC','ISI']
    },
    correo:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    },
    rol: {
        type:String,
        enum:['USER','ADMIN'],
        required:true
    }
})



alumnoSchema.statics.getAlumnos =  async ()=>{
    let docs = await Alumno.find({}, {_id:0, nombre:1, carreras:1, rol:1, correo:1} );
    console.log(docs);
    return docs;
}

alumnoSchema.statics.guardarDatos = async function(newUser){
    let alumno = new Alumno(newUser);
    let doc = await alumno.save();
    console.log(doc);
    let docs =  await getAlumnos()
    //mostrarAlumnos();
    return doc;
}


let Alumno = mongoose.model('alumno', alumnoSchema);

//guardarDatos({nombre: 'test', calificacion: 8.5, carreras: ['ISC','ISI'], correo:'t@t', password:'test', rol:'ADMIN'})
module.exports = Alumno;
