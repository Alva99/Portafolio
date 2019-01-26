'use strict';
const mongoose = require('mongoose');
var Schema = mongoose.Schema;


var projectShema = Schema({
    name: String,
    descripcion: String,
    category: String,
    year: Number,
    langs: String,
    img: String
});


module.exports = mongoose.model('project',projectShema);