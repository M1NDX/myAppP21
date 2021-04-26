const mongoose = require('../db/mongodb_connect')

let alumnoSchema = mongoose.Schema({
    nombre: {
        type:String,
        required: true,
        //unique: true
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
    productos: {
        type:[String],
        ref: 'Product'
    },
    rol: {
        type:String,
        default: 'USER',
        enum:['USER','ADMIN'],
        required:true
    }
})



alumnoSchema.statics.getAlumnos =  async (filtro)=>{
    let docs = await Alumno
                    .find(filtro, {_id:0, nombre:1, carreras:1, rol:1, correo:1} )
                    .sort({nombre: -1})
                   //.skip(5)
                   // .limit(Infinity)
                    
    console.log(docs);
    return docs;
}


alumnoSchema.statics.guardarDatos = async function(newUser){
    let alumno = new Alumno(newUser);
    try{
        let doc = await alumno.save();
        console.log(doc);
        return doc;
    }catch(e){
        console.log("Error al guardar" ,e.code);
        // throw e;
        return {error: 'Usuario repetido'};
    }
    
   
    //let docs =  await getAlumnos()
    //mostrarAlumnos();
    //return doc;
}

alumnoSchema.statics.updateDatos = async function(correo, datos ){
    let doc = await Alumno.findOneAndUpdate(
           {correo},
           {$set: datos },
           {new: true, useFindAndModify: false} );
    return doc;
}

alumnoSchema.statics.getAlumno = async correo => {
    let doc = await Alumno.findOne({correo})
    //let doc = await Alumno.findById(id)
    return doc;
}


let Alumno = mongoose.model('alumno', alumnoSchema);

//guardarDatos({nombre: 'test', calificacion: 8.5, carreras: ['ISC','ISI'], correo:'t@t', password:'test', rol:'ADMIN'})
module.exports = Alumno;


async function updateAlumno(){
   let doc = await Alumno.updateDatos('t4@t', {nombre: 'Juan'}) 
   console.log(doc);
}

//updateAlumno()