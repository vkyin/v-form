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
        this.refferalId = this.getFrom('body', 'testfield', 'refferalId')
            .isNaN()
            .length(8)
            .value;
        this.vk = this.getFromQuery('vk').value;
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
            refferalId: 'asdfsfas',
        }
    },
    other: {
        vk: 4567
    }
};

let form = new ListForm(ctx);

form.errors()

console.log(form);

// console.log(new VaildationError('parma').name)
// console.log(typeof new VaildationError('parma'))
// console.log(new VaildationError('parma') instanceof VaildationError)