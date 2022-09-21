const http = require('http');
const { getAllProducts, getProductById, createProduct, updateProduct , deleteProduct }
    = require('./controllers/productController');





const PORT = process.env.PORT || 5000;




const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;


    if (url === '/products' && method === 'GET') {
        getAllProducts(req, res)
    } else if (url.match(/\/products\/\w+/) && method === 'GET') {
        const id = url.split('/')[2]
        console.log(id)
        getProductById(req, res, id)

    } else if (url === '/products' && method === 'POST') {
        createProduct(req, res)

    } else if (url === '/products/update' && method === 'PUT') {
        updateProduct(req, res)

    } else if (url === '/products/delete' && method === 'DELETE') {
        deleteProduct(req, res)

    } else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify("Data not found!!!"));
    }

});

server.listen(PORT, () => { console.log(`Server listening on port ${PORT} ...`) });