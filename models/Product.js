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


let Product = mongoose.model('Product', productSchema)

async function mostrarProductos(){
    console.log(await Product.getProducts());
}

async function crearProducto(){
     let resp = await Product.saveProduct({nombre: 'mouse', precio: 100.5, clave: 'ASDFADE'})
     console.log(resp);
     mostrarProductos()
}

//crearProducto()

module.exports = Product;
