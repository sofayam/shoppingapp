var fs = require('fs');



exports.getConfig = function() {
    return config
}

readConfig = function() {
    config = JSON.parse(fs.readFileSync("config.json").toString());
    return config;
}


exports.setConfig = function(changes) {
    console.log("started setting config from form", JSON.stringify(config));
    for (key in changes) {
	config[key].current = changes[key]
    }
    console.log("finished setting config from form", JSON.stringify(config));
    fs.writeFile("config.json", JSON.stringify(config))
}

// just read this once at the beginning so you can refer to it 
// dynamically withouth bashing on the file system

var config = readConfig() 
