const {By} = require('selenium-webdriver');

const BasePage = require('./BasePage');

class CheckoutResumoPage extends BasePage{
    
    constructor(driver){

        super(driver);

        this.locators = {

            checkoutOverviewTitle: By.css('[data-test="title"]'),

            subtotal: By.css('[data-test="subtotal-label"]'),

            tax: By.css('[data-test="tax-label"]'),

            total: By.css('[data-test="total-label"]'),

            finishButton: By.css('[data-test="finish"]')
        };
    }

    async obterSubtotal(){

        const subTotal = await this.getText(this.locators.subtotal);

        return Number(subTotal.replace(/[^\d.]/g, ''));

    }

    async obterTaxa(){

        const tax = await this.getText(this.locators.tax);

        return Number(tax.replace(/[^\d.]/g, ''));
    }

    async obterTotal(){

        const total = await this.getText(this.locators.total);

        return Number(total.replace(/[^\d.]/g, ''));
    }

    async clicarFinalizarPedido(){

        await this.click(this.locators.finishButton);
    }
}

module.exports = CheckoutResumoPage;