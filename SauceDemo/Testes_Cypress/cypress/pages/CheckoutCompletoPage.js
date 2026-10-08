class CheckoutCompletoPage{

    elements = {

        checkoutCompleteTitle: () => cy.get('[data-test="title"]'),

        orderConfirmationTitle: () => cy.get('[data-test="complete-header"]')
    };
}

export default new CheckoutCompletoPage();