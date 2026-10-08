import HomePage from '../pages/HomePage.js';

import LoginPage from '../pages/LoginPage.js';

import ProdutosPage from '../pages/ProdutosPage.js';

import ProdutoPage from '../pages/ProdutoPage.js';

import CheckoutPage from '../pages/CheckoutPage.js';

import CheckoutLoginPage from '../pages/CheckoutLoginPage.js';

import CheckoutResumoPage from '../pages/CheckoutResumoPage.js';

describe('Selecionar Produtos', () => {

    let usuario;

    beforeEach(() =>{

        cy.env(['email', 'senha', 'cep']).then((env) => {

            usuario = {...env};
        });

        cy.session('login', () => {

            HomePage.abrir();
            
            HomePage.abrirMenuMinhaConta();
    
            HomePage.acessarPaginaLogin();

            cy.url().should('include', 'login');
    
            LoginPage.abrirFormularioLogin();
    
            LoginPage.preencherEmail(usuario);
    
            LoginPage.clicarContinuar();
    
            LoginPage.preencherSenha(usuario);
    
            LoginPage.clicarEnviar();
    
            cy.url().should('include', 'my-account');
        });
    });

    it('Seleção de produto com dados válidos', () => {

        HomePage.abrir();

        HomePage.acessarPaginaProdutos();

        ProdutosPage.selecionarFiltro('XT Office');

        ProdutosPage.clicarFiltrar();

        ProdutosPage.selecionarProduto();

        ProdutoPage.clicarComprar();

        ProdutoPage.clicarFinalizarCompra();

        cy.url().should('include', '#identifique_se');

        CheckoutLoginPage.preencherEmail(usuario);

        CheckoutLoginPage.clicarContinuar();

        CheckoutResumoPage.clicarVoltar();

        cy.url().should('include', '#carrinho');

        CheckoutPage.preencherCEP(usuario);

        CheckoutPage.clicarContinuar();

        cy.url().should('include', '#principal');

        CheckoutResumoPage.elements.tituloResumo().should('have.text', 'Resumo do pedido');
    });

    it('Seleção de produto com CEP inválido', () => {

        usuario.cep = '32333333';

        HomePage.abrir();

        HomePage.acessarPaginaProdutos();

        ProdutosPage.selecionarProduto();

        ProdutoPage.clicarComprar();

        ProdutoPage.clicarFinalizarCompra();

        cy.url().should('include', '#identifique_se');

        CheckoutLoginPage.preencherEmail(usuario);

        CheckoutLoginPage.clicarContinuar();

        CheckoutResumoPage.clicarVoltar();

        cy.url().should('include', '#carrinho');

        CheckoutPage.preencherCEP(usuario);

        CheckoutPage.clicarContinuar();

        CheckoutPage.elements.erroCep().should('be.visible').and('contain', 'Não foi possível carregar seu endereço');

        cy.url().should('include', '#carrinho');
    });

    it('Seleção de produto com estoque indisponível', () => {

        HomePage.abrir();

        HomePage.acessarPaginaProdutos();

        ProdutosPage.selecionarUltimaPagina();

        ProdutosPage.selecionarProduto();

        ProdutoPage.elements.legendaProdutoIndisponivel().should('be.visible').and('contain', 'Não disponível');
    });
});