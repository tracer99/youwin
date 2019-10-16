var fs = require('fs');
var RandomOrg = require('random-org');

// get config
var config = JSON.parse(fs.readFileSync("config.json", "utf8"));
if (!config) throw new Error("No config.json file present");
if (!config.random_org_api_key) throw new Error("Missing random_org_api_key in config.json");
if (!config.pool) throw new Error("Missing pool in config.json");

// setup random
var random = new RandomOrg({ apiKey: config.random_org_api_key });
var length = config.pool.length + 1;
var params = {
    min: 1,
    max: length,
    n: 1
}

// get winner

async function getResult() {
    var result = (await random.generateIntegers(params)).random.data[0];
    console.log(result);
    var winner = config.pool[result-1];
    console.log(winner);
}

getResult().catch(new Error);