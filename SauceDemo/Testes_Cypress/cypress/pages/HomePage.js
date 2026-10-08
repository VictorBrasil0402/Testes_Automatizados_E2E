class HomePage{

    elements = {

        username: () => cy.get('[data-test="username"]'),

        password: () => cy.get('[data-test="password"]'),

        loginButton: () => cy.get('[data-test="login-button"]'),

        loginError: () => cy.contains('h3', 'Username and password do not match'),

        userRequired: () => cy.contains('h3', 'Username is required'),

        passwordRequired: () => cy.contains('h3', 'Password is required')
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