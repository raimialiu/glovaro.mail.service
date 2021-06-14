const {EmailService} = require("../services/EmailService")

function EmailController(fastify) {
  //  const _request = request
    const emailService = EmailService(fastify.mail)    
    const _logger = fastify.logger
    function successRessponse(data) {
        return {
            data,
            statusCode:"00",
            message:"your request is successfull"
        }
    }

    function failedResponse(message) {
        return {
            statusCode:"99",
            message
        }
    }
    function Now() {
        const dateTime = new Date()
        const dt = dateTime.toString() + "" + dateTime.toTimeString()

        return dt
    }

    async function SendMail(request) {
        const to = request.body.to;
        const subject = request.body.subject
        const message = request.body.message
        const cc = Array.from(request.body.cc)
        const details = JSON.stringify({to, subject, message, cc})
        
        const logmessage = `request payload for sending mail, details: ${details}, at ${Now()}`
        _logger.info(logmessage)
        var sendMailResponse = await emailService.SendMail('no_reply@glovaro.com',
                                            to, subject, message, false)
        const _msg = `send mail response: ${JSON.stringify(sendMailResponse)} at: ${Now()}`
        _logger.info(_msg)

        if(sendMailResponse == false) {
            let mmg = ""
            fastify.mail.on("SendError", (er)=>{
                _logger.error("error")
                _logger.error(er)
                mmg = er["response"]
               
            })
            return failedResponse(mmg)
        }

        

        return successRessponse(sendMailResponse)
    }

    return {
        SendMail
    }

}


module.exports = EmailController