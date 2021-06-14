
module.exports = function(fastify, options, done) {
    const EmailController = require("../controllers/EmailController")(fastify)
    fastify.post('/sendSimpleEmail', {
        schema:{
            tags:['Mail'],
            description: 'send simple mail',
            body:{
                type:'object',
                properties:{
                    to: {type:'string'},
                    subject:{type:'string'},
                    message:{type:'string'},
                    cc: {type: 'array', items: { type: 'string' }}
                }
            }
        }
    }, async (req, rep)=>{
        const result  = await EmailController.SendMail(req)
        const {statusCode} =result

        if(statusCode =="99") {
            rep.statusCode = 400
            rep.send(result)
        }
        rep.send(result)
    })

    done()
}