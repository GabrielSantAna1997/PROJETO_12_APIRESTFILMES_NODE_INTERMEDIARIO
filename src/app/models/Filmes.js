const mongoose = require('../../../database');

const FilmesSchema = new mongoose.Schema({
    _id: {
        type: String,
        require: true,
    },
    titulo: {
        type: String,
        require: true,
    },
    diretor: {
        type: String,
        required: true,
        lowercase: true,
    },
    ano: {
        type: Date,
        required: true,
        lowercase: true,
    },
    alugado: {
        type: Array,
    },
    estoque: {
        type: Number,
        required: true,
        lowercase: true,
    }
});


const Filmes = mongoose.model('Filmes', FilmesSchema)

module.exports = Filmes;