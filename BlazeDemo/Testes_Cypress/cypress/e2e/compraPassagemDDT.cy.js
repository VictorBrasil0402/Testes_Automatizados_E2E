import HomePage from '../pages/HomePage.js';

import ReservaPage from '../pages/ReservaPage.js';

import CompraPassagemPage from '../pages/CompraPassagemPage.js';

import ConfirmacaoCompraPage from '../pages/ConfirmacaoCompraPage.js';

import User from '../fixtures/User.js';

import massaDados from '../fixtures/massaDados.json';

describe('Realizar Compra de Passagens', () => {

    massaDados.forEach(({origem, destino}) => {    
      
    it(`Compra de passagem ${origem} - ${destino}`, () =>{

        const user = User.gerarUsuario();

        HomePage.abrir();

        HomePage.selecionarCidadeOrigem(origem);

        HomePage.selecionarCidadeDestino(destino);

        HomePage.clicarEncontrarVoos();

        cy.url().should('include', 'reserve');

        ReservaPage.elements.flightsTitle().should('contain', `Flights from ${origem} to ${destino}:`);

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
});