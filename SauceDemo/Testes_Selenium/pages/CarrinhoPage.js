import {By} from 'selenium-webdriver';

import BasePage from './BasePage.js';

class CarrinhoPage extends BasePage{

    constructor(driver){

        super(driver);

        this.locators = {

            cartTitle: By.css('[data-test="title"]'),

            itemQuantity: By.css('[data-test="item-quantity"]'),

            itemPrice: By.css('[data-test="inventory-item-price"]'),

            checkoutButton: By.css('[data-test="checkout"]')
        };
    }

    async obterQuantidadeProduto(){

        const quantity = await this.getText(this.locators.itemQuantity);

        return Number(quantity);

    }

    async obterPrecoProduto(){

        const price = await this.getText(this.locators.itemPrice);

        return Number(price.replace(/[^\d.]/g, ''));
    }

    async acessarCheckout(){

        await this.click(this.locators.checkoutButton);
    }
}

export default CarrinhoPage;