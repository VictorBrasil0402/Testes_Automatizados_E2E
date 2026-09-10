const { By } = require('selenium-webdriver');

const BasePage = require('./BasePage');

class CheckoutResumoPage extends BasePage {

    constructor(driver){

        super(driver);

        this.locators = {

            tituloResumo: By.xpath("//h2[contains(text(), 'Resumo do pedido')]")
        };
    }
}

module.exports = CheckoutResumoPage;