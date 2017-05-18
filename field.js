const VFormValidator = require('./validator');

let BaseField = Object;
let getFieldClass = function (validators) {
    validators.push(VFormValidator);
    while (validators.length) {
        BaseField = validators.pop().call(null, BaseField);
    }
    return class Field extends BaseField {
        constructor(name, value) {
            super();
            this.name = name;
            this.value = value;
            this.errors = [];
        }

        addError(error) {
            this.errors.push(error);
        }
    }
}


module.exports = getFieldClass;