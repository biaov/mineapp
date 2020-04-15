const API = require("./function");
const INIT = require("./init");
const VAR = require("./variable");
module.exports = { ...API, ...INIT, ...VAR };