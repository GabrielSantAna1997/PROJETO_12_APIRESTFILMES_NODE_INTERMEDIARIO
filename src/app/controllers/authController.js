const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models/User');
const jwt = require("jsonwebtoken")
const authConfig = require("../../config/auth.json")


const router = express.Router();


function gerenateToken(params = {}) {
    return jwt.sign(params, authConfig.secret , {
        expiresIn: 50000,
    });
}


//registro do login
router.post('/register', async (req, res) =>{
const {email} = req.body;

    try{
        if(await User.findOne({email})){
            return res.status(400).send ({status: "400 Bad Request", error: "Usuário já existente"})
        }

        const user = await User.create(req.body);
        //remover para nao aparecer a senha
        user.password = undefined;
        user.__v= undefined;
        return res.send ({
            user,
            token: gerenateToken({id: user._id}),
        });
    } catch(err){
        return res.status(400).send({status: "400 Bad Request", error: 'Registro falhou'})
    }
});

//autenticação do login

router.get("/authenticate", async (req,res)=>{
    const {email, password} = req.body;


    const user = await User.findOne({email}).select("+password");

    if(!user){
        return res.status(400).send ({status: "400 Bad Request", error: "Usuario não existe"})
    }
    
    if(!await bcrypt.compare(password, user.password)){
        return res.status(400).send ({status: "400 Bad Request", error: "senha invalida"})
    }

    //remover para nao aparecer a senha
    user.password = undefined;
    user.__v = undefined;
    user.createdAt = undefined;

    res.send({user, token: gerenateToken({id: user._id})
        });
})

module.exports = app => app.use('/auth', router)