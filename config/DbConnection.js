const mongoose = require('mongoose')
const dbString = process.env.DBSTRING

mongoose.connect(dbString).then(res => {
    console.log("Database connection success");
}).catch(err => {
    console.log("Database connection Failed",err);
})