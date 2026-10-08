class CheckoutResumoPage{

    elements = {

        tituloResumo: () => cy.contains('h2', 'Resumo do pedido'),

        linkVoltar: () => cy.contains('a', 'Voltar')
    }

    clicarVoltar(){

        this.elements.linkVoltar().click();
    }
}

export default new CheckoutResumoPage();