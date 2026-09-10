class HomePage{

    elements = {

        departureCity: () => cy.get('select[name="fromPort"]'),
        
        destinationCity: () => cy.get('select[name="toPort"]'),

        findFlightsButton: () => cy.get('input[type="submit"]')
    };

    abrir(){

        cy.visit('https://www.blazedemo.com');
    }

    selecionarCidadeOrigem(city){

        this.elements.departureCity().select(city);
    }

    selecionarCidadeDestino(city){

        this.elements.destinationCity().select(city);
    }

    clicarEncontrarVoos(){

        this.elements.findFlightsButton().click();
    }
}

export default new HomePage();