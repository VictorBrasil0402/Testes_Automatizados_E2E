const {until} = require('selenium-webdriver');

class BasePage{

    constructor(driver){

        this.driver = driver;

        this.timeout = 5000;
    }

    async open(url){

        await this.driver.get(url);
    }

    async waitElement(locator){

        return await this.driver.wait(until.elementLocated(locator), this.timeout);
    }

    async waitVisible(locator){

        const element = await this.waitElement(locator);

        await this.driver.wait(until.elementIsVisible(element), this.timeout);

        return element;
    }

    async waitEnabled(locator){

        const element = await this.waitVisible(locator);

        await this.driver.wait(until.elementIsEnabled(element), this.timeout);

        return element;
    }

    async waitUrlContains(texto){

        await this.driver.wait(until.urlContains(texto), this.timeout);
    }

    async waitTitleContains(texto){

        await this.driver.wait(until.titleContains(texto), this.timeout);
    }

    async click(locator){

        const element = await this.waitEnabled(locator);

        await element.click();
    }

    async type(locator, texto){

        const element = await this.waitVisible(locator);

        await element.clear();

        await element.sendKeys(texto);
    }

    async getText(locator){

        const element = await this.waitVisible(locator);

        return await element.getText();
    }

    async getCurrentUrl(){

        return await this.driver.getCurrentUrl();
    }

    async getTitle(){

        return await this.driver.getTitle();
    }

    async isDisplayed(locator){

        const element = await this.waitVisible(locator);

        return await element.isDisplayed();
    }

    async urlContains(texto){

        const url = await this.getCurrentUrl();

        return url.includes(texto);
    }

    async titleContains(texto){

        const title = await this.getTitle();

        return title.includes(texto);
    }
}

module.exports = BasePage;