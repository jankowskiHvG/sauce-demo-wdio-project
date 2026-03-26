class BaseComponent {
    constructor(rootSelector) {
        this.rootSelector = rootSelector;
    }

    get rootEl() {
        return $(this.rootSelector);
    }

    async scrollIntoView(element) {
    await element.scrollIntoView();
}
}

module.exports = BaseComponent;

