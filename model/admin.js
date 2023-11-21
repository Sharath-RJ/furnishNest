const mongoose=require('mongoose')

const Schema=mongoose.Schema

const adminModel=new Schema({
    name:String,
    email:String,
    password:String
})


const admin= mongoose.model('Admin',adminModel)
module.exports=admin
