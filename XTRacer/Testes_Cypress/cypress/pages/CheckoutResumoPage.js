class CheckoutResumoPage{

    elements = {

        tituloResumo: () => cy.contains('h2', 'Resumo do pedido')
    }
}

export default new CheckoutResumoPage();