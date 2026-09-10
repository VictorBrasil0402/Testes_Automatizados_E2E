const {Builder} = require('selenium-webdriver');

const chrome = require('selenium-webdriver/chrome');

const assert = require('assert');

const BasePage = require('../pages/BasePage');

const HomePage = require('../pages/HomePage');

const CadastroPage = require('../pages/CadastroPage');

const UsuarioPJ = require('../fixtures/UsuarioPJ');

describe('Realizar Cadastro de Pessoa Jurídica', function(){

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
    
    afterEach(async function(){

        if (driver) {

            await driver.quit();
        }
    });

    it('Cadastro de usuário PJ com dados válidos', async function(){

        const usuario = UsuarioPJ.pessoaJuridica();

        await homePage.abrir();

        await homePage.acessarPaginaCadastro();
        
        assert.ok((await basePage.getText(cadastroPage.locators.titulo)).includes('Cadastro de novo cliente'));

        await cadastroPage.pessoaJuridica.clicarOpcaoPJ();

        await cadastroPage.pessoaJuridica.preencherFormulario(usuario);

        await cadastroPage.pessoaJuridica.clicarCadastrar();

        await basePage.waitTitleContains('Seu cadastro foi efetuado com sucesso!');
    });

    it('Cadastro de usuário PJ com Razão Social inválida', async function(){

        const usuario = UsuarioPJ.pessoaJuridica();

        usuario.razaoSocial = '648!* 792#$';

        await homePage.abrir();

        await homePage.acessarPaginaCadastro();
        
        assert.ok((await basePage.getText(cadastroPage.locators.titulo)).includes('Cadastro de novo cliente'));

        await cadastroPage.pessoaJuridica.clicarOpcaoPJ();

        await cadastroPage.pessoaJuridica.preencherFormulario(usuario);

        await cadastroPage.pessoaJuridica.clicarCadastrar();
        
        try{

            assert.strictEqual(await basePage.getText(cadastroPage.pessoaJuridica.locators.erroRazaoSocial), 'Para cadastro de pessoa jurídica é necessário a Razão Social.');
        }

        catch(error){

            await basePage.waitTitleContains('Seu cadastro foi efetuado com sucesso!');

            assert.fail('O sistema permitiu o cadastro com Razão Social inválida');
        }
    });

    it('Cadastro de usuário PJ com Inscrição Estadual inválida', async function(){

        const usuario = UsuarioPJ.pessoaJuridica();

        usuario.inscricaoEstadual = 'empresa29 exemplo138';

        await homePage.abrir();

        await homePage.acessarPaginaCadastro();
        
        assert.ok((await basePage.getText(cadastroPage.locators.titulo)).includes('Cadastro de novo cliente'));

        await cadastroPage.pessoaJuridica.clicarOpcaoPJ();

        await cadastroPage.pessoaJuridica.preencherFormulario(usuario);

        await cadastroPage.pessoaJuridica.clicarCadastrar();

        try{

            assert.strictEqual(await basePage.getText(cadastroPage.pessoaJuridica.locators.erroInscricaoEstadual), 'Para cadastro de pessoa jurídica, preencha o campo Inscrição Estadual');
        }

        catch(error){

            await basePage.waitTitleContains('Seu cadastro foi efetuado com sucesso!');

            assert.fail('O sistema permitiu o cadastro com Inscrição Estadual apresentando formato inválido');
        }
    });

    it('Cadastro de usuário PJ com CNPJ inválido', async function(){

        const usuario = UsuarioPJ.pessoaJuridica();

        usuario.cnpj = '57634758354733';

        await homePage.abrir();

        await homePage.acessarPaginaCadastro();
        
        assert.ok((await basePage.getText(cadastroPage.locators.titulo)).includes('Cadastro de novo cliente'));

        await cadastroPage.pessoaJuridica.clicarOpcaoPJ();

        await cadastroPage.pessoaJuridica.preencherFormulario(usuario);

        await cadastroPage.pessoaJuridica.clicarCadastrar();

        assert.strictEqual(await basePage.getText(cadastroPage.pessoaJuridica.locators.erroCnpj), 'CNPJ inválido!');
    });

    it('Cadastro de usuário PJ com nome completo inválido', async function(){

        const usuario = UsuarioPJ.pessoaJuridica();

        usuario.nomeCompleto = '528# 264$%';

        await homePage.abrir();

        await homePage.acessarPaginaCadastro();
        
        assert.ok((await basePage.getText(cadastroPage.locators.titulo)).includes('Cadastro de novo cliente'));

        await cadastroPage.pessoaJuridica.clicarOpcaoPJ();

        await cadastroPage.pessoaJuridica.preencherFormulario(usuario);

        await cadastroPage.pessoaJuridica.clicarCadastrar();

        try{

            assert.strictEqual(await basePage.getText(cadastroPage.pessoaJuridica.locators.erroNomeCompleto), 'Digite o seu nome completo, por favor.');
        }

        catch(error){

            await basePage.waitTitleContains('Seu cadastro foi efetuado com sucesso!');

            assert.fail('O sistema permitiu o cadastro com caracteres inválidos no campo "Nome Completo"');
        }
    });

    it('Cadastro de usuário PJ com número de telefone celular inválido', async function(){

        const usuario = UsuarioPJ.pessoaJuridica();

        usuario.celular = '81545456786';

        await homePage.abrir();

        await homePage.acessarPaginaCadastro();
        
        assert.ok((await basePage.getText(cadastroPage.locators.titulo)).includes('Cadastro de novo cliente'));

        await cadastroPage.pessoaJuridica.clicarOpcaoPJ();

        await cadastroPage.pessoaJuridica.preencherFormulario(usuario);

        await cadastroPage.pessoaJuridica.clicarCadastrar();

        try{

            assert.ok((await basePage.getText(cadastroPage.pessoaJuridica.locators.erroCelular)).includes('Telefone Celular'));
        }

        catch(error){

            await basePage.waitTitleContains('Seu cadastro foi efetuado com sucesso!');

            assert.fail('O sistema permitiu o cadastro com número de telefone celular inválido');
        }
    });

    it('Cadastro de usuário PJ com e-mail inválido', async function(){

        const usuario = UsuarioPJ.pessoaJuridica();

        usuario.email = usuario.email.replace('@', '%@');

        usuario.confirmacaoEmail = usuario.email;

        await homePage.abrir();

        await homePage.acessarPaginaCadastro();
        
        assert.ok((await basePage.getText(cadastroPage.locators.titulo)).includes('Cadastro de novo cliente'));

        await cadastroPage.pessoaJuridica.clicarOpcaoPJ();

        await driver.executeScript("arguments[0].removeAttribute('type');",
        await driver.findElement(cadastroPage.pessoaJuridica.locators.email));

        await driver.executeScript("arguments[0].removeAttribute('type');",
        await driver.findElement(cadastroPage.pessoaJuridica.locators.confirmacaoEmail));

        await cadastroPage.pessoaJuridica.preencherFormulario(usuario);

        await cadastroPage.pessoaJuridica.clicarCadastrar();

        try{
        
            assert.ok((await basePage.getAlertText()).includes('Por favor, digite o e-mail corretamente.'));

            await basePage.acceptAlert();
        }

        catch(error){

            await basePage.waitTitleContains('Seu cadastro foi efetuado com sucesso!');

            assert.fail('O sistema permitiu o cadastro com endereço de e-mail apresentando formato inválido');
        }
    });

    it('Cadastro de usuário PJ com confirmação de e-mail diferente', async function(){

        const usuario = UsuarioPJ.pessoaJuridica();

        usuario.confirmacaoEmail = 'user52958@icloud.com';

        await homePage.abrir();

        await homePage.acessarPaginaCadastro();
        
        assert.ok((await basePage.getText(cadastroPage.locators.titulo)).includes('Cadastro de novo cliente'));

        await cadastroPage.pessoaJuridica.clicarOpcaoPJ();

        await cadastroPage.pessoaJuridica.preencherFormulario(usuario);

        await cadastroPage.pessoaJuridica.clicarCadastrar();

        assert.ok((await basePage.getText(cadastroPage.pessoaJuridica.locators.erroConfirmacaoEmail)).includes('A confirmação de e-mail está diferente do e-mail digitado.'));
    });

    it('Cadastro de usuário PJ com senha inválida', async function(){

        const usuario = UsuarioPJ.pessoaJuridica();

        usuario.senha = '69256298';

        await homePage.abrir();

        await homePage.acessarPaginaCadastro();
        
        assert.ok((await basePage.getText(cadastroPage.locators.titulo)).includes('Cadastro de novo cliente'));

        await cadastroPage.pessoaJuridica.clicarOpcaoPJ();

        await cadastroPage.pessoaJuridica.preencherFormulario(usuario);

        await cadastroPage.pessoaJuridica.clicarCadastrar();

        assert.ok((await basePage.getText(cadastroPage.pessoaJuridica.locators.erroSenha)).includes('Sua senha deve cumprir os seguintes requisitos:'));
    });

    it('Cadastro de usuário PJ com confirmação de senha diferente', async function(){

        const usuario = UsuarioPJ.pessoaJuridica();

        usuario.confirmacaoSenha = '47123832c';

        await homePage.abrir();

        await homePage.acessarPaginaCadastro();
        
        assert.ok((await basePage.getText(cadastroPage.locators.titulo)).includes('Cadastro de novo cliente'));

        await cadastroPage.pessoaJuridica.clicarOpcaoPJ();

        await cadastroPage.pessoaJuridica.preencherFormulario(usuario);

        await cadastroPage.pessoaJuridica.clicarCadastrar();

        assert.ok((await basePage.getText(cadastroPage.pessoaJuridica.locators.erroConfirmacaoSenha)).includes('Sua senha está diferente da confirmação.'));
    });
});

