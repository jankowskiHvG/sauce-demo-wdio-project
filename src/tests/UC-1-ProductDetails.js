const {pages} = require('../po/pages');


describe('Dynamic Content Flow', () => {

    const productName = 'Sauce Labs Bike Light';

    beforeEach(async () => {
        await pages('login').loginAs();
    });

    it('User sees consistent product data and adds product to cart', async() => {
        
        //GIVEN: User is logged as a Standard User and reads product data on inventory page.
        const inventoryPage = pages('inventory');
        const inventoryItem=await inventoryPage.getItemByName(productName);
        
        const inventoryPrice = await inventoryPage.getPrice(inventoryItem);
        const inventoryDescription = await inventoryPage.getDescription(inventoryItem);

        //WHEN: User opens product details page.
        await inventoryPage.openItemDetails(inventoryItem);
        const productDetailsPage = pages('productDetails');
        
        //THEN: Product details should matcgh inventory data
        const detailsPrice =  await productDetailsPage.getDetailsPrice();
        const detailsDescription = await productDetailsPage.getDetailsDescription();

        await expect(detailsPrice).toEqual(inventoryPrice); 
        await expect(detailsDescription).toEqual(inventoryDescription);

        //WHEN: User adds product to card
        await productDetailsPage.addToCart();

        //THEN: Product should be added to cart
        await expect(productDetailsPage.header.cartBadge).toBeDisplayed(
            {message: 'ERROR: Cart icon does not indicate that product had been added to cart!',
            wait: 5000
            }
        );
        await expect(productDetailsPage.removeBtn).toBeDisplayed(
            {message: 'ERROR: Remove button has not appeared after adding to cart!',
            wait: 5000
            }
        );
    });
});