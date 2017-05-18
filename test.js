const VForm = require('./index');

let CustomVa = C => class extends C {
    constructor() {
        super(...arguments);
    }
    isSb(msg=`${this.value} is not sb`) {
        if (this.value !== 'pigo') {
            this.addError(msg);
        }
        return this;
    }
}

let CustomVb = C => class extends C {
    constructor() {
        super(...arguments);
    }
    isHandsome(msg=`${this.value} is not handsome`) {
        if (this.value !== 'vk') {
            this.addError(msg);
        }
        return this;
    }
}

class BaseForm {
    constructor(ctx) {
        this.requsetId = ctx.header.requsetId;
    }
}

class ListForm extends VForm(BaseForm, CustomVa, CustomVb) {
    constructor() {
        super(...arguments);
        this.refferalId = this.getFrom('body', 'testfield', 'refferalId')
            .isNaN()
            .length(8);
        this.vk = this.getFromQuery('vk');
        this.name = this.getFrom('name').isHandsome().isSb();
    }
}

let ctx = {
    name:'pigo',
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
            refferalId: 'asdfsas',
        }
    },
    other: {
        vk: 4567
    }
};

let form = new ListForm(ctx).validate();

console.log('form', form);
console.log('errors', form.errors());

// console.log(new VaildationError('parma').name)
// console.log(typeof new VaildationError('parma'))
// console.log(new VaildationError('parma') instanceof VaildationError)