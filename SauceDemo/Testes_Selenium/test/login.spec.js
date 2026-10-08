import { Builder } from 'selenium-webdriver';

import chrome from 'selenium-webdriver/chrome.js';

import assert from 'assert';

import BasePage from '../pages/BasePage.js';

import HomePage from '../pages/HomePage.js';

import ProdutosPage from '../pages/ProdutosPage.js';

import User from '../fixtures/User.js';

describe('Realizar Login', function(){

    this.timeout(10000);

    let driver;

    let basePage;

    let homePage;

    let produtosPage;

    beforeEach(async function(){
        
        const options = new chrome.Options();
                
        if (process.env.CI) {
            options.addArguments(
            '--headless=new',
            '--window-size=1920,1080',
            '--no-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
            );
        }
        
        driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
        
        basePage = new BasePage(driver);

        homePage = new HomePage(driver);

        produtosPage = new ProdutosPage(driver);

        if (!process.env.CI){
            await driver.manage().window().maximize();
        }
    });

    afterEach(async function(){

        if(driver){

            await driver.quit();
        }
    });

    it('Login com dados válidos', async function(){

        const user = User.gerarUsuario();

        await homePage.abrir();

        await homePage.preencherUsuario(user);

        await homePage.preencherSenha(user);

        await homePage.clicarEnviar();

        await basePage.waitUrlContains('inventory');

        assert.strictEqual(await basePage.getText(produtosPage.locators.productsTitle), 'Products');
    });

    it('Login com usuário inválido', async function(){

        const user = User.gerarUsuario();

        user.username = 'user';

        await homePage.abrir();

        await homePage.preencherUsuario(user);

        await homePage.preencherSenha(user);

        await homePage.clicarEnviar();

        assert.ok((await basePage.getText(homePage.locators.loginError)).includes('Username and password do not match'));

        assert.ok(await basePage.isDisplayed(homePage.locators.loginButton));
    });

    it('Login com senha inválida', async function(){

        const user = User.gerarUsuario();

        user.password = 'sauce';

        await homePage.abrir();

        await homePage.preencherUsuario(user);

        await homePage.preencherSenha(user);

        await homePage.clicarEnviar();

        assert.ok((await basePage.getText(homePage.locators.loginError)).includes('Username and password do not match'));

        assert.ok(await basePage.isDisplayed(homePage.locators.loginButton));
    });

    it('Login com usuário não informado', async function(){

        const user = User.gerarUsuario();

        await homePage.abrir();

        await homePage.preencherSenha(user);

        await homePage.clicarEnviar();

        assert.ok((await basePage.getText(homePage.locators.userRequired)).includes('Username is required'));

        assert.ok(await basePage.isDisplayed(homePage.locators.loginButton));
    });

    it('Login com senha não informada', async function(){

        const user = User.gerarUsuario();

        await homePage.abrir();

        await homePage.preencherUsuario(user);

        await homePage.clicarEnviar();

        assert.ok((await basePage.getText(homePage.locators.passwordRequired)).includes('Password is required'));

        assert.ok(await basePage.isDisplayed(homePage.locators.loginButton));
    });
});