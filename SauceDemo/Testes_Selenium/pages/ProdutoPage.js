import {By} from 'selenium-webdriver';

import BasePage from './BasePage.js';

class ProdutoPage extends BasePage{

    constructor(driver){

        super(driver);

        this.locators = {

            cartButton: By.css('[data-test="add-to-cart"]'),

            cartBadge: By.css('[data-test="shopping-cart-badge"]'),

            cartLink: By.css('[data-test="shopping-cart-link"]')
        };
    }

    async adicionarProdutoCarrinho(){
        
        await this.click(this.locators.cartButton);
    }

    async acessarCarrinho(){

        await this.click(this.locators.cartLink);
    }
}

export default ProdutoPage;