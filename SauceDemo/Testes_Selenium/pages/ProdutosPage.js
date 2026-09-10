const {By} = require('selenium-webdriver');

const BasePage = require('./BasePage');

class ProdutosPage extends BasePage{

    constructor(driver){

        super(driver);

        this.locators = {

            productsTitle: By.css('[data-test="title"]'),

            productsList: By.css('[data-test="inventory-list"]'),

            productImage: By.css('.inventory_item_img'),
        };
    }

    async selecionarProduto(){

        await this.waitElement(this.locators.productsList);

        const products = await this.driver.findElements(this.locators.productsList);

        await products[0].findElement(this.locators.productImage).click();
    }
}

module.exports = ProdutosPage;