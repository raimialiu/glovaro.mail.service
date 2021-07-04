const fs = require("fs")
const ConfigTypes = {
    JSON: "json",
    env:"env"
}

class ConfigReader {
    constructor(options = {types:ConfigTypes.JSON, fileName:"config.json"}) {
        this.options = options;
        this.GetSettings().then(res=>{
            this._configobject = res
        }).catch(er=>{
            throw new Error(er)
        })
    }

    async Get(key) {
        this._configobject = JSON.parse(await this.GetSettings());
        //console.log(this._configobject)
        const keyExist = this._configobject != null ? this._configobject[key]:null;
        if(keyExist == null)  {
            throw new Error("no such key defined " + key)
        }

        return keyExist;
    }

    async GetAll() {
        return await this.GetSettings()
    }

    async GetSettings() {
        if(this.options.types == ConfigTypes.JSON) {
            let result = null
        
            result = await this.ReadJsonSettings(this.options.fileName)
            
          return result
          //  console.log("rsule", result)
        }
    }

    ReadJsonSettings(filename) {
        return new Promise((resolve, reject)=>{
            this.readJsonFileContent(filename, ConfigTypes.JSON, (er, data)=>{
                // console.log(filename)
                 if(!er) {
                    // console.log(data)
                     resolve(data)
                 }
                 else {
                     reject(er)
                 }
             })  
        })
       
    }

    readJsonFileContent(filename, fileType, cb=(er,data)=>{}) {
        fs.readFile(filename, (er, data)=>{
           // console.log(data)
            if(er) {
                cb(er,null)
            }
            else {
                var dataToBuffer = Buffer.from(data)
                var dataToString =  dataToBuffer.toString();
               // console.log(dataToString)
                cb(null, dataToString)
            }
        })
    }
}

// const cs = new ConfigReader({types:ConfigTypes.JSON, fileName:"swagger.json"})

// cs.GetAll().then(re=>console.log(re))

module.exports = {
    ConfigReader, ConfigTypes
}