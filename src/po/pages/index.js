const LoginPage = require('./login.page');
const InventoryPage = require('./inventory.page');
const ProductDetailsPage = require('./product-details.page');


/**
 * 
 * @param name {'login' | 'inventory' | 'productDetails'}  
 * @returns {LoginPage | InventoryPage | ProductDetailsPage}
 */
function pages (name) {
    const items = {
        login: new LoginPage(),
        inventory: new InventoryPage(),
        productDetails: new ProductDetailsPage()
    }
    return items[name];
}

module.exports = {
    LoginPage,
    InventoryPage,
    ProductDetailsPage,
    pages
}