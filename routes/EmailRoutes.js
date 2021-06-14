const EmailController = require("../controllers/EmailController")()
module.exports = function(fastify, options, done) {
    fastify.post('/sendSimpleEmail', {}, async (req, rep)=>{

    })

    done()
}