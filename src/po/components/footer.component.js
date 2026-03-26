const BaseComponent = require('./base.component.js');

class FooterComponent extends BaseComponent {
    constructor() {
        super('.footer');
    }

    getSocialPlatform(name) {
        return this.rootEl.$(`.social_${name} a`);
    }

}

module.exports = FooterComponent;