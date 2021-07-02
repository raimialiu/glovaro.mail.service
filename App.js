const {AppServiceHost} = require("./Program")

const port = process.env.port || 3200
const hostname = process.env.hostname || '127.0.0.1'
// async function Start() {
//     const app = await AppServiceHost(port, hostname)
//     app.start()
// }

// Start();

const app = AppServiceHost(port, hostname)
app.start()
