class ProdutoPage{

    elements = {

        botaoComprar: () => cy.contains('button', 'COMPRAR'),

        botaoFinalizarCompra: () => cy.contains('a', 'Finalizar Compra'),

        legendaProdutoIndisponivel: () => cy.contains('span', 'Não disponível')
    };

    clicarComprar(){

        this.elements.botaoComprar().click();
    }

    clicarFinalizarCompra(){

        this.elements.botaoFinalizarCompra().click();
    }
}

export default new ProdutoPage();