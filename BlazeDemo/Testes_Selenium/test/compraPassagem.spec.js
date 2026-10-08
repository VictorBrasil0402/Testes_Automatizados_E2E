import { Builder } from 'selenium-webdriver';

import chrome from 'selenium-webdriver/chrome.js';

import assert from 'assert';

import BasePage from '../pages/BasePage.js';

import HomePage from '../pages/HomePage.js';

import ReservaPage from '../pages/ReservaPage.js';

import CompraPassagemPage from '../pages/CompraPassagemPage.js';

import ConfirmacaoCompraPage from '../pages/ConfirmacaoCompraPage.js';

import User from '../fixtures/User.js';

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

        reservaPage = new ReservaPage(driver);

        compraPassagemPage = new CompraPassagemPage(driver);

        confirmacaoCompraPage = new ConfirmacaoCompraPage(driver);

        if (!process.env.CI){
            await driver.manage().window().maximize();
        }
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