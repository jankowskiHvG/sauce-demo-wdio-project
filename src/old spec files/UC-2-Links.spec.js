const {pages} = require('../po/pages/index.js');
const socialMediaData = require('../test-data/socialMediaLinks.json')
const customLogger = require('../utils/customLogger.js');

describe('UC-2 Social media links', () => {
   

    beforeEach(async () => {
        await pages('login').loginAs();
    });
    


    socialMediaData.forEach((social) => {
    
        it(`Scenario: User can open ${social.name} link`, async () => {
            
            customLogger.verify('social media link', social.name);
            const footer = pages('inventory').footer;
            const primaryWindowHandle = await browser.getWindowHandle();

            //GIVEN: User is logged in and on Inventory Page
            const socialLink = await footer.getSocialPlatform(social.name);

            //WHEN: User scrolls down to footer to see social media icons 
            await footer.scrollToFooter();
            
            //THEN: The social media icon should be visable
            await expect(socialLink).toBeDisplayed({
                message: `ERROR: Icon of ${social.name} is not displayed in footer!`
            });
            await expect(socialLink).toHaveAttribute('href',social.url, {
                message: `ERROR: URL of ${social.name} does not match!`
            });

            //bonus - for happy path puropse I added "urlAfterRebranding" but test should fail due to Twitter becoming the "X"
            //WHEN: User clicks the social media platform's icon
            await socialLink.click();
            await browser.waitUntil(
                async () => (await browser.getWindowHandles()).length>1
            );

            const allHandles = await browser.getWindowHandles();
            const targetWindow = allHandles.find(handle => handle !== primaryWindowHandle);
            await browser.switchToWindow(targetWindow);

            //THEN: The URL in new tab matches the social media icon
            await expect(browser).toHaveUrl(social.urlAfterRebranding,
                {message: `ERROR: Url in new tab does not match ${social.name}'s ${social.urlAfterRebranding}`}
            );
            await browser.closeWindow();
            await browser.switchToWindow(primaryWindowHandle);
        })
    });


});