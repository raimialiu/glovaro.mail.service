const swagger = require("./config/swagger")
const fastify = require("fastify")()
const SimpleFormPlugin = require("fastify-simple-form")
const Startup = require("./Startup")(fastify)
const {createLogger, transports} = require("winston")
const {fileUploadMiddleare} = require("./services/middleware/captureIncomingFile")
const {ConfigReader, ConfigTypes} = require("./services/utilities")

// register module...it becomes part of fastify object
const winston = createLogger({
    exitOnError:false,
    exceptionHandlers:[new transports.File({filename:'ErrorLogs.json'}), new transports.Console()],
    transports:[new transports.File({filename:'AppLogs.json'}), new transports.Console()]
})
const {MailClient} = require("glovaro-mailclient")
//const { default: s } = require("fluent-json-schema")

const _config = new ConfigReader({types:ConfigTypes.JSON, "fileName":"./config/swagger.json"})

async function ReadConfigSettings() {
    const mail_host = await _config.Get('Mail_Host')
    const mail_is_secure = await _config.Get('Mail_Is_Secure')
    const mail_port = await _config.Get('Mail_Port');
    const user = process.env.mail_auth_user
    const pass = process_env.mail_auth_pass;

    const mail = MailClient.instance({
            
                host:mail_host,
                port: mail_port,
                secure:mail_is_secure,
                auth:{
                        user,pass                      
                    }
                
        })

        mail.on("SendError", (er)=>{
            winston.error(er)
            console.log(er)
        })
        Startup.registerModule("mail", mail)
}

ReadConfigSettings()


// === MODULES  ===== //

Startup.registerModule("logger", winston)




Startup.AddService("fastify-swagger",swagger.options)
fastify.register(require("./routes/EmailRoutes"), {prefix:'/v1/api/mail'})
fastify.register(require('fastify-multipart'))

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

    // await fastify.register(require("fastify-express"))
    // fastify.use(fileUploadMiddleare)

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