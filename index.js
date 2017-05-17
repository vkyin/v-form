const Field = require('./field');
const {
    VaildationError
} = require('./errors');



let VFormGetter = C => class extends C {
    constructor(originObject) {
        super(originObject);

        Object.defineProperties(this, {
            '__originObject': {
                value: originObject
            }
        })
    }

    getFrom(...propertieNames) {
        let obj = this.__originObject;
        let key;
        propertieNames.forEach(name => {
            key = name;
            obj = obj[name];
        });
        let value = obj;
        return new Field(key, value);
    }

    getFromBody(...propertieNames) {
        let args = propertieNames;
        args.unshift('body');
        return this.getFrom.apply(this, args);
    }

    getFromQuery(...propertieNames) {
        let args = propertieNames;
        args.unshift('query');
        return this.getFrom.apply(this, args);
    }

    getFromParam(...propertieNames) {
        let args = propertieNames;
        args.unshift('param');
        return this.getFrom.apply(this, args);
    }
}


module.exports = {
    VForm: VFormGetter,
    VaildationError: VaildationError
};