var HttpsProxyAgent = require('https-proxy-agent');


var params = {

    auth: { user: "markandrew",
	    password: "markandrewPw1!" },

    headers: {
	"Accept": "application/json",
	"Content-Type": "application/json",
	"x-cr-api-token": "6af616e401e24aa98425b825da995a7a"
    },
    timeout: 1000,
    followRedirect: true,
    maxRedirects: 10};

if (process.env.VCAP_SERVICES) {
    console.log("No agent needed");
} else {
    console.log("Set agent");
    var proxyurl = 'http://127.0.0.1:3128'
    var agent = new HttpsProxyAgent(proxyurl);
    params.agent = agent;
}; 

module.exports = params
