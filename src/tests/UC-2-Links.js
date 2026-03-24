// UC-2 Footer & Social Links:
// o Scroll to the footer.
// o Verify that the Twitter, Facebook, and LinkedIn links exist.
// o (Optional/Bonus) Verify that clicking a social link opens the correct URL in a new tab/window.
describe('Social media links', async => {

    const socialMediaLinks= [

        { name: 'Twitter', selector: '.social_twitter a', url: 'https://twitter.com/saucelabs', urlAfterRebranding: 'https://x.com/saucelabs'},
        { name: 'Facebook', selector: '.social_facebook a', url: 'https://www.facebook.com/saucelabs', urlAfterRebranding: 'https://www.facebook.com/saucelabs'},
        { name: 'LinkedIn', selector:'.social_linkedin a', url: 'https://www.linkedin.com/company/sauce-labs/', urlAfterRebranding: 'https://www.linkedin.com/company/sauce-labs/'}
    ];

   

    beforeEach(async () => {
    await browser.url('/');
    });
    
    it('Should verify 3 social media links', async () => {
        
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();

        await $('.footer').scrollIntoView();

        for (const social of socialMediaLinks) {
            const socialLink = await $(social.selector);
            await expect(socialLink).toBeDisplayed();
            await expect(socialLink).toHaveAttribute('href',social.url);

            //bonus - for happyPath purlopse I added "urlAfterRebranding" but test should fail due to Twitter becoming x.com.
            const primalWindow = await browser.getWindowHandle();
            await socialLink.click();

            await browser.waitUntil(
                async () => (await browser.getWindowHandles()).length>1
            );

            const handles = await browser.getWindowHandles();
            await browser.switchToWindow(handles.find(handle => handle != primalWindow));
            await expect(browser).toHaveUrl(social.urlAfterRebranding);
            await browser.closeWindow();
            await browser.switchToWindow(primalWindow);
        }


    });


});