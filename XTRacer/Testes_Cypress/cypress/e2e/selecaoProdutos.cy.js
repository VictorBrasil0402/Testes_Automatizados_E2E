import HomePage from "../pages/HomePage";

import LoginPage from "../pages/LoginPage";

import ProdutosPage from "../pages/ProdutosPage";

import ProdutoPage from "../pages/ProdutoPage";

import CheckoutPage from "../pages/CheckoutPage";

import CheckoutLoginPage from "../pages/CheckoutLoginPage";

import CheckoutResumoPage from "../pages/CheckoutResumoPage";

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

        cy.url().should('include', '#carrinho');

        CheckoutPage.preencherCEP(usuario);

        CheckoutPage.clicarContinuar();

        cy.url().should('include', '#identifique_se');

        CheckoutLoginPage.preencherEmail(usuario);

        CheckoutLoginPage.clicarContinuar();

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

        cy.url().should('include', '#carrinho');

        CheckoutPage.preencherCEP(usuario);

        CheckoutPage.clicarContinuar();

        CheckoutPage.elements.erroCep().should('be.visible').and('contain', 'Não foi possível carregar seu endereço');

        cy.url().should('include', '#carrinho');

        CheckoutLoginPage.elements.campoIdentificador().should('not.exist');
    });

    it('Seleção de produto com estoque indisponível', () => {

        HomePage.abrir();

        HomePage.acessarPaginaProdutos();

        ProdutosPage.selecionarUltimaPagina();

        ProdutosPage.selecionarProduto();

        ProdutoPage.elements.legendaProdutoIndisponivel().should('be.visible').and('contain', 'Não disponível');
    });
});