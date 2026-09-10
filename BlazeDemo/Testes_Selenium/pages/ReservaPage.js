const {By} = require('selenium-webdriver');

const BasePage = require('./BasePage');

class ReservaPage extends BasePage{

    constructor(driver){

        super(driver);

        this.locators = {

            flightsTitle: By.css('h3'),

            flightsTable: By.css('.table'),

            chooseFlightButton: By.css('input[type="submit"]')
        };
    }

    async selecionarVoo(){

        await this.waitElement(this.locators.flightsTable);

        const flights = await this.driver.findElements(this.locators.flightsTable);

        await flights[0].findElement(this.locators.chooseFlightButton).click();
    }
}

module.exports = ReservaPage;