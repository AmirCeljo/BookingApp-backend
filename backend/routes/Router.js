const express = require('express');
const router = express.Router()

const {registerUser, loginUser, addToCart, getUserCart, deleteFromCart} = require('../controllers/userControllers')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/addtocart', addToCart)
router.post('/getusercart', getUserCart)
router.post('/deletefromcart', deleteFromCart)

module.exports = router