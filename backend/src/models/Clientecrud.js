const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const moment = require('moment')

const UserSchema = new mongoose.Schema({
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
    public_id:{
        type:String
    },
    role: {
        type: String,
        enum: [
            'empleado',
            'admin'
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
        default: moment()
    },
    last_login_date: {
        type: Date,
        default: Date.now()
    }
});

UserSchema.pre('save',function(next){
    bcrypt.genSalt(10).then(salts => {
        bcrypt.hash(this.password,salts).then(hash => {
            this.password = hash;
            next();
        }).catch(error => next(error));
    }).catch(error => next(error));
});

const User = mongoose.model('User',UserSchema);

module.exports = User;