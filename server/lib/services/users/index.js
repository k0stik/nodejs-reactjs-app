var Create = require('./Create.js');
var Authorize = require('./Authorize.js');

module.exports = {
    'create' : new Create(),
    'authorize': new Authorize(),
};