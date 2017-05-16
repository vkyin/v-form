const Field = require('./field');
const {
    VaildationError
} =require('./errors');



let VFormGetter = C => class extends C {
    constructor(originObject) {
        super(originObject);
        Object.defineProperty(this, '__originObject', {
            value: originObject
        });
    }

    get(key) {
        return new Field();
    }

    getFrom(key, ...propertieNames) {
        let obj = this.__originObject;
        propertieNames.forEach(name => {
            obj = obj[name];
        });
        let value = obj[key];
        return new Field(key, value);
    }
}


module.exports = {
    VForm: VFormGetter,
    VaildationError: VaildationError
};