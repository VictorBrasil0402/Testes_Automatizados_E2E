import CadastroPFComponent from '../components/CadastroPFComponent.js';

import CadastroPJComponent from '../components/CadastroPJComponent.js';

class CadastroPage{

    elements = {

        titulo: () => cy.get('h1')
    };

    pessoaFisica = CadastroPFComponent;

    pessoaJuridica = CadastroPJComponent;
}

export default new CadastroPage();