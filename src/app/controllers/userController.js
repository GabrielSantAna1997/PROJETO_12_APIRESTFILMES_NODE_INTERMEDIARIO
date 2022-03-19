const express = require('express')
const User = require('../models/User');
const router = express.Router();

router.get('/lista', async (req, res) =>{
    User.find({order: [["_id", 'DESC']]}).then((user) =>{
            user.__v= undefined;  
            return res.json(user)
        }).catch((erro) => {
            return res.status(400).json({
                error:true,
                message:"Nenhum filme cadastrado"
            })
        })
});

module.exports = app => app.use('/user', router)