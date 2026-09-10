import HomePage from "../pages/HomePage";

import ReservaPage from "../pages/ReservaPage";

import CompraPassagemPage from "../pages/CompraPassagemPage";

import ConfirmacaoCompraPage from "../pages/ConfirmacaoCompraPage";

import User from "../fixtures/User";

describe('Realizar Compra de Passagens', () => {

    it('Compra de passagem com dados válidos', () => {

        const user = User.gerarUsuario();

        HomePage.abrir();

        HomePage.selecionarCidadeOrigem('Boston');

        HomePage.selecionarCidadeDestino('London');

        HomePage.clicarEncontrarVoos();

        cy.url().should('include', 'reserve');

        ReservaPage.elements.flightsTable().should('be.visible');

        ReservaPage.selecionarVoo();

        cy.url().should('include', 'purchase');

        CompraPassagemPage.preencherDadosPessoais(user);

        CompraPassagemPage.selecionarTipoCartao('amex');

        CompraPassagemPage.preencherDadosPagamento(user);

        CompraPassagemPage.clicarComprar();

        ConfirmacaoCompraPage.elements.purchaseConfirmationTitle().should('have.text', 'Thank you for your purchase today!');
    });
});