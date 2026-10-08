import HomePage from '../pages/HomePage.js';

import ProdutosPage from '../pages/ProdutosPage.js';

import ProdutoPage from '../pages/ProdutoPage.js';

import CarrinhoPage from '../pages/CarrinhoPage.js';

import CheckoutPage from '../pages/CheckoutPage.js';

import CheckoutResumoPage from '../pages/CheckoutResumoPage.js';

import CheckoutCompletoPage from '../pages/CheckoutCompletoPage.js';

import User from '../fixtures/User.js';

describe('Realizar Compra de Produto', () => {

    it('Compra de produto com dados válidos', () => {

        const user = User.gerarUsuario();

        HomePage.abrir();

        HomePage.preencherUsuario(user);

        HomePage.preencherSenha(user);

        HomePage.clicarEnviar();

        cy.url().should('include', 'inventory');

        ProdutosPage.elements.productsTitle().should('have.text', 'Products');

        ProdutosPage.selecionarProduto();

        ProdutoPage.adicionarProdutoCarrinho();

        ProdutoPage.elements.cartBadge().should('have.text', '1');

        ProdutoPage.acessarCarrinho();

        CarrinhoPage.elements.cartTitle().should('have.text', 'Your Cart');

        CarrinhoPage.obterQuantidadeProduto().as('quantity');

        CarrinhoPage.obterPrecoProduto().as('price');

        CarrinhoPage.acessarCheckout();

        CheckoutPage.elements.checkoutTitle().should('have.text', 'Checkout: Your Information');

        CheckoutPage.preencherNome(user);

        CheckoutPage.preencherSobrenome(user);

        CheckoutPage.preencherCodigoPostal(user);

        CheckoutPage.clicarContinuar();

        CheckoutResumoPage.elements.checkoutOverviewTitle().should('have.text', 'Checkout: Overview');

        CheckoutResumoPage.obterSubtotal().as('subtotal');

        CheckoutResumoPage.obterTaxa().as('tax');

        CheckoutResumoPage.obterTotal().as('total');

        cy.then(function(){

            expect(this.subtotal).to.be.closeTo(this.price * this.quantity, 0.01);

            expect(this.total).to.be.closeTo(this.subtotal + this.tax, 0.01);

        });

        CheckoutResumoPage.clicarFinalizarPedido();

        CheckoutCompletoPage.elements.checkoutCompleteTitle().should('have.text', 'Checkout: Complete!');

        CheckoutCompletoPage.elements.orderConfirmationTitle().should('have.text', 'Thank you for your order!');
    });
});