describe('Dynamic Content Flow', () => {

    beforeEach(async () => {
    await browser.url('/');
    });

    it('should verify product details and add to cart', async() => {
        const productName = 'Sauce Labs Bike Light';

        //login

        

        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();

        //get product details from Inventory Page
        const inventoryItem = $(`//div[@class="inventory_item_description"][.//div[text()="${productName}"]]`);
        const inventoryPrice = await inventoryItem.$('.inventory_item_price').getText();
        const inventoryDescription = await inventoryItem.$('.inventory_item_desc').getText();

        //go to details page
        await inventoryItem.$('.inventory_item_name').click();
        
        //get data from details page
        const detailsPrice =  await $('.inventory_details_price').getText();
        const detailsDescription = await $('.inventory_details_desc.large_size').getText();

        //assertions
        await expect(detailsPrice).toEqual(inventoryPrice);
        await expect(detailsDescription).toEqual(inventoryDescription);

        //add to cart
        await $('#add-to-cart').click();

        //assertion
        await expect($('.shopping_cart_badge')).toBeDisplayed();
        await expect($('#remove')).toBeDisplayed();
    });
});