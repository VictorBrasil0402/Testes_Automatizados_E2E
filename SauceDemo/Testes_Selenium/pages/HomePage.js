const {By} = require('selenium-webdriver');

const BasePage = require('./BasePage');

class HomePage extends BasePage{

    constructor(driver){

        super(driver);

        this.url = 'https://www.saucedemo.com';

        this.locators = {

            username: By.css('[data-test="username"]'),

            password: By.css('[data-test="password"]'),

            loginButton: By.css('[data-test="login-button"]'),

            loginErrorMessage: By.css('[data-test="error"]')
        };
    }

    async abrir(){

        await this.open(this.url);
    }

    async preencherUsuario(user){

        await this.type(this.locators.username, user.username);
    }

    async preencherSenha(user){

        await this.type(this.locators.password, user.password);
    }

    async clicarEnviar(){

        await this.click(this.locators.loginButton);
    }
}

module.exports = HomePage;