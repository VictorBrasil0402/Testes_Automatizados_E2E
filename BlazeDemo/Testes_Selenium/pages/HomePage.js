const {By} = require('selenium-webdriver');

const BasePage = require('./BasePage');

class HomePage extends BasePage{

    constructor(driver){

        super(driver);

        this.url = 'https://www.blazedemo.com';

        this.locators = {

            departureCity: By.name('fromPort'),

            destinationCity: By.name('toPort'),

            findFlightsButton: By.css('input[type="submit"]')
        };
    }

    async abrir(){

        await this.open(this.url);
    }

    async selecionarCidadeOrigem(city){

        await this.click(this.locators.departureCity);

        await this.click(By.css(`option[value="${city}"]`));
    }

    async selecionarCidadeDestino(city){

        await this.click(this.locators.destinationCity);

        await this.click(By.css(`option[value="${city}"]`));
    }

    async clicarEncontrarVoos(){

        await this.click(this.locators.findFlightsButton);
    }
}

module.exports = HomePage;