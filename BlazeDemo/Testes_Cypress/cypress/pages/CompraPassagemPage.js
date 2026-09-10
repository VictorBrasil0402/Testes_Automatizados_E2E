class CompraPassagemPage{

    elements = {

        name: () => cy.get('#inputName'),

        address: () => cy.get('#address'),

        city: () => cy.get('#city'),

        state: () => cy.get('#state'),

        zipCode: () => cy.get('#zipCode'),

        cardType: () => cy.get('#cardType'),

        creditCardNumber: () => cy.get('#creditCardNumber'),

        creditCardMonth: () => cy.get('#creditCardMonth'),

        creditCardYear: () => cy.get('#creditCardYear'),

        nameOnCard: () => cy.get('#nameOnCard'),

        purchaseFlightButton: () => cy.get('input[type="submit"]')
    };

    preencherDadosPessoais(user){

        this.elements.name().type(user.name);

        this.elements.address().type(user.address);

        this.elements.city().type(user.city);

        this.elements.state().type(user.state);

        this.elements.zipCode().type(user.zipCode);
    }

    selecionarTipoCartao(cardType){

        this.elements.cardType().select(cardType);
    }

    preencherDadosPagamento(user){

        this.elements.creditCardNumber().type(user.creditCardNumber);

        this.elements.creditCardMonth().clear().type(user.creditCardMonth);

        this.elements.creditCardYear().clear().type(user.creditCardYear);

        this.elements.nameOnCard().type(user.name);
    }

    clicarComprar(){

        this.elements.purchaseFlightButton().click();
    }
}

export default new CompraPassagemPage();