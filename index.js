let VForm = function (C, ...Validators) {
    const Field = require('./field')(Validators);
    return class extends C {
        constructor(originObject) {
            super(originObject);

            Object.defineProperties(this, {
                '__reservedProperties__': {
                    value: {
                        originObject: originObject,
                        errorsArray: [],
                        errorsMap: {},
                        hasError: false
                    }
                }
            });
        }

        getFrom(...propertieNames) {
            let obj = this.__reservedProperties__.originObject;
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

        validate() {
            for (let x in this) {
                let property = this[x];
                let errorsArray = this.__reservedProperties__.errorsArray;
                let errorsMap = this.__reservedProperties__.errorsMap;
                if (property instanceof Field) {

                    this[x] = property.value;
                    if (property.errors.length > 0) {
                        this.__reservedProperties__.hasError = true;
                        property.errors.forEach(e => {
                            errorsArray.push({
                                key: property.name,
                                value: property.value,
                                error: e
                            });
                            if (errorsMap[property.name]) {
                                errorsMap[property.name].errors.push(e);
                            } else {
                                errorsMap[property.name] = {
                                    value: property.value,
                                    errors: [e]
                                }
                            }
                        });
                    }
                }
            }
            return this;
        }

        errors() {
            if (this.__reservedProperties__.hasError) {
                return this.__reservedProperties__.errorsArray;
            }
            return null;
        }
    }
}


module.exports = VForm;