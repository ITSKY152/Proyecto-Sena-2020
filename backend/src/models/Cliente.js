const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const ClienteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    imageUrl:{
        type:String
    },
    role: {
        type: String,
        default:'cliente',
        enum: [
            'cliente'
        ]
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    sign_up_date: {
        type: Date,
        default: Date.now()
    },
    last_login_date: {
        type: Date,
        default: Date.now()
    }
});

ClienteSchema.pre('save',function(next){
    bcrypt.genSalt(10).then(salts => {
        bcrypt.hash(this.password,salts).then(hash => {
            this.password = hash;
            next();
        }).catch(error => next(error));
    }).catch(error => next(error));
});

const Cliente = mongoose.model('Cliente',ClienteSchema);

module.exports = Cliente;