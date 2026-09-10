const { By } = require('selenium-webdriver');

const BasePage = require('./BasePage');

class ProdutosPage extends BasePage {

    constructor(driver){

        super(driver);

        this.locators = {

            botaoFiltrar: By.css('.filter-button'),

            listaprodutos: By.css('.list-product.flex.f-wrap'),

            produto: By.css('.item.flex'),

            linkUltimaPagina: By.css('a[rel="last"]')
        };
    }

    async selecionarFiltro(nomeFiltro){

        await this.clickJs(By.xpath(`//span[@class='filter-name' and text()='${nomeFiltro}']`));
    }

    async clicarFiltrar(){

        await this.click(this.locators.botaoFiltrar);
    }

    async selecionarUltimaPagina(){

        await this.click(this.locators.linkUltimaPagina);
    }

    async selecionarProduto(){

        await this.waitElement(this.locators.listaprodutos);

        const produtos = await this.driver.findElements(this.locators.listaprodutos);

        await produtos[0].findElement(this.locators.produto).click();
    }
}

module.exports = ProdutosPage;