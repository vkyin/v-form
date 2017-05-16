const VFormValidator = require('./validator');

class Field extends VFormValidator() {
    constructor(name, value) {
        super();
        this.name = name;
        this.value = value;
    }
}

module.exports = Field;