const {By} = require('selenium-webdriver');

const BasePage = require('./BasePage');

class CheckoutPage extends BasePage{

    constructor(driver){

        super(driver);

        this.locators = {

            checkoutTitle: By.css('[data-test="title"]'),

            firstName: By.css('[data-test="firstName"]'),

            lastName: By.css('[data-test="lastName"]'),

            zipCode: By.css('[data-test="postalCode"]'),

            continueButton: By.css('[data-test="continue"]')
        };
    }

    async preencherNome(user){

        await this.type(this.locators.firstName, user.firstname);
    }

    async preencherSobrenome(user){

        await this.type(this.locators.lastName, user.lastname);
    }

    async preencherCodigoPostal(user){

        await this.type(this.locators.zipCode, user.zipcode);
    }

    async clicarContinuar(){

        await this.click(this.locators.continueButton);
    }
}

module.exports = CheckoutPage;