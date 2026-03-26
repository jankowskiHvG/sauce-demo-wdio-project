const BasePage = require('./base.page.js');
const {Header, Footer} = require('../components');

class InventoryPage extends BasePage {
    constructor() {
        super();
        this.header = new Header();
        this.footer = new Footer();
    }
    
    async getItemByName(productName) {
        return $(`//div[@class="inventory_item_description"][.//div[text()="${productName}"]]`);
    }
    
    async getPrice(inventoryItem) {
        return inventoryItem.$('.inventory_item_price').getText();
    }

    async getDescription(inventoryItem) {
        return inventoryItem.$('.inventory_item_desc').getText();
    }

    async openItemDetails(inventoryItem) {
        await inventoryItem.$('.inventory_item_name').click();
    }
}

module.exports = InventoryPage;