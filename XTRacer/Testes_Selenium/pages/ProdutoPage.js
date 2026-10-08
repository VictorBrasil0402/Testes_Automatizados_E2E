import {By} from 'selenium-webdriver';

import BasePage from './BasePage.js';

class ProdutoPage extends BasePage {

    constructor(driver){

        super(driver);

        this.locators = {

            botaoComprar: By.xpath("//button[text()='COMPRAR']"),

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

export default ProdutoPage;