const jwt = require('jsonwebtoken')

function validarLogin(req,res, next){
    let {correo, password} = req.body;
    if(correo && password){
        next();
    }else{
        res.status(400).send({error: "faltan datos"})
    }
}

function validarBody(req, res, next) {
    let {nombre, calificacion, correo, carreras, password} = req.body
    if(nombre && calificacion && correo && carreras && password) {
        next();
        return;
    }
    res.status(400).send({error: "Hacen falta propiedades"});
}


function estaAutenticado(req,res,next){

    let token =  req.get('x-auth')

    if(token){
        jwt.verify(token, 'DASWP21', (err, decoded)=>{
            if(err){
                console.log(err.name);
                res.status(401).send({error: "Token no válido"})   
            }else{
                console.log(decoded);
                req.correo = decoded.correo;
                next();
            }
        })
    }else{
        res.status(401).send({error: "falta token"})
    }

    
}

module.exports = {validarLogin, validarBody, estaAutenticado}