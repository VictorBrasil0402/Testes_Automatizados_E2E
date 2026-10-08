class LoginPage{

    elements = {

        botaoEntrar: () => cy.get('#login-button'),

        campoIdentificador: () => cy.get('#input-email'),

        botaoContinuar: () => cy.get('#tray-login-identify'),

        campoSenha: () => cy.get('#input-password'),

        botaoEnviar: () => cy.get('#password-submit'),

        loading: () => cy.get('.tray-loading'),

        erroIdentificador: () => cy.contains('span', 'Dados inválidos. Tente novamente.'),

        erroAutenticacao: () => cy.contains('span', 'Autenticação incorreta.')
    };

    abrirFormularioLogin(){

        this.elements.botaoEntrar().should('not.have.class', 'app__loading').click();
    }

    preencherEmail(usuario){

        this.elements.campoIdentificador().type(usuario.email);
    }

    clicarContinuar(){

        this.elements.botaoContinuar().click();
    }

    preencherSenha(usuario){

        this.elements.campoSenha().type(usuario.senha);
    }

    clicarEnviar(){

        this.elements.loading().should('not.be.visible');

        this.elements.botaoEnviar().click();
    }
}

export default new LoginPage();