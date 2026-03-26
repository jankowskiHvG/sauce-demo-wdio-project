const {Header, Footer} = require('../components');

class BasePage {
   constructor(url) {
    this.url = url;
    this.header = new Header();
    this.footer = new Footer();
   }

   open() {
    return browser.url(this.url);
   }
}

module.exports = BasePage;