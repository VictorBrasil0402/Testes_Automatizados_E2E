class PerfilPage{

    elements = {

        linkLoja: () => cy.get('.app__header__store-link')
    };

    voltarParaHome(){

        this.elements.linkLoja().click();
    }
}

export default new PerfilPage();