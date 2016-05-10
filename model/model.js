config = require ('./config.js');

if (config.model == "mongo") {
    res = require('./mongomodel.js')
} else if (config.model == "cr") {
    res = require('./crmodel.js')
} else {
   throw "bad config value: " + config.model 
}

module.exports = res
