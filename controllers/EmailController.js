function EmailController() {
    const _request = request

    function SendMail(request) {
        const to = request.body.to;
        const subject = request.body.subject
        const message = request.body.message
        const cc = Array.from(request.body.cc)
    }

    return {
        SendMail
    }

}


module.exports = EmailController