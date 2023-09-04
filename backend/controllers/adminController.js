const db = require('../db/db');

const {product} = require('../repository/adminRepository')
const {deleteproduct } = require('../repository/adminRepository');
const {update } = require('../repository/adminRepository');

const { resolve } = require('path');
const addProduct = async (req,res) => {
    
    try {
        const productInfo = req.body
        const response = await product(productInfo)
        res.status(200).json(response)
    } catch (error) {
        throw error
    }
}

const deleteProduct = async (req,res) => {

    try {
        const {korisnik,trenutniId} = req.body
        
        const response = await deleteproduct(trenutniId)
        res.status(200).json(response)
    } catch (error) {
        throw error
    }
}

const updateProduct = async(req,res) => {
    try{
        const updateInfo = req.body
        console.log(updateInfo)

        const response = await update(updateInfo)
        res.status(200).json(response)
    }
    catch(error){
        throw error;
    }
}


const getProduct = async (req,res) => {
    try {
        const response = await new Promise((resolve,reject) =>{
            db.query(`
                SELECT * FROM category,properties,propertyimg WHERE category.id = properties.category_id AND propertyimg.id = properties.image_id `, (err,result) => {
                    if(err) return reject(err);
                    
                    resolve(result)
                    
            })
        })
        res.status(200).json(response)
    } catch (error) {
        throw error;
    }
    
}

module.exports = {
    addProduct,
    getProduct,
    deleteProduct,
    updateProduct
}