const BaseComponent = require('./base.component.js');

class FooterComponent extends BaseComponent {
    constructor() {
        super('.footer');
    }

    getSocialPlatform(name) {
        return this.rootEl.$(`.social_${name} a`);
    }


    async scrollToFooter() {
        await this.rootEl.scrollIntoView();
    }
}

module.exports = FooterComponent;