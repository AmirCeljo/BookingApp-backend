const db = require('../db/db');
const bcrypt = require('bcryptjs')
const store = require('store')

const {register} = require('../repository/userRepository');
const {deletefromcart} = require('../repository/adminRepository')
const { resolve } = require('path');


const registerUser = async(req,res) => {
    
    try {
        const user = req.body;
        const response = await register(user)
        res.status(200).json(response)
        
    } catch (error) {
        console.log(error)
    }
   
}

const loginUser = async (req, res) => {
    try{
        
        const {email,password} = req.body;
        const response = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE email = ? ',
            email, (err, result) => {
                if (err) throw err;
            
                if (result.length > 0) {
                    bcrypt.compare(password, result[0].password, (error, response) => {
                        if(error) return reject(error);
                        if (response) {
                            let obj = {
                                _id: result[0].id,
                                name: result[0].username,
                                email: result[0].email,
                                role: result[0].role,  
                            }
                            resolve(obj) 
                            
                        } else {
                            res.status(400)
                            throw new Error('Invalid credentials')
                        }
                    })
                } else {
                    res.redirect('/login')
                    throw new Error('Taj korisnik ne postoji');
                }
            })
        })
        res.status(200).json(response)
    }catch(error){
        throw error;
    }
   

}


const addToCart = async (req,res) => {

   try {
    const {korisnik,trenutniId} = req.body
    
    const response = await new Promise((resolve,reject) => {
        db.query('INSERT INTO cart(userId,productId) VALUES(?,?)', [korisnik._id,trenutniId], (err,result) => {
            if(err) return reject(err);

            if(result){
                resolve(result)
            }
        })
        
    })
    if(response){
        res.status(200).json(response)
    }
   } catch (error) {
        throw error;
   }
}

const getUserCart = async(req,res) => {
    try{
        const user = req.body;
        console.log(user)
        const response = await new Promise((resolve,reject) => {
            db.query(`SELECT cart.productId,product.id,product.title,product.price,product.description,category.category,category.id,product_img.product_id , product_img.image ,users.id, users.username,users.email
                      FROM cart, product, category, product_img , users WHERE users.id = ${user._id}  AND cart.userId = ${user._id} AND cart.productId = product.id  AND product.categoryId = category.id AND product_img.product_id = product.id 
            `,(err,result) => {
                if(err) return reject(err);
                resolve(result)
            })
        })
        
        res.status(200).json(response)
    }catch(error){
        throw error;
    }
}

const deleteFromCart = async (req,res) => {
        try {
            const {korisnik,trenutniId} = req.body
        
        const response = await deletefromcart(trenutniId)
        res.status(200).json(response)
    
        }catch(error){
            throw error

        }
        
        
        
    
}

module.exports = {
    registerUser,  
    loginUser,
    addToCart,
    getUserCart,
    deleteFromCart
}