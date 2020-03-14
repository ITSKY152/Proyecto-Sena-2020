const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');
module.exports = function (req, res, next) {
    const token = req.header('authorization');
    if (!token) {
        return res.send('acceso denegado')
    }
    try {
        const verificado = jwt.verify(token, CONFIG.SECRET_TOKEN)
        if(req.method == 'GET'){
            if (verificado.role === 'admin') {
                req.user = verificado;
                console.log('entro')
                next();
            }
            else {
                res.send('no eres el usuario')
            }
        }        
    }
    catch{
        res.send('token invalido')
    }
}