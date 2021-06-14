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

const mail = MailClient.instance()


Startup.registerModule("mail", mail)
Startup.registerModule("logger", winston)
// using it here to setup services and modules needed by the application
//Startup.registerModule("winston", winston)
//Startup.registerModule("mail", mail)
function routes() {
    fastify.post('/upload', async (req, rep)=>{
        const data =  (await req.saveRequestFiles())[0]
        let obj = {
            fieldname: data["filedname"],
            filename: data["filename"],    
            encoding: data["encoding"],
            mimetype: data["mimetype"],
            filePath: data["filepath"],
            fields: data["fields"]
        }
        rep.send({data:obj})
    })
}


Startup.AddService("fastify-swagger",swagger.options)
//fastify.register(require("fastify-swagger"), swagger.options)
routes()

function AppServiceHost(port, hostname) {
    const _port = port
    const _host = hostname
    fastify.setErrorHandler(function(error, request, reply){
        const er = new Error(error)
        const timestamp = (new Date()).toDateString()
        fastify.log.error({Message:er.message, 
                _raw: JSON.stringify(error), 
                occurAt:timestamp, path:request.path, method:request.method})
        reply.status = 400
        reply.send({Message:'system malfunction, please try again'})
    })

    function start() {
        
        fastify.listen(_port, _host, (er, address)=>{
                const timestamp = (new Date()).toDateString()
                if(!er) {
                    fastify.log.info(`server listening on ${address} at:->${timestamp} `)
                    winston.info(`server listening on ${address} at:->${timestamp} `)
                }
        
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