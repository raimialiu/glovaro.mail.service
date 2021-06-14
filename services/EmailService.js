//const {MailClient} = require("glovaro-mailclient")


function EmailService(mail) {
   // const mail = MailClient.instance(options)

    async function SendMail(from, to, title, message, isHtml=false) {
        return await mail.Build
                          .From(from)
                          .To(to)
                          .Subject(title)
                          .MessageBody(message)
                          .Send(isHtml)
    }

    async function SendMultiple(from, to=[], title, message, isHtml=false) {
        var responses = [];
        for(let email of to) {
            let currentObject = {
                from,
                to:email
            }
            var response = await SendMail(from, email, title, message, isHtml)
            currentObject["data"] = response
            responses.push(response)
        }

        return responses
    }

    async function sendTemplateEmail(from, to, subject, templateFile) {
        return new Promise(async (resolve, reject)=>{
            mail.Build.BuildFromTemplateFile(templateFile)
                        .then(async (response) =>{
                            const emailResponse = await mail.Build
                                            .From(from)
                                            .To(to)
                                            .Subject(subject)
                                            .MessageBody(response)
                                            .Send(true)

                            resolve(emailResponse)

                        })
                        .catch(error=>reject(error))
        })
        
        
    }

    async function SendEmailWithAttachment(from, to=[], title, message, attachments=[], isHtml=false) {
        let buildResult = mail.Build
                    .From(from)
                    .To(to)
                    .Subject(title)
                    .MessageBody(message)
                    .AddAttachment()
        for(let k of attachments) {
            buildResult.AddAttachment(k.fileName, k.filePath)
        }

        return await buildResult.Send(isHtml)
                    

    }
    return {
        SendMail,
        SendMultiple,
        SendEmailWithAttachment,
        sendTemplateEmail
    }
}

module.exports = {EmailService}
