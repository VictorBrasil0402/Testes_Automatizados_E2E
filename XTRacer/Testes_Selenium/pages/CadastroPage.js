const { By } = require('selenium-webdriver');

const BasePage = require('./BasePage');

const CadastroPFComponent = require('../components/CadastroPFComponent');

const CadastroPJComponent = require('../components/CadastroPJComponent');

class CadastroPage extends BasePage {

    constructor(driver){

        super(driver);

        this.locators = {

            titulo: By.css('h1')

        };

        this.pessoaFisica = new CadastroPFComponent(driver);

        this.pessoaJuridica = new CadastroPJComponent(driver);
    }
}

module.exports = CadastroPage;