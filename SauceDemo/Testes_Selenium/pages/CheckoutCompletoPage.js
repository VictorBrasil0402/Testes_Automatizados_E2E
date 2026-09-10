const {By} = require('selenium-webdriver');

const BasePage = require('./BasePage');

class CheckoutCompletoPage extends BasePage{

    constructor(driver){

        super(driver);

        this.locators = {

            checkoutCompleteTitle: By.css('[data-test="title"]'),

            orderConfirmationTitle: By.css('[data-test="complete-header"]')
        };
    }
}

module.exports = CheckoutCompletoPage;