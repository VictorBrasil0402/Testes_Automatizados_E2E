const {Builder} = require('selenium-webdriver');

const chrome = require('selenium-webdriver/chrome');

const assert = require('assert');

const BasePage = require('../pages/BasePage');

const HomePage = require('../pages/HomePage');

const ProdutosPage = require('../pages/ProdutosPage');

const User = require('../fixtures/User');

describe('Realizar Login', function(){

    this.timeout(10000);

    let driver;

    let basePage;

    let homePage;

    let produtosPage;

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
        
        basePage = new BasePage(driver);

        homePage = new HomePage(driver);

        produtosPage = new ProdutosPage(driver);
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

        assert.ok((await basePage.getText(homePage.locators.loginErrorMessage)).includes('Username and password do not match'));
    });

    it('Login com senha inválida', async function(){

        const user = User.gerarUsuario();

        user.password = 'sauce';

        await homePage.abrir();

        await homePage.preencherUsuario(user);

        await homePage.preencherSenha(user);

        await homePage.clicarEnviar();

        assert.ok((await basePage.getText(homePage.locators.loginErrorMessage)).includes('Username and password do not match'));
    });
});