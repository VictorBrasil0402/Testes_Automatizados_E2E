class ConfirmacaoCompraPage{

    elements = {

        purchaseConfirmationTitle: () => cy.get('h1')
    };
}

export default new ConfirmacaoCompraPage();