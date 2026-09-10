class ReservaPage{

    elements = {

        flightsTitle: () => cy.get('h3'),

        flightsTable: () => cy.get('.table'),

        chooseFlightButtons: () => cy.get('.table input[type="submit"]')
    };

    selecionarVoo(){

        this.elements.chooseFlightButtons().first().click();
    }
}

export default new ReservaPage();