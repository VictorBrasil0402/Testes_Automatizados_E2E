class CheckoutResumoPage{

    elements = {

        checkoutOverviewTitle: () => cy.get('[data-test="title"]'),

        subtotal: () => cy.get('[data-test="subtotal-label"]'),

        tax: () => cy.get('[data-test="tax-label"]'),

        total: () => cy.get('[data-test="total-label"]'),

        finishButton: () => cy.get('[data-test="finish"]')
    };

    obterSubtotal(){

        return this.elements.subtotal().invoke('text').then(text => Number(text.replace(/[^\d.]/g, '')));
    }

    obterTaxa(){

       return this.elements.tax().invoke('text').then(text => Number(text.replace(/[^\d.]/g, '')));
    }

    obterTotal(){

        return this.elements.total().invoke('text').then(text => Number(text.replace(/[^\d.]/g, '')));
    }

    clicarFinalizarPedido(){

        this.elements.finishButton().click();
    }
}

export default new CheckoutResumoPage();