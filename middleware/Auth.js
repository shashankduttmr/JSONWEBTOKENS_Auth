const jwt = require('jsonwebtoken')

function isLoggedin(req, res, next){
    const token = req.header('Authorization').replace('Bearer ', '') || req.cookies.token || req.body.token

    if(!token){
        return res.status(403).send('Token is missing')
    }

    try {
        const decode = jwt.verify(token, process.env.secret_key)
        console.log(decode);
    } catch (error) {
        return res.status(401).send('Invaild Token')
    }
    return next()
}

module.exports = isLoggedin