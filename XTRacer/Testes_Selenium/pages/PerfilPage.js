const { By } = require('selenium-webdriver');

const BasePage = require('./BasePage');

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

module.exports = PerfilPage;