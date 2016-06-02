var Validator = require('./Validator');

function Base() {
    this.validator = new Validator();
}

Base.prototype = {
    run: function(params) {
        return this.validate(params).then(this.execute.bind(this));
    }
};

module.exports = Base;