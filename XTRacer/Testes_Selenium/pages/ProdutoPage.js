const { By } = require('selenium-webdriver');

const BasePage = require('./BasePage');

class ProdutoPage extends BasePage {

    constructor(driver){

        super(driver);

        this.locators = {

            botaoComprar: By.xpath("//button[contains(text(), 'COMPRAR')]"),

            botaoFinalizarCompra: By.linkText('Finalizar Compra'),

            legendaProdutoIndisponivel: By.xpath("//span[contains(text(), 'Não disponível')]")
        };
    }

    async clicarComprar(){

        await this.click(this.locators.botaoComprar);
    }

    async clicarFinalizarCompra(){

        await this.click(this.locators.botaoFinalizarCompra);
    }
}

module.exports = ProdutoPage;