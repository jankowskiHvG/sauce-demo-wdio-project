const BasePage = require('./base.page.js');

class LoginPage extends BasePage {
    constructor() {
        super('/');
    }

    get usernameInput() { 
        return $('#user-name');
        }
    
    get passwordInput() {
        return $('#password')
    }

    get submitBtn() {
        return $('#login-button')
    }

    async login(username, password) {
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.submitBtn.click();
    }

    /**
    *@param userType {'standard' | 'locked_out' | 'problem' | 'performance_glitch' | 'error' | 'visual'}
    */
    async loginAs(userType = 'standard') {
        const user = `${userType}_user`;
        const pass = process.env.sauce_password;
        await this.open();

        await this.login(user, pass)
    }
}

module.exports = LoginPage;