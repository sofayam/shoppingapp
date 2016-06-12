var fs = require('fs');

var configName = "config.json" // .gitignore this so it wont keep getting synched whenever it changes
var configBackup = configName + ".backup" // keep this in git to copy on first run after git clone


exports.getConfig = function () {
    return config
}

checkExistsAndSetup = function () {
    if (!fs.existsSync(configName)) {
        config = JSON.parse(fs.readFileSync(configBackup).toString());
        fs.writeFileSync(configName, JSON.stringify(config))
    }
}

readConfig = function () {
    checkExistsAndSetup();
    config = JSON.parse(fs.readFileSync(configFile).toString());
    return config;
}


exports.setConfig = function (changes) {
    console.log("started setting config from form", JSON.stringify(config));
    for (key in changes) {
        config[key].current = changes[key]
    }
    console.log("finished setting config from form", JSON.stringify(config));
    fs.writeFileSync("config.json", JSON.stringify(config))
}

// just read this once at the beginning so you can refer to it 
// dynamically without bashing on the file system

var config = readConfig() 
