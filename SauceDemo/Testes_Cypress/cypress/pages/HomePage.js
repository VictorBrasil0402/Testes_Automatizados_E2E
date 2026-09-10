class HomePage{

    elements = {

        username: () => cy.get('[data-test="username"]'),

        password: () => cy.get('[data-test="password"]'),

        loginButton: () => cy.get('[data-test="login-button"]'),

        loginErrorMessage: () => cy.get('[data-test="error"]')
    };

    abrir(){

        cy.visit('https://www.saucedemo.com');
    }

    preencherUsuario(user){

        this.elements.username().type(user.username);
    }

    preencherSenha(user){

        this.elements.password().type(user.password);
    }

    clicarEnviar(){

        this.elements.loginButton().click();
    }
}

export default new HomePage();