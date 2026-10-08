import { By } from 'selenium-webdriver';

import BasePage from './BasePage.js';

class ConfirmacaoCompraPage extends BasePage{

    constructor(driver){

        super(driver);

        this.locators = {

            purchaseConfirmationTitle: By.css('h1')
        }
    };
}

export default ConfirmacaoCompraPage;