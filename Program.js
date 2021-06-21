const swagger = require("./config/swagger")
const fastify = require("fastify")({
   logger:{
        file:"email_logs.json"
    }
})
const Startup = require("./Startup")(fastify)
const {createLogger, transports} = require("winston")

// register module...it becomes part of fastify object
const winston = createLogger({
    exitOnError:false,
    exceptionHandlers:[new transports.File({filename:'ErrorLogs.json'}), new transports.Console()],
    transports:[new transports.File({filename:'AppLogs.json'}), new transports.Console()]
})
const {MailClient} = require("glovaro-mailclient")
//const { default: s } = require("fluent-json-schema")

const mail = MailClient.instance({
    
        host:'mail.privateemail.com',
        port: 465,
        secure:true,
        auth:{
                user: 'noreply@glovaro.com',
                pass:'DevPassword21$'
            }
        
})

// mail.on("SendError", (er)=>{
//     winston.error(er)
// })

// === MODULES  ===== //
Startup.registerModule("mail", mail)
Startup.registerModule("logger", winston)




Startup.AddService("fastify-swagger",swagger.options)
fastify.register(require("./routes/EmailRoutes"), {prefix:'/v1/api/mail'})


function AppServiceHost(port, hostname) {
    const _port = port
    const _host = hostname
    fastify.setErrorHandler(function(error, request, reply){
        const er = new Error(error)
        const timestamp = (new Date()).toDateString()
        fastify.log.error({Message:er.message, 
                _raw: JSON.stringify(error), 
                occurAt:timestamp, path:request.path, method:request.method})
        reply.status = 500
        reply.send({Message:'system malfunction, please try again'})
    })

    function start() {
        
        fastify.listen(_port, _host, (er, address)=>{
                const timestamp = (new Date()).toDateString()
                if(!er) {
                    fastify.log.info(`server listening on ${address} at:->${timestamp} `)
                    winston.info(`server listening on ${address} at:->${timestamp} `)
                }
        //500
        // 
                fastify.log.error(JSON.stringify(er))
            })
    }
    return {
        start
    }
}

module.exports = {
    AppServiceHost
}