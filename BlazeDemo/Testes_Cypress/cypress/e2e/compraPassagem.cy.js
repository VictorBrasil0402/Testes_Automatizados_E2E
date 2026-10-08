import HomePage from '../pages/HomePage.js';

import ReservaPage from '../pages/ReservaPage.js';

import CompraPassagemPage from '../pages/CompraPassagemPage.js';

import ConfirmacaoCompraPage from '../pages/ConfirmacaoCompraPage.js';

import User from '../fixtures/User.js';

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