import {Builder} from 'selenium-webdriver';

import chrome from 'selenium-webdriver/chrome.js';

import assert from 'assert';

import { faker } from '@faker-js/faker';

import BasePage from '../pages/BasePage.js';

import HomePage from '../pages/HomePage.js';

import CadastroPage from '../pages/CadastroPage.js';

import UsuarioPJ from '../fixtures/UsuarioPJ.js';

describe('Realizar Cadastro de Pessoa Jurídica', function(){

    this.timeout(30000);

    let driver;

    let basePage;

    let homePage;

    let cadastroPage;

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

        cadastroPage = new CadastroPage(driver);

        if (!process.env.CI){
            await driver.manage().window().maximize();
        }

        await homePage.abrir();

        await driver.manage().deleteAllCookies();

        await homePage.acessarPaginaCadastro();
        
        assert.ok((await basePage.getText(cadastroPage.locators.titulo)).includes('Cadastro de novo cliente'));
    });
    
    afterEach(async function(){

        if (driver) {

            await driver.quit();
        }
    });

    it('Cadastro de usuário PJ com dados válidos', async function(){

        const usuario = UsuarioPJ.pessoaJuridica();

        await cadastroPage.pessoaJuridica.clicarOpcaoPJ();

        await cadastroPage.pessoaJuridica.preencherFormulario(usuario);

        await cadastroPage.pessoaJuridica.clicarCadastrar();

        assert.ok(await basePage.titleContains('Seu cadastro foi efetuado com sucesso!'));
    });

    it('Cadastro de usuário PJ com Razão Social inválida', async function(){

        const usuario = UsuarioPJ.pessoaJuridica();

        usuario.razaoSocial = '648!* 792#$';

        await cadastroPage.pessoaJuridica.clicarOpcaoPJ();

        await cadastroPage.pessoaJuridica.preencherFormulario(usuario);

        await cadastroPage.pessoaJuridica.clicarCadastrar();
        
        assert.strictEqual(await basePage.getText(cadastroPage.pessoaJuridica.locators.erroRazaoSocial), 'Para cadastro de pessoa jurídica é necessário a Razão Social.');
        
        assert.ok(await basePage.titleContains('Cadastro'));
    });

    it('Cadastro de usuário PJ com Inscrição Estadual inválida', async function(){

        const usuario = UsuarioPJ.pessoaJuridica();

        usuario.inscricaoEstadual = 'empresa29 exemplo138';

        await cadastroPage.pessoaJuridica.clicarOpcaoPJ();

        await cadastroPage.pessoaJuridica.preencherFormulario(usuario);

        await cadastroPage.pessoaJuridica.clicarCadastrar();

        assert.strictEqual(await basePage.getText(cadastroPage.pessoaJuridica.locators.erroInscricaoEstadual), 'Para cadastro de pessoa jurídica, preencha o campo Inscrição Estadual');
        
        assert.ok(await basePage.titleContains('Cadastro'));
    });

    it('Cadastro de usuário PJ com CNPJ inválido', async function(){

        const usuario = UsuarioPJ.pessoaJuridica();

        usuario.cnpj = '57634758354733';

        await cadastroPage.pessoaJuridica.clicarOpcaoPJ();

        await cadastroPage.pessoaJuridica.preencherFormulario(usuario);

        await cadastroPage.pessoaJuridica.clicarCadastrar();

        assert.strictEqual(await basePage.getText(cadastroPage.pessoaJuridica.locators.erroCnpj), 'CNPJ inválido!');

        assert.ok(await basePage.titleContains('Cadastro'));
    });

    it('Cadastro de usuário PJ com nome completo inválido', async function(){

        const usuario = UsuarioPJ.pessoaJuridica();

        usuario.nomeCompleto = '528# 264$%';

        await cadastroPage.pessoaJuridica.clicarOpcaoPJ();

        await cadastroPage.pessoaJuridica.preencherFormulario(usuario);

        await cadastroPage.pessoaJuridica.clicarCadastrar();

        assert.strictEqual(await basePage.getText(cadastroPage.pessoaJuridica.locators.erroNomeCompleto), 'Digite o seu nome completo, por favor.');

        assert.ok(await basePage.titleContains('Cadastro'));
    });

    it('Cadastro de usuário PJ com número de telefone celular inválido', async function(){

        const usuario = UsuarioPJ.pessoaJuridica();

        usuario.celular = '81545456786';

        await cadastroPage.pessoaJuridica.clicarOpcaoPJ();

        await cadastroPage.pessoaJuridica.preencherFormulario(usuario);

        await cadastroPage.pessoaJuridica.clicarCadastrar();

        assert.ok((await basePage.getText(cadastroPage.pessoaJuridica.locators.erroCelular)).includes('Telefone Celular'));

        assert.ok(await basePage.titleContains('Cadastro'));
    });

    const emailFormatoInvalido = [

        `usuario${faker.string.alphanumeric(8)}@`,
        `usuario${faker.string.alphanumeric(8)}@email`,
        `@usuario${faker.string.alphanumeric(8)}`
    ];

    emailFormatoInvalido.forEach((email) => {

    it(`Cadastro de usuário PJ com formato de e-mail inválido: ${email}`, async function(){

        const usuario = UsuarioPJ.pessoaJuridica();

        usuario.email = email;

        usuario.confirmacaoEmail = usuario.email;

        await cadastroPage.pessoaJuridica.clicarOpcaoPJ();

        await driver.executeScript("arguments[0].removeAttribute('type');",
        await driver.findElement(cadastroPage.pessoaJuridica.locators.email));

        await driver.executeScript("arguments[0].removeAttribute('type');",
        await driver.findElement(cadastroPage.pessoaJuridica.locators.confirmacaoEmail));

        await cadastroPage.pessoaJuridica.preencherFormulario(usuario);

        await cadastroPage.pessoaJuridica.clicarCadastrar();

        assert.ok((await basePage.getAlertText()).includes('Por favor, digite o e-mail corretamente.'));

        await basePage.acceptAlert();

        assert.ok(await basePage.titleContains('Cadastro'));
    });
    });

    it('Cadastro de usuário PJ com confirmação de e-mail diferente', async function(){

        const usuario = UsuarioPJ.pessoaJuridica();

        usuario.confirmacaoEmail = 'user52958@icloud.com';

        await cadastroPage.pessoaJuridica.clicarOpcaoPJ();

        await cadastroPage.pessoaJuridica.preencherFormulario(usuario);

        await cadastroPage.pessoaJuridica.clicarCadastrar();

        assert.ok((await basePage.getText(cadastroPage.pessoaJuridica.locators.erroConfirmacaoEmail)).includes('A confirmação de e-mail está diferente do e-mail digitado.'));

        assert.ok(await basePage.titleContains('Cadastro'));
    });

    it('Cadastro de usuário PJ com senha inválida', async function(){

        const usuario = UsuarioPJ.pessoaJuridica();

        usuario.senha = '69256298';

        usuario.confirmacaoSenha = usuario.senha;

        await cadastroPage.pessoaJuridica.clicarOpcaoPJ();

        await cadastroPage.pessoaJuridica.preencherFormulario(usuario);

        await cadastroPage.pessoaJuridica.clicarCadastrar();

        assert.ok((await basePage.getText(cadastroPage.pessoaJuridica.locators.erroSenha)).includes('Sua senha deve cumprir os seguintes requisitos:'));

        assert.ok(await basePage.titleContains('Cadastro'));
    });

    it('Cadastro de usuário PJ com confirmação de senha diferente', async function(){

        const usuario = UsuarioPJ.pessoaJuridica();

        usuario.confirmacaoSenha = '47123832c';

        await cadastroPage.pessoaJuridica.clicarOpcaoPJ();

        await cadastroPage.pessoaJuridica.preencherFormulario(usuario);

        await cadastroPage.pessoaJuridica.clicarCadastrar();

        assert.ok((await basePage.getText(cadastroPage.pessoaJuridica.locators.erroConfirmacaoSenha)).includes('Sua senha está diferente da confirmação.'));

        assert.ok(await basePage.titleContains('Cadastro'));
    });
});

