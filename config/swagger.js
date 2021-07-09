const port = process.env.PORT == null || process.env.PORT == undefined ? 3000 : process.env.PORT == null
const hostname = process.env.hostname == null || process.env.hostname == undefined ? 'localhost': process.env.hostname
exports.options ={
    routePrefix: "/swagger",
    exposeRoute: true,
    swagger: {
      info: {
        title: "GLOVARO API (EMAIL API)",
        description: "GLOVARO API DOCUMENTATION",
        version: "1.0.0",
      },
      externalDocs: {
        url: "https://swagger.io",
        description: "https://www.glovaro.io",
      },
      host: hostname+":"+port,
    //  host: "glovaro-backend.herokuapp.com/",
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
    },
  };
