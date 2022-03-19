const express = require('express')
const Filmes = require('../models/Filmes');
const router = express.Router();



//registro do filme
router.post('/register', async (req, res) =>{
const {titulo} = req.body;

    try{
        if(await Filmes.findOne({titulo})){
            return res.status(400).send ({status: "400 Bad Request", error: "Filme já existe"})
        }
        if(await Filmes.findOne({titulo})){
            return res.status(400).send ({status: "400 Bad Request", error: "Id do filme ja existe"})
        }
        const filmes = await Filmes.create(req.body);
        filmes.alugado = undefined;
        filmes.__v = undefined;
        return res.send ({filmes});
    } catch(err){
        return res.status(400).send({status: "400 Bad Request", error: 'Registro falhou'})
    }
});


router.get('/lista', async (req, res) =>{
        Filmes.find({order: [["_id", 'DESC']]}).then((filmes) =>{
            filmes.__v = undefined;
            return res.json(filmes)
        }).catch((erro) => {
            return res.status(400).json({
                error:true,
                message:"Nenhum filme cadastrado"
            })
        })
});

module.exports = app => app.use('/filmes', router)