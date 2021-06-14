const {DecoratorFN} = require("./services/decoratorsRegistration")
const {default:s} = require("fluent-json-schema")

function StartUp(fastify) {
    //const _services = Services()
    let _items = []
    let _items_service_added=[]
    let _mdu = []
    let decorator = DecoratorFN(fastify)

    function init() {
        console.log(_items)
        for(let service of _items) {
            _items_service_added.push(service)
            const find = _items_service_added.filter(x=>x["Name"] == service["Name"])
            if(!(find != null && find.length > 0)) {
                fastify.register(require(service["Name"]), service["options"])
            }
            
        }
    }
    function AddService(ServiceName, options) {
        const find = _items.filter(x=>x["Name"] == ServiceName)
         console.log(find)
        if((find != null || find != undefined) && find.length < 1) {
           _items.push({Name:ServiceName, options})

        }
       
      
      fastify.register(require(ServiceName), options)
    }
    function InitModule() {
        for(let k of _mdu) {
            fastify[k["Name"]] = k["instance"]
        }
    }

    const Types = {
        "string": s.string(),
        "int":s.number(),
        "array":s.array(),
        "midex": function(mixed=[]) {
            return s.mixed(mixed)
        },
        "enum": (items)=>{
            return s.enum(Object.values(items))
        }
    }
    function generateUrlSchema(description, categories, 
            params=null, query=null, body=null) {
        return {
            schema:{
                description,
                tags:[categories],
                params,
                query,
                body
            }
        }
    }

    function registerRoutes(path, method, handler, options =null,prefix="") {
        fastify.route({
            method,
            url:prefix+path,
            schema:options,
            handler
        })
      //  fastify[method](prefix+path, options, handler)
    }

    function registerModule(moduleName, moduleValue) {
        const find = _mdu.filter(x=>x["Name"] == moduleName)

        if((find != null || find != undefined) && find.length > 0) {
            _mdu.push({Name:ServiceName, options})

        }

        decorator.register(moduleName, moduleValue)
       
         //InitModule()

    }

    function isServiceRegistered(name) {
        return (_items.find(x=>x["Name"] == name)) != null
    }
    return {
        Types,
        registerRoutes,
        _items,
        registerModule,
        AddService,
        isServiceRegistered
    }
}

module.exports = StartUp


