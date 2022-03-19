const express = require('express')
const authMiddleware = require("../middlewares/auth")
const Filmes = require('../models/Filmes');
const User = require('../models/User');
const router = express.Router();

router.use(authMiddleware);

//registro do filme
router.post('/alugar/:_id', async (req, res) => {
    const { userId } = req.body;

    //Valida se ID do usuario foi digitado certo.
    User.findById({ _id: userId }).then((user) => {


        //Verifica se o usuario já alugou outro filme
        Filmes.find().then((data) => {
            let valor = true

            //VALIDA SE O USUARIO JA ALUGOU ALGUM OUTRO FILME
            let ObjectAlugados = data;
            const SearchingUser = ObjectAlugados.find((currObj) => {
                for (let index = 0; currObj.alugado[index]; index++) {
                    if (currObj.alugado[index].idUser === userId) {
                        valor = false
                    }
                }
                if (!valor) {
                    res.status(404).send({ error: "Usuario já alugou outro filme" })
                    return;
                }
            });

            Filmes.findById({ _id: req.params._id }).then(data => {

                //VALIDA SE O USUARIO JA ALUGOU
                let ObjectAlugados = data.alugado;

                const SearchingUser = ObjectAlugados.find((currObj) => {
                    return currObj.idUser === userId;
                });
                if (SearchingUser) {
                    res.status(404).send({ error: "Usuario já tem um filme alugado!" })
                    return;
                }

                //VALIDA QUANTIDADE NO ESTOQUE E ADICIONA NO MODEL
                let filmesJaAlugados = data.alugado.length;
                if (data.estoque > 0) {
                    data.alugado[filmesJaAlugados] = { idUser: userId, idFilmes: req.params._id };
                    data.estoque = data.estoque - 1;
                    data.save();
                }
                else {
                    return res.status(404).send({ error: "Filmes sem estoque: " + data.estoque });
                }

                return res.status(200).send({status:true , message:"Alugado"})
            }).catch(() => {
                res.status(400).send({ error: "filmeId não localizado" })
                return;
            })

        }).catch(() => {
        })

    }).catch((erro) => {
        res.status(400).send({ error: "userId não localizado" })
        return;
    })
});
module.exports = app => app.use('/filmes', router)