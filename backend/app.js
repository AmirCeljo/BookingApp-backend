const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors')
const db = require('./db/db');
const path = require('path')


const app = express();
const PORT = 3001;
app.use(cors())
app.use(express.json());


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/', require('./routes/AdminRouter'))
app.use('/', require('./routes/Router'))

// Serve frontend 
// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static(path.join(__dirname,'../frontend/build')))

//     app.get('*',(req,res) => {
//         res.sendFile(path.resolve(__dirname,'../','frontend','build','index.html'))
//     })
// }else{
//     app.get('/',(req,res) => res.send('Please set to production'))
// }


app.listen(process.env.PORT || PORT, console.log('Server started'))


