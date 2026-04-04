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
        login: LoginPage,
        inventory: InventoryPage,
        productDetails: ProductDetailsPage
    }
    return new items[name]();
}

module.exports = {
    LoginPage,
    InventoryPage,
    ProductDetailsPage,
    pages
}