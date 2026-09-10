const {Builder} = require('selenium-webdriver');

const chrome = require('selenium-webdriver/chrome');

const assert = require('assert');

const BasePage = require('../pages/BasePage');

const HomePage = require('../pages/HomePage');

const ReservaPage = require('../pages/ReservaPage');

const CompraPassagemPage = require('../pages/CompraPassagemPage');

const ConfirmacaoCompraPage = require('../pages/ConfirmacaoCompraPage');

const User = require('../fixtures/User');

describe('Realizar Compra de Passagens', function(){

    this.timeout(20000);

    let driver;

    let basePage;

    let homePage;

    let reservaPage;

    let compraPassagemPage;

    let confirmacaoCompraPage;

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

        reservaPage = new ReservaPage(driver);

        compraPassagemPage = new CompraPassagemPage(driver);

        confirmacaoCompraPage = new ConfirmacaoCompraPage(driver);
    });

    afterEach(async function(){
        
        if(driver){
            await driver.quit();
        }
    });

    it('Compra de passagem com dados válidos', async function(){

        const user = User.gerarUsuario();

        await homePage.abrir();
        
        await homePage.selecionarCidadeOrigem('Boston');
        
        await homePage.selecionarCidadeDestino('London');
        
        await homePage.clicarEncontrarVoos();
        
        await basePage.waitUrlContains('reserve');
        
        assert.ok(await basePage.isDisplayed(reservaPage.locators.flightsTable));
        
        await reservaPage.selecionarVoo();
        
        await basePage.waitUrlContains('purchase');
        
        await compraPassagemPage.preencherDadosPessoais(user);
        
        await compraPassagemPage.selecionarTipoCartao('amex');
        
        await compraPassagemPage.preencherDadosPagamento(user);
        
        await compraPassagemPage.clicarComprar();
        
        assert.strictEqual(await basePage.getText(confirmacaoCompraPage.locators.purchaseConfirmationTitle), 'Thank you for your purchase today!');
    });
});