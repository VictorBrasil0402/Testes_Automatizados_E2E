import {Builder} from 'selenium-webdriver';

import chrome from 'selenium-webdriver/chrome.js';

import assert from 'assert';

import BasePage from '../pages/BasePage.js';

import HomePage from '../pages/HomePage.js';

import LoginPage from '../pages/LoginPage.js';

describe('Realizar Login', function(){

    this.timeout(20000);

    let driver;

    let basePage;

    let homePage;

    let loginPage;

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

        loginPage = new LoginPage(driver);

        if (!process.env.CI){
            await driver.manage().window().maximize();
        }

        await homePage.abrir();

        await driver.manage().deleteAllCookies();

        await homePage.acessarPaginaLogin();

        assert.ok(await basePage.urlContains('login'));
    });

    afterEach(async function(){

        if (driver){

            await driver.quit();
        }
    });

    it('Login com dados válidos', async function(){

        const usuario = {

            email: process.env.TEST_EMAIL,

            senha: process.env.TEST_PASSWORD
        };

        await loginPage.abrirFormularioLogin();

        await loginPage.preencherEmail(usuario);

        await loginPage.clicarContinuar();

        await loginPage.preencherSenha(usuario);

        await loginPage.clicarEnviar();

        assert.ok(await basePage.urlContains('my-account'));
    });

    it('Login com e-mail inválido', async function(){

        const usuario = {

            email: 'user_64392@icloud.com'
        };

        await loginPage.abrirFormularioLogin();

        await loginPage.preencherEmail(usuario);

        await loginPage.clicarContinuar();

        assert.strictEqual(await basePage.getText(loginPage.locators.erroIdentificador), 'Dados inválidos. Tente novamente.');

        assert.ok(await basePage.elementNotExist(loginPage.locators.campoSenha));
    });

    it('Login com senha inválida', async function(){

        const usuario = {

            email: process.env.TEST_EMAIL,

            senha: '49725674e'
        };

        await loginPage.abrirFormularioLogin();

        await loginPage.preencherEmail(usuario);

        await loginPage.clicarContinuar();

        await loginPage.preencherSenha(usuario);

        await loginPage.clicarEnviar();

        assert.strictEqual(await basePage.getText(loginPage.locators.erroAutenticacao), 'Autenticação incorreta.');

        assert.ok(await basePage.urlContains('login'));
    });
});