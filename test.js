const {
VForm,
    VaildationError
} = require('./index');



class BaseForm {
    constructor(ctx) {
        this.requsetId = ctx.header.requsetId;
    }
}

class ListForm extends VForm(BaseForm) {
    constructor() {
        super(...arguments);
        this.refferalId = this.getFrom('refferalId', 'body', 'testfield').isNaN().length(8).value;
    }
}

let ctx = {
    header: {
        requsetId: 1234
    },
    query: {
        vk: 1234
    },
    param: {
        vk: 2345
    },
    body: {
        vk: 3456,
        refferalId: 'hahaha',
        testfield: {
            refferalId: '0',
        }
    },
    other: {
        vk: 4567
    }
};

let form = new ListForm(ctx);

console.log(form.refferalId);
console.log(form.requsetId);

// console.log(new VaildationError('parma').name)
// console.log(typeof new VaildationError('parma'))
// console.log(new VaildationError('parma') instanceof VaildationError)