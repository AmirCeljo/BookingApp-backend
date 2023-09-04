const { resolve } = require('path');
const db = require('../db/db');

const deleteproduct = (trenutni_id) => {
    return new Promise( async (resolve,reject) => {
        try {
            // await deletefromcart(trenutni_id)
            const img = await deletefromproductimg(trenutni_id)
            const prod = await deleteprod(trenutni_id)
            
            const cat = await deletecategory(trenutni_id )
            
            resolve('Successfully deleted')
           
            
           
        } catch (error) {
            reject(error)
        }
    })
   
}

const deletefromcart = (deleteTrenutniIdProizvoda) => {
    
    return new Promise((resolve,reject) => {
        db.query(`DELETE FROM cart WHERE productId = ?`,deleteTrenutniIdProizvoda,(err,result)=> {
            if(err) return reject(err)

            resolve(result)
            
        })
    })
}

const deletefromproductimg = (trenutni_id) => {
    return new Promise((resolve,reject) => {
        db.query(`DELETE FROM product_img WHERE product_id = ?`,trenutni_id,(err,result)=> {
            if(err) return reject(err)

            resolve(result)
        })
    })
}

const deleteprod = (trenutni_id) => {
    return new Promise((resolve,reject) => {
        db.query(`DELETE FROM product WHERE id = ?`,trenutni_id,(err,result)=> {
            if(err) return reject(err)

            resolve(result)
        })
    })
}

const deletecategory = (trenutni_id) => {
    return new Promise((resolve,reject) => {
        db.query(`DELETE FROM category WHERE id = ?`,trenutni_id,(err,result)=> {
            if(err) return reject(err)

            resolve(result)
        })
    })
}




const product = (productInfo) => {
    
    
    return new Promise(async(resolve,reject) => {
       try {
            const id = await saveCategory(productInfo)
            const prodId = await saveProduct(productInfo,id)
            await saveImage(productInfo,prodId)
            resolve('Product successfully added')
       } catch (error) {
            reject(error)
       }
    })
}

const saveCategory = (productInfo) => {
    const {category} = productInfo
    return new Promise((resolve,reject) => {
        db.query('INSERT INTO category(category) VALUES(?)',category, 
        (err,result) => {
            if(err) return reject(err);
            resolve(result.insertId)
            
        })
    })
}

const saveProduct = (productInfo,id) => {
    const {title,price,description,address,subject} = productInfo
    return new Promise((resolve,reject) => {
        db.query('INSERT INTO product(title,price,description,categoryId,address,subject) VALUES(?,?,?,?,?,?)',[title,price,description,id,address,subject], 
        (err,result) => {
            if(err) return  reject(err);
            
            resolve(result.insertId)
        })
    })
}

const saveImage = (productInfo,id) => {
    const {image} = productInfo
    return new Promise((resolve,reject) => {
        db.query(`INSERT INTO product_img(product_id, image) VALUES(?,?)`, [id,image], (err,result ) => {
            if(err) return reject(err)

            resolve(result)
        })
    })
   
}


const update = (updateInfo) => {

    return new Promise( async (resolve,reject) => {
        try{
            await updateImg(updateInfo)
            await updateProd(updateInfo)
            resolve("Successfuly updated")
        }catch(error){
            throw error
        }
    })
}

const updateImg = (updateInfo) => {
    const {itemId,updateProd} = updateInfo
    return new Promise((resolve,reject) => {
        db.query(`UPDATE product_img SET image = ?
        WHERE product_id = ?`,[updateProd.update_image,itemId], (err,result) => {
            if(err) return reject(err)

            resolve(result)
        })
    })
}
const updateProd = (updateInfo) => {
    const {itemId,updateProd} = updateInfo
    return new Promise((resolve,reject) => {
        db.query(`UPDATE product SET title = ?,price = ?, description = ?,address = ?,subject = ?
            WHERE id = ?`,[updateProd.update_title,updateProd.update_price,updateProd.update_description,updateProd.update_address, 
                
                updateProd.update_subject,itemId], (err,result) => {
                if(err) return reject(err)

                resolve(result)
            })
    })
}  


module.exports = {
    deleteproduct,
    deletefromcart,
    deletefromproductimg,
    deletecategory,
    deleteprod,
    product,
    saveCategory,
    saveProduct,
    update,
    updateImg,
    updateProd
}