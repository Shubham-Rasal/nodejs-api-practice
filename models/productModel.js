const products = require("../data/data.json")
const { writeDataToFile } = require('../utils')
const { v4: uuidv4 } = require('uuid');




function findAllProducts() {
    return new Promise((resolve, reject) => {
        try {
            resolve(products)
        } catch (error) {
            reject(error);
        }
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        try {
            const product = products.find((p) => p.id === id)
            resolve(product)
        } catch (error) {
            reject(error)
        }
    })
}

function create(body) {
    return new Promise((resolve, reject) => {

        try {
            console.log(body)
            const data = JSON.parse(body)

            const newProduct = { id: uuidv4(), ...data }

            const newProducts = [...products, newProduct];

            writeDataToFile('data/data.json', newProducts)

            resolve(JSON.stringify(newProduct))
        } catch (error) {
            console.log(error)
        }

    })
}
function update(body) {
    return new Promise((resolve, reject) => {

        try {
            const data = JSON.parse(body)
            let i;
            let updatedProducts = products.map((product, index) => {
                if (product.id === data.id) {
                    i = index
                    return data
                }
                return product
            })
            writeDataToFile('data/data.json', updatedProducts)
            resolve(JSON.stringify(updatedProducts[i]))

        } catch (error) {
            console.log(error)
        }

    })
}


function del(body) {
    return new Promise((resolve, reject) => {
        try {

            const id = JSON.parse(body).id
            let isThere = products.find(product => product.id === id)
            if (isThere) {

                let newProducts = products.filter(product => product.id != id)
                writeDataToFile('data/data.json', newProducts)
                resolve(id)
            } else
                resolve("Product id doesn't  exist.")



        } catch (error) {
            console.log(error)
        }
    })
}


module.exports = {
    findAllProducts,
    findById,
    create,
    update,
    del
}