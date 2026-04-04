const {Given, When, Then} = require('@cucumber/cucumber');
const {pages} = require('../../po/pages/index.js');
const customLogger = require('../../utils/customLogger.js');

let inventoryPrice;
let inventoryDescription;
let productDetailsPage = pages('productDetails');
let productName

Given('User is logged in as a standard user', async () => {
    await pages('login').loginAs();
});

When(`User reads data for {string} and opens it's detail's page`, async(name) =>{
    productName = name;
    customLogger.verify('product', productName);

    const inventoryPage = pages('inventory');
    const inventoryItem= await inventoryPage.getItemByName(productName);

    inventoryPrice = await inventoryPage.getPrice(inventoryItem);
    inventoryDescription = await inventoryPage.getDescription(inventoryItem);

    await inventoryPage.openItemDetails(inventoryItem);
});

Then('Product price on details page matches inventory page', async() => {
    productDetailsPage = pages('productDetails');
    const detailsPrice =  await productDetailsPage.getDetailsPrice();
    await expect(detailsPrice).toEqual(inventoryPrice); 
});

Then('Product description on details page matches inventory page', async() => {
    const detailsDescription = await productDetailsPage.getDetailsDescription();
    await expect(detailsDescription).toEqual(inventoryDescription);
});

When('User adds product to the cart', async() => {
    await productDetailsPage.addToCart();
});

Then('Cart badge is displayed', async() => {
    await expect(productDetailsPage.header.cartBadge).toBeDisplayed({
            message: `ERROR: Cart icon missing after adding ${productName} to cart!`,
            wait: 5000    
        });        
});

Then('Remove button is displayed', async() => {
     await expect(productDetailsPage.removeBtn).toBeDisplayed({
            message: `ERROR: Remove button has not appeared after adding ${productName} to cart!`,
            wait: 5000
            });
    });
