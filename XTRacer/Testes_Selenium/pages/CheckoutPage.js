const { By } = require('selenium-webdriver');

const BasePage = require('./BasePage');

class CheckoutPage extends BasePage {

    constructor(driver){

        super(driver);

        this.locators = {

            campoCep: By.id('cart-shipping-vue'),

            botaoContinuar: By.css('a[data-checkout-event-tracker="avancar_topo"]'),

            erroCep: By.css('[data-test="cart-shipping-alert"]')
        };
    }

    async preencherCEP(usuario){

        await this.type(this.locators.campoCep, usuario.cep);
    }

    async clicarContinuar(){

        await this.click(this.locators.botaoContinuar);
    }
}

module.exports = CheckoutPage;