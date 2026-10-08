import {By} from 'selenium-webdriver';

import BasePage from './BasePage.js';

class PerfilPage extends BasePage {

    constructor(driver) {

        super(driver);

        this.locators = {

            linkLoja: By.css('.app__header__store-link')
        };
    }

    async voltarParaHome(){

        await this.clickJs(this.locators.linkLoja);
    }
}

export default PerfilPage;