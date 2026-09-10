const {By} = require('selenium-webdriver');

const BasePage = require('./BasePage');

class ConfirmacaoCompraPage extends BasePage{

    constructor(driver){

        super(driver);

        this.locators = {

            purchaseConfirmationTitle: By.css('h1')
        }
    };
}

module.exports = ConfirmacaoCompraPage;