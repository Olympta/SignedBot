const Sharder = require('eris-sharder').Master;
const config = require("./data/config.json");
const sharder = new Sharder(config.token, "/Index.js", {
    name: "SignedBot"
});