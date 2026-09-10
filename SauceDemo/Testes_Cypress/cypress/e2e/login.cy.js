import HomePage from "../pages/HomePage";

import User from "../fixtures/User";

import ProdutosPage from "../pages/ProdutosPage";

describe('Realizar Login', () => {

    it('Login com dados válidos', () => {

        const user = User.gerarUsuario();

        HomePage.abrir();

        HomePage.preencherUsuario(user);

        HomePage.preencherSenha(user);

        HomePage.clicarEnviar();

        cy.url().should('include', 'inventory');

        ProdutosPage.elements.productsTitle().should('have.text', 'Products');
    });

    it('Login com usuário inválido', () => {

        const user = User.gerarUsuario();

        user.username = 'user';

        HomePage.abrir();

        HomePage.preencherUsuario(user);

        HomePage.preencherSenha(user);

        HomePage.clicarEnviar();

        HomePage.elements.loginErrorMessage().should('be.visible').and('contain', 'Username and password do not match');
    });

    it('Login com senha inválida', () => {

        const user = User.gerarUsuario();

        user.password = 'sauce';

        HomePage.abrir();

        HomePage.preencherUsuario(user);

        HomePage.preencherSenha(user);

        HomePage.clicarEnviar();

        HomePage.elements.loginErrorMessage().should('be.visible').and('contain', 'Username and password do not match');
    });
});