import CadastroPFComponent from "../components/CadastroPFComponent";

import CadastroPJComponent from "../components/CadastroPJComponent";

class CadastroPage{

    elements = {

        titulo: () => cy.get('h1')
    };

    pessoaFisica = CadastroPFComponent;

    pessoaJuridica = CadastroPJComponent;
}

export default new CadastroPage();