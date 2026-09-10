class CheckoutPage{

    elements = {

        checkoutTitle: () => cy.get('[data-test="title"]'),

        firstName: () => cy.get('[data-test="firstName"]'),

        lastName: () => cy.get('[data-test="lastName"]'),

        zipCode: () => cy.get('[data-test="postalCode"]'),

        continueButton: () => cy.get('[data-test="continue"]')
    };

    preencherNome(user){

        this.elements.firstName().type(user.firstname);
    }

    preencherSobrenome(user){

        this.elements.lastName().type(user.lastname);
    }

    preencherCodigoPostal(user){

        this.elements.zipCode().type(user.zipcode);
    }

    clicarContinuar(){

        this.elements.continueButton().click();
    }
}

export default new CheckoutPage();