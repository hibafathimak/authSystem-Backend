const jwt = require('jsonwebtoken')

const jwtmiddleware = async (req, res, next) => {
    const token = req.headers[authorization].split()[1]
    try {
        if (token) {
            const result = jwt.verify(token, process.env.JWTPASSWORD)
            req.userId = result.jwt
            next()
        }
        else {
            res.status(401).json("authorisation failed!")
        }
    } catch (error) {
        console.error("authorisation failed!")
    }
}

module.exports = jwtmiddleware