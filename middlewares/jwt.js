const jwt = require('jsonwebtoken')

const jwtmiddleware = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    try {
        if (token) {
            console.log(token);
            const result = jwt.verify(token, process.env.JWTPASSWORD)
            console.log(result)
            req.userId = result.userId
            next()
        }
        else {
            res.status(401).json("authorisation failed!")
        }
    } catch (error) {
        console.log(error)
        console.error("authorisation failed!")
    }
}

module.exports = jwtmiddleware