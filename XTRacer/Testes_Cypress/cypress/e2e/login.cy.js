import HomePage from "../pages/HomePage";

import LoginPage from "../pages/LoginPage";

describe('Realizar Login', () => {

    let usuario;

    beforeEach(() => {

        cy.env(['email', 'senha']).then((env) => {

            usuario = {...env}
        });

        HomePage.abrir();

        HomePage.abrirMenuMinhaConta();

        HomePage.acessarPaginaLogin();

        cy.url().should('include', 'login');
    });

    it('Login com dados válidos', () => {

        LoginPage.abrirFormularioLogin();

        LoginPage.preencherEmail(usuario);

        LoginPage.clicarContinuar();

        LoginPage.preencherSenha(usuario);

        LoginPage.clicarEnviar();

        cy.url().should('include', 'my-account');
    });

    it('Login com e-mail inválido', () => {

        usuario.email = 'user_17264@gmail.com';

        LoginPage.abrirFormularioLogin();

        LoginPage.preencherEmail(usuario);

        LoginPage.clicarContinuar();

        LoginPage.elements.erroIdentificador().should('be.visible').and('have.text', 'Dados inválidos. Tente novamente.');

        LoginPage.elements.campoSenha().should('not.exist');
    });

    it('Login com senha inválida', () => {

        usuario.senha = '72459253n';

        LoginPage.abrirFormularioLogin();

        LoginPage.preencherEmail(usuario);

        LoginPage.clicarContinuar();

        LoginPage.preencherSenha(usuario);

        LoginPage.clicarEnviar();

        LoginPage.elements.erroAutenticacao().should('be.visible').and('have.text', 'Autenticação incorreta.');

        cy.url().should('include', 'login');
    });
});