const BasePage = require('./base.page.js');
const {Header, Footer} = require('../components');

class ProductDetailsPage extends BasePage {
    constructor() {
        super();
        this.header = new Header();
        this.footer = new Footer();
    }

    get detailsPrice() {return $('.inventory_details_price'); }
    get detailsDescription() { return $('.inventory_details_desc.large_size'); }
    get addCartBtn() { return $('#add-to-cart'); }
    get removeBtn() { return $('#remove'); }

    async getDetailsPrice() {
        return await this.detailsPrice.getText();
    }

    async getDetailsDescription() {
        return await this.detailsDescription.getText();
    }

    async addToCart() {
        await this.addCartBtn.waitForClickable();
        await this.addCartBtn.click();
    }
}

module.exports = ProductDetailsPage;