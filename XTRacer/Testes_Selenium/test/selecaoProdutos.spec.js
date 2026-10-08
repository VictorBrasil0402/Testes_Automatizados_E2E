import { Builder } from 'selenium-webdriver';

import chrome from 'selenium-webdriver/chrome.js';

import assert from 'assert';

import BasePage from '../pages/BasePage.js';

import HomePage from '../pages/HomePage.js';

import LoginPage from '../pages/LoginPage.js';

import PerfilPage from '../pages/PerfilPage.js';

import ProdutosPage from '../pages/ProdutosPage.js';

import ProdutoPage from '../pages/ProdutoPage.js';

import CheckoutPage from '../pages/CheckoutPage.js';

import CheckoutLoginPage from '../pages/CheckoutLoginPage.js';

import CheckoutResumoPage from '../pages/CheckoutResumoPage.js';

describe('Selecionar Produtos', function(){

    this.timeout(40000);

    let driver;

    let basePage;

    let homePage;

    let loginPage;

    let perfilPage;

    let produtosPage;

    let produtoPage;

    let checkoutPage;

    let checkoutLoginPage;

    let checkoutResumoPage;

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

        perfilPage = new PerfilPage(driver);

        produtosPage = new ProdutosPage(driver);

        produtoPage = new ProdutoPage(driver);

        checkoutPage = new CheckoutPage(driver);

        checkoutLoginPage = new CheckoutLoginPage(driver);

        checkoutResumoPage = new CheckoutResumoPage(driver);

        if (!process.env.CI){
            await driver.manage().window().maximize();
        }

        await driver.manage().deleteAllCookies();
    });

    afterEach(async function(){

        if (driver){

            await driver.quit();
        }
    });

    it('Seleção de produto com dados válidos', async function(){

        const usuario = {

            email: process.env.TEST_EMAIL,

            senha: process.env.TEST_PASSWORD,

            cep: process.env.TEST_CEP
        };

        await homePage.abrir();

        await homePage.acessarPaginaLogin();

        await loginPage.abrirFormularioLogin();

        await loginPage.preencherEmail(usuario);

        await loginPage.clicarContinuar();

        await loginPage.preencherSenha(usuario);

        await loginPage.clicarEnviar();

        await basePage.waitUrlContains('my-account');

        await perfilPage.voltarParaHome();

        await homePage.acessarPaginaProdutos();

        await produtosPage.selecionarFiltro('XT Office');

        await produtosPage.clicarFiltrar();

        await produtosPage.selecionarProduto();

        await produtoPage.clicarComprar();

        await produtoPage.clicarFinalizarCompra();

        await basePage.waitUrlContains('#identifique_se');

        await checkoutLoginPage.preencherEmail(usuario);

        await checkoutLoginPage.clicarContinuar();

        await checkoutResumoPage.clicarVoltar();

        await basePage.waitUrlContains('#carrinho');

        await checkoutPage.preencherCEP(usuario);

        await checkoutPage.clicarContinuar();

        await basePage.waitUrlContains('#principal');

        assert.strictEqual(await basePage.getText(checkoutResumoPage.locators.tituloResumo), 'Resumo do pedido');
    });

    it('Seleção de produto com CEP inválido', async function(){

        const usuario = {

            email: process.env.TEST_EMAIL,

            senha: process.env.TEST_PASSWORD,

            cep: '22222222'
        };

        await homePage.abrir();

        await homePage.acessarPaginaLogin();

        await loginPage.abrirFormularioLogin();

        await loginPage.preencherEmail(usuario);

        await loginPage.clicarContinuar();

        await loginPage.preencherSenha(usuario);

        await loginPage.clicarEnviar();

        await basePage.waitUrlContains('my-account');

        await perfilPage.voltarParaHome();

        await homePage.acessarPaginaProdutos();

        await produtosPage.selecionarProduto();

        await produtoPage.clicarComprar();

        await produtoPage.clicarFinalizarCompra();

        await basePage.waitUrlContains('#identifique_se');

        await checkoutLoginPage.preencherEmail(usuario);

        await checkoutLoginPage.clicarContinuar();

        await checkoutResumoPage.clicarVoltar();

        await basePage.waitUrlContains('#carrinho');

        await checkoutPage.preencherCEP(usuario);

        await checkoutPage.clicarContinuar();

        assert.ok((await basePage.getText(checkoutPage.locators.erroCep)).includes('Não foi possível carregar seu endereço'));

        assert.ok(await basePage.urlContains('#carrinho'));
    });

    it('Seleção de produto com estoque indisponível', async function(){

        await homePage.abrir();

        await homePage.acessarPaginaProdutos();

        await produtosPage.selecionarUltimaPagina();

        await produtosPage.selecionarProduto();

        assert.ok((await basePage.getText(produtoPage.locators.legendaProdutoIndisponivel)).includes('Não disponível'));
    });
});