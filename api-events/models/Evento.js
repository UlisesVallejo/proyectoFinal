
const { Schema, model } = require('mongoose');

const EventoSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        // el tipo del usuario debe ser un objectid
        type: Schema.Types.ObjectId,
        required: true,
    }

});


module.exports = model('evento', EventoSchema);