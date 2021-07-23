const db = require('../db');
// const { model } = require('mongoose');
// const Schema = require('mongoose').Schema;

module.exports = () =>{
    
    const contact = new db.Schema({
        name: String,
        email: String});
    
    const user = new db.Schema({
        name: {
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            index: { unique: true}
        },
        contacts:[contact]
    });

    return db.model('users',user);
}