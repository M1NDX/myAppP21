let mongoose = require('mongoose');
let config = require('./config');

console.log(config.getUrl());

mongoose.connect(config.getUrl(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
}).then(()=>console.log("Conectado a la base de datos"))
  .catch((err)=>console.log("no conectado", err))

  
module.exports = mongoose;

