class CheckoutLoginPage{

    elements = {

        campoIdentificador: () => cy.get('#login-email'),

        botaoContinuar: () => cy.get('#login-action'),
    };

    preencherEmail(usuario){

        this.elements.campoIdentificador().type(usuario.email);
    }

    clicarContinuar(){

        this.elements.botaoContinuar().click();
    }
}

export default new CheckoutLoginPage();