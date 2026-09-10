const {Builder} = require('selenium-webdriver');

const chrome = require('selenium-webdriver/chrome');

const assert = require('assert');

const BasePage = require('../pages/BasePage');

const HomePage = require('../pages/HomePage');

const ProdutosPage = require('../pages/ProdutosPage');

const ProdutoPage = require('../pages/ProdutoPage');

const CarrinhoPage = require('../pages/CarrinhoPage');

const CheckoutPage = require('../pages/CheckoutPage');

const CheckoutResumoPage = require('../pages/CheckoutResumoPage');

const CheckoutCompletoPage = require('../pages/CheckoutCompletoPage');

const User = require('../fixtures/User');

describe('Realizar Compra de Produto', function(){

    this.timeout(20000);

    let driver;

    let basePage;

    let homePage;

    let produtosPage;

    let produtoPage;

    let carrinhoPage;

    let checkoutPage;

    let checkoutResumoPage;

    let checkoutCompletoPage;

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

        produtoPage = new ProdutoPage(driver);

        carrinhoPage = new CarrinhoPage(driver);

        checkoutPage = new CheckoutPage(driver);

        checkoutResumoPage = new CheckoutResumoPage(driver);

        checkoutCompletoPage = new CheckoutCompletoPage(driver);
    });

    afterEach(async function(){

        if(driver){

            await driver.quit();
        }
    });

    it('Compra de produto com dados válidos', async function(){

        const user = User.gerarUsuario();

        await homePage.abrir();

        await homePage.preencherUsuario(user);

        await homePage.preencherSenha(user);

        await homePage.clicarEnviar();

        await basePage.waitUrlContains('inventory');

        assert.strictEqual(await basePage.getText(produtosPage.locators.productsTitle), 'Products');

        await produtosPage.selecionarProduto();

        await produtoPage.adicionarProdutoCarrinho();

        assert.strictEqual(await basePage.getText(produtoPage.locators.cartBadge), '1');

        await produtoPage.acessarCarrinho();

        assert.strictEqual(await basePage.getText(carrinhoPage.locators.cartTitle), 'Your Cart');

        const quantityValue = await carrinhoPage.obterQuantidadeProduto();

        const priceValue = await carrinhoPage.obterPrecoProduto();

        await carrinhoPage.acessarCheckout();

        assert.strictEqual(await basePage.getText(checkoutPage.locators.checkoutTitle), 'Checkout: Your Information');

        await checkoutPage.preencherNome(user);

        await checkoutPage.preencherSobrenome(user);

        await checkoutPage.preencherCodigoPostal(user);

        await checkoutPage.clicarContinuar();

        assert.strictEqual(await basePage.getText(checkoutResumoPage.locators.checkoutOverviewTitle), 'Checkout: Overview');

        const subTotalValue = await checkoutResumoPage.obterSubtotal();

        const taxValue = await checkoutResumoPage.obterTaxa();

        const totalValue = await checkoutResumoPage.obterTotal();

        const expectedSubtotal = Number((quantityValue * priceValue).toFixed(2));

        const expectedTotal = Number((subTotalValue + taxValue).toFixed(2));

        assert.strictEqual(subTotalValue, expectedSubtotal);

        assert.strictEqual(totalValue, expectedTotal);

        await checkoutResumoPage.clicarFinalizarPedido();

        assert.strictEqual(await basePage.getText(checkoutCompletoPage.locators.checkoutCompleteTitle), 'Checkout: Complete!');

        assert.strictEqual(await basePage.getText(checkoutCompletoPage.locators.orderConfirmationTitle), 'Thank you for your order!');
    });
});