class ProdutosPage{

    elements = {

        botaoFiltrar: () => cy.get('.filter-button'),

        produtos: () => cy.get('.list-product.flex.f-wrap .item.flex'),

        linkUltimaPagina: () => cy.get('a[rel="last"]')
    };

    selecionarFiltro(nomeFiltro){

        cy.contains('.filter-name', nomeFiltro).click();
    }

    clicarFiltrar(){

        this.elements.botaoFiltrar().click();
    }

    selecionarUltimaPagina(){

        this.elements.linkUltimaPagina().click();
    }

    selecionarProduto(){

        this.elements.produtos().first().click();
    }
}

export default new ProdutosPage();