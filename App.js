const {AppServiceHost} = require("./Program")

const port = process.env.port || 3200
const hostname = process.env.hostname || '127.0.0.1'

const app = AppServiceHost(port, hostname)

app.start()