const {Builder} = require('selenium-webdriver');

const chrome = require('selenium-webdriver/chrome');

const assert = require('assert');

const BasePage = require('../pages/BasePage');

const HomePage = require('../pages/HomePage');

const CadastroPage = require('../pages/CadastroPage');

const UsuarioPF = require('../fixtures/UsuarioPF');

describe('Realizar Cadastro de Pessoa Física', function(){

    this.timeout(30000);
    
    let driver;

    let basePage;

    let homePage;

    let cadastroPage;

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

        cadastroPage = new CadastroPage(driver);
    });

    afterEach(async function (){

        if (driver){
            
            await driver.quit(); 
        }
    });

    it('Cadastro de usuário PF com dados válidos', async function (){

        const usuario = UsuarioPF.pessoaFisica();

        await homePage.abrir();

        await homePage.acessarPaginaCadastro();

        assert.ok((await basePage.getText(cadastroPage.locators.titulo)).includes('Cadastro de novo cliente'));

        await cadastroPage.pessoaFisica.preencherFormulario(usuario);

        await cadastroPage.pessoaFisica.clicarCadastrar();

        await basePage.waitTitleContains('Seu cadastro foi efetuado com sucesso!');
    });

    it('Cadastro de usuário PF com nome completo inválido', async function (){

        const usuario = UsuarioPF.pessoaFisica();

        usuario.nomeCompleto = '578# 451$';

        await homePage.abrir();

        await homePage.acessarPaginaCadastro();

        assert.ok((await basePage.getText(cadastroPage.locators.titulo)).includes('Cadastro de novo cliente'));

        await cadastroPage.pessoaFisica.preencherFormulario(usuario);

        await cadastroPage.pessoaFisica.clicarCadastrar();

        try{

            assert.strictEqual(await basePage.getText(cadastroPage.pessoaFisica.locators.erroNomeCompleto), 'Digite o seu nome completo, por favor.');
        }

        catch(error){

            await basePage.waitTitleContains('Seu cadastro foi efetuado com sucesso!');

            assert.fail('O sistema permitiu o cadastro com caracteres inválidos no campo "Nome Completo"');
        }
    });

    it('Cadastro de usuário PF com data de nascimento inválida', async function(){

        const usuario = UsuarioPF.pessoaFisica();

        usuario.dataNascimento = '13132000';

        await homePage.abrir();

        await homePage.acessarPaginaCadastro();

        assert.ok((await basePage.getText(cadastroPage.locators.titulo)).includes('Cadastro de novo cliente'));

        await cadastroPage.pessoaFisica.preencherFormulario(usuario);

        await cadastroPage.pessoaFisica.clicarCadastrar();

        assert.strictEqual(await basePage.getText(cadastroPage.pessoaFisica.locators.erroDataNascimento), 'Data de nascimento inválida.');
    });

    it('Cadastro de usuário PF com CPF inválido', async function(){

        const usuario = UsuarioPF.pessoaFisica();

        usuario.cpf = '38959462859';

        await homePage.abrir();

        await homePage.acessarPaginaCadastro();

        assert.ok((await basePage.getText(cadastroPage.locators.titulo)).includes('Cadastro de novo cliente'));

        await cadastroPage.pessoaFisica.preencherFormulario(usuario);

        await cadastroPage.pessoaFisica.clicarCadastrar();

        assert.ok((await basePage.getText(cadastroPage.pessoaFisica.locators.erroCpf)).includes('CPF inválido!'));
    });

    it('Cadastro de usuário PF com número de telefone celular inválido', async function (){

        const usuario = UsuarioPF.pessoaFisica();

        usuario.celular = '71252136821';

        await homePage.abrir();

        await homePage.acessarPaginaCadastro();

        assert.ok((await basePage.getText(cadastroPage.locators.titulo)).includes('Cadastro de novo cliente'));

        await cadastroPage.pessoaFisica.preencherFormulario(usuario);

        await cadastroPage.pessoaFisica.clicarCadastrar();

        try{

            assert.ok((await basePage.getText(cadastroPage.pessoaFisica.locators.erroCelular)).includes('Telefone Celular'));
        }

        catch(error){

            await basePage.waitTitleContains('Seu cadastro foi efetuado com sucesso!');

            assert.fail('O sistema permitiu o cadastro com número de telefone celular inválido');
        }
    });

    it('Cadastro de usuário PF com e-mail inválido', async function(){

        const usuario = UsuarioPF.pessoaFisica();

        usuario.email = usuario.email.replace('@', '%@');

        usuario.confirmacaoEmail = usuario.email;

        await homePage.abrir();

        await homePage.acessarPaginaCadastro();

        assert.ok((await basePage.getText(cadastroPage.locators.titulo)).includes('Cadastro de novo cliente'));

        await driver.executeScript("arguments[0].removeAttribute('type');",
        await driver.findElement(cadastroPage.pessoaFisica.locators.email));

        await driver.executeScript("arguments[0].removeAttribute('type');",
        await driver.findElement(cadastroPage.pessoaFisica.locators.confirmacaoEmail));

        await cadastroPage.pessoaFisica.preencherFormulario(usuario);

        await cadastroPage.pessoaFisica.clicarCadastrar();

        try{

            assert.ok((await basePage.getAlertText()).includes('Por favor, digite o e-mail corretamente.'));

            await basePage.acceptAlert();
        }

        catch(error){

            await basePage.waitTitleContains('Seu cadastro foi efetuado com sucesso!');

            assert.fail('O sistema permitiu o cadastro com endereço de e-mail apresentando formato inválido');
        }
    });

    it('Cadastro de usuário PF com confirmação de e-mail diferente', async function(){

        const usuario = UsuarioPF.pessoaFisica();

        usuario.confirmacaoEmail = 'usuario72376@gmail.com';

        await homePage.abrir();

        await homePage.acessarPaginaCadastro();

        assert.ok((await basePage.getText(cadastroPage.locators.titulo)).includes('Cadastro de novo cliente'));

        await cadastroPage.pessoaFisica.preencherFormulario(usuario);

        await cadastroPage.pessoaFisica.clicarCadastrar();

        assert.ok((await basePage.getText(cadastroPage.pessoaFisica.locators.erroConfirmacaoEmail)).includes('A confirmação de e-mail está diferente do e-mail digitado.'));
    });

    it('Cadastro de usuário PF com senha inválida', async function (){

        const usuario = UsuarioPF.pessoaFisica();

        usuario.senha = '12345678';

        await homePage.abrir();

        await homePage.acessarPaginaCadastro();

        assert.ok((await basePage.getText(cadastroPage.locators.titulo)).includes('Cadastro de novo cliente'));

        await cadastroPage.pessoaFisica.preencherFormulario(usuario);

        await cadastroPage.pessoaFisica.clicarCadastrar();

        assert.ok((await basePage.getText(cadastroPage.pessoaFisica.locators.erroSenha)).includes('Sua senha deve cumprir os seguintes requisitos:'));
    });

    it('Cadastro de usuário PF com confirmação de senha diferente', async function(){

        const usuario = UsuarioPF.pessoaFisica();

        usuario.confirmacaoSenha = '72946582p';

        await homePage.abrir();

        await homePage.acessarPaginaCadastro();

        assert.ok((await basePage.getText(cadastroPage.locators.titulo)).includes('Cadastro de novo cliente'));

        await cadastroPage.pessoaFisica.preencherFormulario(usuario);

        await cadastroPage.pessoaFisica.clicarCadastrar();

        assert.ok((await basePage.getText(cadastroPage.locators.erroConfirmacaoSenha)).includes('Sua senha está diferente da confirmação.'));
    });
});
