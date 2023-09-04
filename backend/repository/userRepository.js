const { resolve } = require('path');
const db = require('../db/db');
const bcrypt = require('bcryptjs')
let role = 'user'



// Registruj korisnika

const register =  (user) => {
    
    return new Promise( async (resolve,reject) => {
        try {
            const id = await saveUser(user)
            await saveProfile(user,id) 
            resolve('Profile succesfuly created')
        } catch (error) {
            reject(error)
        }
    })
}

const saveUser = async (user) => {
    const {username,email,password} = user;
    const queryUser = `INSERT INTO users(username,email,password,role)
    VALUES(?,?,?,?)`
    const salt = await bcrypt.genSalt(10)

    return new Promise((resolve,reject) => {
        
   
    bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;

        db.query(queryUser, [username,email,hash,role], (err,result) => {
            if(err) return reject(err);
            resolve( result.insertId)
        })
    });
        
    })
}

const saveProfile = (user, id) => {
    const {username,email,password} = user
    const queryProfile = `INSERT INTO profile(id,email,password,username) VALUES (?,?,?,?)`

    return new Promise((resolve,reject) => {
        db.query(queryProfile, [id ,email,password,username], (err,result) =>{
            if (err) return reject( err);
            resolve(result)
        })
    })
}


// Loguj korisnika

    

module.exports = {
    register,
    saveUser,
    saveProfile
}