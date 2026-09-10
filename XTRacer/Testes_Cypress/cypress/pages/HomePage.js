import 'cypress-real-events';

class HomePage{

    elements = {

        menuMinhaConta: () => cy.contains('h4', 'MINHA CONTA'),

        linkCadastro: () => cy.contains('a', 'Cadastre-se'),

        linkLogin: () => cy.contains('a', 'Entre'),

        linkProdutos: () => cy.contains('a', 'Todos os Produtos')
    };

    abrir(){

        cy.visit('https://www.xtracer.com.br');
    }

    abrirMenuMinhaConta(){

        this.elements.menuMinhaConta().realHover();
    }

    acessarPaginaCadastro(){

        this.elements.linkCadastro().click();
    }

    acessarPaginaLogin(){

        this.elements.linkLogin().click();
    }

    acessarPaginaProdutos(){

        this.elements.linkProdutos().click();
    }
}

export default new HomePage();