 const BaseComponent = require('./base.component');

class HeaderComponent extends BaseComponent {
    constructor() {
        super('.primary_header');
    }

    get cartBadge() { return this.rootEl.$('.shopping_cart_badge'); }
}

module.exports = HeaderComponent;