const {AppServiceHost} = require("./Program")

const app = AppServiceHost(3200, '127.0.0.1')

app.start()