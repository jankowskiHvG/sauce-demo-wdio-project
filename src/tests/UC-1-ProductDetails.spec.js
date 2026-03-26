const {pages} = require('../po/pages');
const sauceProducts = require('../test-data/sauceProducts.json');
const customLogger = require('../utils/customLogger.js');


describe('UC-1 Product Detail Verification', () => {

    beforeEach(async () => {
        await pages('login').loginAs();
    });

    sauceProducts.forEach((productName) => {

    it(`User sees consistent product ${productName} data and adds product to cart`, async() => {
        
        customLogger.verify('product', productName);

        //GIVEN: User is logged as a Standard User and reads product data on inventory page.
        const inventoryPage = pages('inventory');
        const inventoryItem=await inventoryPage.getItemByName(productName);
        
        const inventoryPrice = await inventoryPage.getPrice(inventoryItem);
        const inventoryDescription = await inventoryPage.getDescription(inventoryItem);

        //WHEN: User opens product details page.
        await inventoryPage.openItemDetails(inventoryItem);
        const productDetailsPage = pages('productDetails');
        
        //THEN: Product details should match inventory data
        const detailsPrice =  await productDetailsPage.getDetailsPrice();
        const detailsDescription = await productDetailsPage.getDetailsDescription();

        await expect(detailsPrice).toEqual(inventoryPrice); 
        await expect(detailsDescription).toEqual(inventoryDescription);

        //WHEN: User adds product to cart
        await productDetailsPage.addToCart();

        //THEN: Product should be added to cart
        await expect(productDetailsPage.header.cartBadge).toBeDisplayed({
            message: `ERROR: Cart icon missing after adding ${productName} to cart!`,
            wait: 5000    
        });
        await expect(productDetailsPage.removeBtn).toBeDisplayed({
            message: `ERROR: Remove button has not appeared after adding ${productName} to cart!`,
            wait: 5000
            });
        });
    });
});