const Eris = require("eris");
const config = require("../data/config.json");
const testbot = new Eris.Client(config.token, options = {
    restMode: true
});

module.exports = {
    Eris: Eris,
    testbot: testbot
}

testbot.foundation = module.exports;