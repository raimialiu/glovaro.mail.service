const port = process.env.PORT
const hostname ='0.0.0.0'
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
