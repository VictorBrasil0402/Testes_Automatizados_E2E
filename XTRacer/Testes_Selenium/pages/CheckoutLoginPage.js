const {By} = require('selenium-webdriver');

const BasePage = require('./BasePage');

class CheckoutLoginPage extends BasePage {

    constructor(driver){

        super(driver);

        this.locators = {

            campoIdentificador: By.id('login-email'),

            botaoContinuar: By.id('login-action'),
        };
    }

    async preencherEmail(usuario){

        await this.type(this.locators.campoIdentificador, usuario.email);
    }

    async clicarContinuar(){

        await this.click(this.locators.botaoContinuar);
    }
}

module.exports = CheckoutLoginPage;