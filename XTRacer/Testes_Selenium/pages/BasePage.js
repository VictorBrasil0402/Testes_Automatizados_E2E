const { until } = require('selenium-webdriver');

class BasePage {

    constructor(driver) {

        this.driver = driver;

        this.timeout = 6000;
    }

    // Navegação

    async open(url) {

        await this.driver.get(url);
    }

    // Esperas

    async waitElement(locator) {

        return await this.driver.wait(until.elementLocated(locator), this.timeout);
    }

    async waitVisible(locator) {

        const element = await this.waitElement(locator);

        await this.driver.wait(until.elementIsVisible(element), this.timeout);

        return element;
    }

    async waitEnabled(locator){

        const element = await this.waitVisible(locator);

        await this.driver.wait(until.elementIsEnabled(element), this.timeout);

        return element;
    }

    async waitInvisible(locator){

        const element = await this.waitElement(locator);

        await this.driver.wait(until.elementIsNotVisible(element), this.timeout);
    }

    async waitTitleContains(texto){

        await this.driver.wait(until.titleContains(texto), this.timeout);
    }

    async waitUrlContains(texto) {

        await this.driver.wait(until.urlContains(texto), this.timeout);
    }

    async waitAlert(){

        await this.driver.wait(until.alertIsPresent(), this.timeout);
    }

    // Interações

    async click(locator){

        const element = await this.waitEnabled(locator);

        await element.click();
    }

    async type(locator, texto){

        const element = await this.waitVisible(locator);

        await element.clear();

        await element.sendKeys(texto);
    }

    async hover(locator){

        const element = await this.waitVisible(locator);

        const actions = this.driver.actions({ bridge: true });

        await actions.move({ origin: element }).perform();
    }

    async clickJs(locator){

        const element = await this.waitVisible(locator);

        await this.driver.executeScript("arguments[0].click();", element);
    }

    // Leitura

    async getText(locator){

        const element = await this.waitVisible(locator);

        return await element.getText();
    }

    async getCurrentUrl() {

        return await this.driver.getCurrentUrl();
    }

    async getTitle() {

        return await this.driver.getTitle();
    }

    async isDisplayed(locator){

        const element = await this.waitVisible(locator);

        return await element.isDisplayed();
    }

    // Alert

    async getAlert(){

        await this.waitAlert();

        return await this.driver.switchTo().alert();
    }

    async getAlertText(){

        const alert = await this.getAlert();

        return await alert.getText();
    }

    async acceptAlert(){

        const alert = await this.getAlert();

        await alert.accept();
    }

    // Validações

    async titleContains(texto){

        const title = await this.getTitle();

        return title.includes(texto);
    }

    async urlContains(texto){

        const url = await this.getCurrentUrl();

        return url.includes(texto);
    }
}

module.exports = BasePage;