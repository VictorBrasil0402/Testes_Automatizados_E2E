const {By} = require('selenium-webdriver');

const BasePage = require('./BasePage');

class CompraPassagemPage extends BasePage{

    constructor(driver){

        super(driver);

        this.locators = {

            name: By.id('inputName'),

            address: By.id('address'),

            city: By.id('city'),

            state: By.id('state'),

            zipCode: By.id('zipCode'),

            cardType: By.id('cardType'),

            creditCardNumber: By.id('creditCardNumber'),

            creditCardMonth: By.id('creditCardMonth'),

            creditCardYear: By.id('creditCardYear'),

            nameOnCard: By.id('nameOnCard'),

            purchaseFlightButton: By.css('input[type="submit"]')
        };
    }

    async preencherDadosPessoais(user){

        await this.type(this.locators.name, user.name);

        await this.type(this.locators.address, user.address);

        await this.type(this.locators.city, user.city);

        await this.type(this.locators.state, user.state);

        await this.type(this.locators.zipCode, user.zipCode);
    }

    async selecionarTipoCartao(cardType){

        await this.click(this.locators.cardType);

        await this.click(By.css(`option[value="${cardType}"]`));
    }

    async preencherDadosPagamento(user){

        await this.type(this.locators.creditCardNumber, user.creditCardNumber);

        await this.type(this.locators.creditCardMonth, user.creditCardMonth);

        await this.type(this.locators.creditCardYear, user.creditCardYear);

        await this.type(this.locators.nameOnCard, user.name);
    }

    async clicarComprar(){

        await this.click(this.locators.purchaseFlightButton);
    }
}

module.exports = CompraPassagemPage;