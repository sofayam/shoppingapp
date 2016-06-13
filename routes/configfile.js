
var fs = require('fs');

var configName = "config.json" // .gitignore this so it wont keep getting synched whenever it changes
var configBackup = configName + ".default" // keep this in git to copy on first run after git clone


exports.getConfig = function () {
    return config
}

exports.getSelected = function (setting){
    var choices = config[setting];
    for(i = 0; i < choices.length; i++)
    {
        if (choices[i].selected) {
            return choices[i].choice;
        }
    }
    throw "bad config file: no choice selected"
}

checkExistsAndSetup = function () {
    if (!(fs.existsSync(configName))) {
        config = JSON.parse(fs.readFileSync(configBackup).toString());
        fs.writeFileSync(configName, JSON.stringify(config))
        return config
    }
    return false
}

readConfig = function () {
    config = checkExistsAndSetup();
    if (! config) {
        config = JSON.parse(fs.readFileSync(configName).toString());
    }
    return config;
}


exports.setConfig = function (changes) {
    console.log("started setting config from form", JSON.stringify(config));
    for (key in changes) {
        var choices = config[key]
        for (i=0; i<choices.length; i++) {
            choices[i]["selected"] = (changes[key] == choices[i].choice) 
        }
    }
    console.log("finished setting config from form", JSON.stringify(config));
    fs.writeFileSync(configName, JSON.stringify(config))
}

// just read this once at the beginning so you can refer to it 
// dynamically without bashing on the file system

var config = readConfig() 
