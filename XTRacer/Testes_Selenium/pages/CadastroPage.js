import {By} from 'selenium-webdriver';

import BasePage from './BasePage.js';

import CadastroPFComponent from '../components/CadastroPFComponent.js';

import CadastroPJComponent from '../components/CadastroPJComponent.js';

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

export default CadastroPage;