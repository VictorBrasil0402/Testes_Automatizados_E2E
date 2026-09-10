const {Builder} = require('selenium-webdriver');

const chrome = require('selenium-webdriver/chrome');

const assert = require('assert');

const BasePage = require('../pages/BasePage');

const HomePage = require('../pages/HomePage');

const LoginPage = require('../pages/LoginPage');

const PerfilPage = require('../pages/PerfilPage');

const ProdutosPage = require('../pages/ProdutosPage');

const ProdutoPage = require('../pages/ProdutoPage');

const CheckoutPage = require('../pages/CheckoutPage');

const CheckoutLoginPage = require('../pages/CheckoutLoginPage');

const CheckoutResumoPage = require('../pages/CheckoutResumoPage');

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

        perfilPage = new PerfilPage(driver);

        produtosPage = new ProdutosPage(driver);

        produtoPage = new ProdutoPage(driver);

        checkoutPage = new CheckoutPage(driver);

        checkoutLoginPage = new CheckoutLoginPage(driver);

        checkoutResumoPage = new CheckoutResumoPage(driver);
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

        await basePage.waitUrlContains('#carrinho');

        await checkoutPage.preencherCEP(usuario);

        await checkoutPage.clicarContinuar();

        await basePage.waitUrlContains('#identifique_se');

        await checkoutLoginPage.preencherEmail(usuario);

        await checkoutLoginPage.clicarContinuar();

        await basePage.waitUrlContains('#principal');

        assert.strictEqual(await basePage.getText(checkoutResumoPage.locators.tituloResumo), 'Resumo do pedido');
    });

    it ('Seleção de produto com CEP inválido', async function(){

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

        await basePage.waitUrlContains('#carrinho');

        await checkoutPage.preencherCEP(usuario);

        await checkoutPage.clicarContinuar();

        try{

            assert.ok((await basePage.getText(checkoutPage.locators.erroCep)).includes('Não foi possível carregar seu endereço'));

            await basePage.urlContains('#carrinho');
        }
        
        catch(error){

            await basePage.waitUrlContains('#identifique_se');

            await basePage.waitVisible(checkoutLoginPage.locators.campoIdentificador);

            assert.fail('O sistema permitiu o avanço do checkout sem CEP válido');
        }
    });

    it('Seleção de produto com estoque indisponível', async function(){

        await homePage.abrir();

        await homePage.acessarPaginaProdutos();

        await produtosPage.selecionarUltimaPagina();

        await produtosPage.selecionarProduto();

        assert.ok((await basePage.getText(produtoPage.locators.legendaProdutoIndisponivel)).includes('Não disponível'));
    });
});