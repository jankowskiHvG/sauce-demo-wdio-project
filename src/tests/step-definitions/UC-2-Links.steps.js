const {Given, When, Then} = require('@cucumber/cucumber');
const {pages} = require('../../po/pages');
const socialMediaData = require('../../test-data/socialMediaLinks.json')
const customLogger = require('../../utils/customLogger.js');


let footer;//Given is shared by UC-1
let socialLink;
let primaryWindowHandle;
let socialPlatformData;

When('User scrolls to footer', async() => {
    footer = pages('inventory').footer;
    await footer.scrollToFooter();
});

Then('{string} icon is displayed in footer', async(socialPlatform) =>{
    customLogger.verify('social media link', socialPlatform);
    socialLink = await footer.getSocialPlatform(socialPlatform);
    await expect(socialLink).toBeDisplayed({
                message: `ERROR: Icon of ${socialPlatform} is not displayed in footer!`
            });
});


Then('{string} link has correct href', async(socialPlatform) => {
     socialPlatformData = socialMediaData.find(s=>s.name === socialPlatform);
     await expect(socialLink).toHaveAttribute('href',socialPlatformData.url, {
                message: `ERROR: URL of ${socialPlatform} does not match!`
            });
});   

When('User clicks {string} icon', async(socialPlatform)=> {
    primaryWindowHandle = await browser.getWindowHandle();
    await socialLink.click();
    await browser.waitUntil(
        async () => (await browser.getWindowHandles()).length>1
        );
});

Then('New tab opens with a correct {string} URL', async(socialPlatform) => {
    const allHandles = await browser.getWindowHandles();
    const targetWindow = allHandles.find(handle => handle !== primaryWindowHandle);
    await browser.switchToWindow(targetWindow);
    await expect(browser).toHaveUrl(socialPlatformData.urlAfterRebranding,
            {message: `ERROR: Url in new tab does not match ${socialPlatform}'s ${socialPlatformData.urlAfterRebranding}`}
            );
    await browser.closeWindow();
    await browser.switchToWindow(primaryWindowHandle);        
});


    
    
    