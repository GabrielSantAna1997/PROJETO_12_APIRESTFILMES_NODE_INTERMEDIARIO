const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json')

module.exports = (req,res,next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send ({ status: "401 Unauthorized", error: "Token não informado"});
    }

    const parts = authHeader.split(' ');
    //Bearer gwghcgjs45fa4564f56f454178

    if(!parts.length === 2){
        return res.status(401).send ({ status: "401 Unauthorized ", error: "Token error"});
    }

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send ({ status: "401 Unauthorized", error: "Token malformatted"});
    }


    jwt.verify(token, authConfig.secret, (error, decoded) =>{
        if(error){
            return res.status(401).send ({ status: "401 Unauthorized", error: "Token invalido"}); 
        }

        req.user_id = decoded.id
        
        return next();
    })
    
}