const Product = require('../models/productModel')
const { getRequestBody } = require('../utils')
async function getAllProducts(req, res) {
    try {
        const products = await Product.findAllProducts();
        const stringifiedProducts = JSON.stringify(products);
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(stringifiedProducts);

    } catch (error) {
        console.log(error)
    }
}

async function getProductById(req, res, id) {
    try {
        const product = await Product.findById(id);
        if (!product) {
            res.statusCode = 404
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify("Product not found."));
            return;

        }
        const stringifiedProduct = JSON.stringify(product);
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(stringifiedProduct);
    } catch (error) {
        console.log(error)
    }
}


async function createProduct(req, res) {

    const body = await getRequestBody(req);
    if (body.length == 0) {
        res.end("No product to add.")
        return;
    }
    const result = await Product.create(body);
    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(result)

}
async function updateProduct(req, res) {

    const body = await getRequestBody(req);
    if (body.length == 0) {
        res.end("No product to update.")
        return;

    }
    const result = await Product.update(body);
    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(result)

}

async function deleteProduct(req,res){
    const body = await getRequestBody(req);
    if (body.length == 0) {
        res.end("No product to delete.")
        return;

    }
    const result = await Product.del(body);
    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(JSON.stringify({"status":"deleted",id:result}))

}


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}