const { log } = require('console');
const mongoose = require('mongoose')
const db = mongoose.connection

mongoose.connect('mongodb+srv://laxsavani:laxsavani@cluster0.ykxfhke.mongodb.net/BFF')

db.once('open',(err)=>{
    if(err)
    {
        console.log('DataBase Not Connected: '+err);
    }
    console.log("DataBase MongoDb Connected");
})