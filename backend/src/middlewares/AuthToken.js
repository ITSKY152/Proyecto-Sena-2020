const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');

module.exports = function(req,res,next){
    if(req.path == '/user/register' || req.path == '/auth/login' ){
        next();
    }else {
        if(req.headers.authorization){
            let token = req.headers.authorization.split(' ')[1];
            jwt.verify(token,CONFIG.SECRET_TOKEN,function(error,decoded){
                if(error) return res.status(403).send({message: 'no cargo el token',error});
                console.log(decoded)
                if(req.path == '/product/register'){
                    if(decoded.role == 'admin') next();
                    else res.status(403).send({message: 'no eres el usuario'});
                }else{
                    next();
                }
            });
        }else res.status(403).send({message: 'No tienes los permisos suficientes para estar aquí...'});
    }
    
}