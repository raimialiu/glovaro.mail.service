//const {MailClient} = require("glovaro-mailclient")
const fs = require("fs")

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

    async function sendActiveAccountEmail(to_email, placeholder) {
        return new Promise((resolve, reject)=>{
            const templateFile = "ActivateAccount.html"
        fs.readFile(templateFile, async (er, data)=>{
                if(!er) {
                    const _data = Buffer.from(data)
                    let fullStringData = _data.toString();
                    for(let k of placeholder) {
                        fullStringData = (fullStringData+"").replace(k["placeholder"], k["replacer"])
                    }
                    console.log("fn", fullStringData)
                    const sendResult = await SendMail('noreply@glovaro.com', to_email, 'Activate account', fullStringData, true)

                    resolve(sendResult)
                }
                reject(er)
            })
        })
        
       // return await sendTemplateEmailWithPlaceholder('noreply@glovaro.com', to_email, 'Activate account', templateFile, placeholder)

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

    async function sendTemplateEmailWithPlaceholder(from, to, subject, templateFile, placeholder=[{placeholder:"value", replacer:"value"}]) {
        return new Promise(async (resolve, reject)=>{
            mail.Build.BuildFromTemplateFile(templateFile)
                        .then(async (response) =>{
                            for(let k of placeholder) {
                                response += (response+"").replace(k["placeholder"], k["replacer"])
                            }
                           // console.log("resp", response)
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
        sendActiveAccountEmail,
        SendMail,
        SendMultiple,
        SendEmailWithAttachment,
        sendTemplateEmail
    }
}

module.exports = {EmailService}
