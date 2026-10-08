import {By} from 'selenium-webdriver';

import BasePage from './BasePage.js';

class CheckoutResumoPage extends BasePage {

    constructor(driver){

        super(driver);

        this.locators = {

            tituloResumo: By.xpath("//h2[text()='Resumo do pedido']"),

            linkVoltar: By.linkText('Voltar')
        };
    }

    async clicarVoltar(){

        await this.click(this.locators.linkVoltar);
    }
}

export default CheckoutResumoPage;