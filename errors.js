class VaildationError extends Error {
    constructor() {
        super(...arguments);
        this.name = this.constructor.name;
    }
}

module.exports = {
    VaildationError
};