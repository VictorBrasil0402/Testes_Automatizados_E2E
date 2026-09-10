class CheckoutPage{

    elements = {

        campoCep: () => cy.get('#cart-shipping-vue'),

        botaoContinuar: () => cy.get('a[data-checkout-event-tracker="avancar_topo"]'),

        erroCep: () => cy.get('[data-test="cart-shipping-alert"]')
    };

    preencherCEP(usuario){

        this.elements.campoCep().type(usuario.cep);
    }

    clicarContinuar(){

        this.elements.botaoContinuar().click();
    }
}

export default new CheckoutPage();