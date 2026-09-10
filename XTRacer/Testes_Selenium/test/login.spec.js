const {Builder} = require('selenium-webdriver');

const chrome = require('selenium-webdriver/chrome');

const assert = require('assert');

const BasePage = require('../pages/BasePage');

const HomePage = require('../pages/HomePage');

const LoginPage = require('../pages/LoginPage');

describe('Realizar Login', function(){

    this.timeout(20000);

    let driver;

    let basePage;

    let homePage;

    let loginPage;

    beforeEach(async function(){

        const options = new chrome.Options();
                
        if (process.env.CI) {
            options.addArguments('--headless=new');
            options.addArguments('--no-sandbox');
            options.addArguments('--disable-dev-shm-usage');
            options.addArguments('--disable-gpu');
            options.addArguments('--window-size=1920,1080');
        }

        driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

        if (!process.env.CI){
            await driver.manage().window().maximize();
        }

        await driver.manage().deleteAllCookies();

        basePage = new BasePage(driver);

        homePage = new HomePage(driver);

        loginPage = new LoginPage(driver);
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

        await homePage.abrir();

        await homePage.acessarPaginaLogin();

        await loginPage.abrirFormularioLogin();

        await loginPage.preencherEmail(usuario);

        await loginPage.clicarContinuar();

        await loginPage.preencherSenha(usuario);

        await loginPage.clicarEnviar();

        await basePage.waitUrlContains('my-account');
    });

    it('Login com e-mail inválido', async function(){

        const usuario = {

            email: 'user_64392@icloud.com'
        };

        await homePage.abrir();

        await homePage.acessarPaginaLogin();

        await loginPage.abrirFormularioLogin();

        await loginPage.preencherEmail(usuario);

        await loginPage.clicarContinuar();

        try{

            assert.strictEqual(await basePage.getText(loginPage.locators.erroIdentificador), 'Dados inválidos. Tente novamente.');
        }

        catch(error){

            await basePage.waitVisible(loginPage.locators.campoSenha);

            assert.fail('O campo de senha apareceu para e-mail inválido');
        }
    });

    it('Login com senha inválida', async function(){

        const usuario = {

            email: process.env.TEST_EMAIL,

            senha: '49725674e'
        };

        await homePage.abrir();

        await homePage.acessarPaginaLogin();

        await loginPage.abrirFormularioLogin();

        await loginPage.preencherEmail(usuario);

        await loginPage.clicarContinuar();

        await loginPage.preencherSenha(usuario);

        await loginPage.clicarEnviar();

        assert.strictEqual(await basePage.getText(loginPage.locators.erroAutenticacao), 'Autenticação incorreta.');
    });
});