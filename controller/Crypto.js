const Crypto = require("../models/Crypto");
const mongoose = require("mongoose");

exports.addCryptoCoins = async (req,res)=>{
    try{
        let data = await Crypto.create({
            firstcoin:req.body.firstcoin,
            secondcoin:req.body.secondcoin
        })
        res.status(200).json({data:data , status:true})
    }catch(e){
   console.log(e.message)
    }
}