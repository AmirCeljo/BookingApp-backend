const express = require('express');
const router = express.Router()

const {addProduct,getProduct,deleteProduct,updateProduct} = require('../controllers/adminController')


router.post('/addProduct', addProduct)
router.get('/getProduct', getProduct)
router.post('/deleteProduct', deleteProduct)
router.post('/updateProduct', updateProduct)

module.exports = router