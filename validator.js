const {
    VaildationError
} = require('./errors');

module.exports = function (C = Object) {
    return class extends C {
        constructor() {
            super(...arguments);
        }

        isNaN(msg = `${this.name} isNaN: ${this.value}`) {
            if (!isNaN(this.value)) {
                throw new VaildationError(msg);
            }
            return this;
        }

        isString(msg = `${this.name} isString: ${this.value}`) {
            if (typeof this.value !== 'string') {
                throw new VaildationError(msg);
            }
            return this;
        }

        isInt() {
            this.value
            return this;
        }

        length(length, msg = `${this.name} length: ${this.value}`) {
            if (this.value.length !== length) {
                throw new VaildationError(msg);
            }
            return this;
        }
    }
}