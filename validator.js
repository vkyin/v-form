const {
    VaildationError
} = require('./errors');

module.exports = function (C = Object) {
    return class extends C {
        constructor() {
            super(...arguments);
        }

        isNaN(msg = `${this.name} isNaN: ${this.value}`){
            if(!isNaN(this.value)){
                throw new VaildationError(msg);
            }
            return this;
        }

        isInt() {
           this.value
            return this;
        }

        length() {
            return this;
        }
    }
}