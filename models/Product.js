const mongoose = require('../db/mongodb_connect')


let productSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    clave: {
        type: String,
        required: true,
        unique: true
    },
})

productSchema.statics.getProducts = async ()=>{
    return await Product.find({});
} 

productSchema.statics.saveProduct = async (producto)=>{
    
    let product = new Product(producto);
    let doc = await product.save()
    return doc;
}

productSchema.statics.updateProduct = async (id, producto)=>{
   let doc = await Product.findById(id);
   if(doc){
    let docr = await Product.findByIdAndUpdate(id, {$set: producto}, {new: true, useFindAndModify: false } )
    return docr;
   }else{
       console.log("Producto no existe");
       return {error: "NO existe"};
   }
   
  
}


let Product = mongoose.model('Product', productSchema)

async function mostrarProductos(){
    console.log(await Product.getProducts());
}

async function crearProducto(){
     let resp = await Product.saveProduct({nombre: 'mouse', precio: 100.5, clave: 'ASDFADE'})
     console.log(resp);
     mostrarProductos()
}

async function updateProducto(id, datos){
    let resp = await Product.updateProduct(id,datos)
    console.log(resp);
}

//crearProducto()
//updateProducto('607db7849bc5986da01a0767', {nombre: "smartphone", precio: "10000"})

module.exports = Product;
