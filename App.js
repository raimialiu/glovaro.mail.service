const {AppServiceHost} = require("./Program")

// const port = process.env.port || 3200
// const hostname = process.env.hostname || '127.0.0.1'
const port = process.env.APP_PORT
const hostname = process.env.hostname
// async function Start() {
//     const app = await AppServiceHost(port, hostname)
//     app.start()
// }

// Start();

const app = AppServiceHost(port, 'localhost')
app.start()

