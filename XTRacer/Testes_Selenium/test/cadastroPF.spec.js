import {Builder} from 'selenium-webdriver';

import chrome from 'selenium-webdriver/chrome.js';

import assert from 'assert';

import { faker } from '@faker-js/faker';

import BasePage from '../pages/BasePage.js';

import HomePage from '../pages/HomePage.js';

import CadastroPage from '../pages/CadastroPage.js';

import UsuarioPF from '../fixtures/UsuarioPF.js';

describe('Realizar Cadastro de Pessoa Física', function(){

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

    afterEach(async function (){

        if (driver){
            
            await driver.quit(); 
        }
    });

    it('Cadastro de usuário PF com dados válidos', async function (){

        const usuario = UsuarioPF.pessoaFisica();

        await cadastroPage.pessoaFisica.preencherFormulario(usuario);

        await cadastroPage.pessoaFisica.clicarCadastrar();

        assert.ok(await basePage.titleContains('Seu cadastro foi efetuado com sucesso!'));
    });

    it('Cadastro de usuário PF com nome completo inválido', async function (){

        const usuario = UsuarioPF.pessoaFisica();

        usuario.nomeCompleto = '578# 451$';

        await cadastroPage.pessoaFisica.preencherFormulario(usuario);

        await cadastroPage.pessoaFisica.clicarCadastrar();

        assert.strictEqual(await basePage.getText(cadastroPage.pessoaFisica.locators.erroNomeCompleto), 'Digite o seu nome completo, por favor.');

        assert.ok(await basePage.titleContains('Cadastro'));
    });

    it('Cadastro de usuário PF com data de nascimento inválida', async function(){

        const usuario = UsuarioPF.pessoaFisica();

        usuario.dataNascimento = '13132000';

        await cadastroPage.pessoaFisica.preencherFormulario(usuario);

        await cadastroPage.pessoaFisica.clicarCadastrar();

        assert.strictEqual(await basePage.getText(cadastroPage.pessoaFisica.locators.erroDataNascimento), 'Data de nascimento inválida.');

        assert.ok(await basePage.titleContains('Cadastro'));
    });

    it('Cadastro de usuário PF com CPF inválido', async function(){

        const usuario = UsuarioPF.pessoaFisica();

        usuario.cpf = '38959462859';

        await cadastroPage.pessoaFisica.preencherFormulario(usuario);

        await cadastroPage.pessoaFisica.clicarCadastrar();

        assert.ok((await basePage.getText(cadastroPage.pessoaFisica.locators.erroCpf)).includes('CPF inválido!'));

        assert.ok(await basePage.titleContains('Cadastro'));
    });

    it('Cadastro de usuário PF com número de telefone celular inválido', async function (){

        const usuario = UsuarioPF.pessoaFisica();

        usuario.celular = '71252136821';

        await cadastroPage.pessoaFisica.preencherFormulario(usuario);

        await cadastroPage.pessoaFisica.clicarCadastrar();

        assert.ok((await basePage.getText(cadastroPage.pessoaFisica.locators.erroCelular)).includes('Telefone Celular'));

        assert.ok(await basePage.titleContains('Cadastro'));
    });

    const emailFormatoInvalido = [

        `usuario${faker.string.alphanumeric(8)}@`,
        `usuario${faker.string.alphanumeric(8)}@email`,
        `@usuario${faker.string.alphanumeric(8)}`
    ];

    emailFormatoInvalido.forEach((email) => {
    
    it(`Cadastro de usuário PF com formato de e-mail inválido: ${email}`, async function(){

        const usuario = UsuarioPF.pessoaFisica();

        usuario.email = email;

        usuario.confirmacaoEmail = usuario.email;

        await driver.executeScript("arguments[0].removeAttribute('type');",
        await driver.findElement(cadastroPage.pessoaFisica.locators.email));

        await driver.executeScript("arguments[0].removeAttribute('type');",
        await driver.findElement(cadastroPage.pessoaFisica.locators.confirmacaoEmail));

        await cadastroPage.pessoaFisica.preencherFormulario(usuario);

        await cadastroPage.pessoaFisica.clicarCadastrar();

        assert.ok((await basePage.getAlertText()).includes('Por favor, digite o e-mail corretamente.'));

        await basePage.acceptAlert();
        
        assert.ok(await basePage.titleContains('Cadastro'));
    });
    });

    it('Cadastro de usuário PF com confirmação de e-mail diferente', async function(){

        const usuario = UsuarioPF.pessoaFisica();

        usuario.confirmacaoEmail = 'usuario72376@gmail.com';

        await cadastroPage.pessoaFisica.preencherFormulario(usuario);

        await cadastroPage.pessoaFisica.clicarCadastrar();

        assert.ok((await basePage.getText(cadastroPage.pessoaFisica.locators.erroConfirmacaoEmail)).includes('A confirmação de e-mail está diferente do e-mail digitado.'));

        assert.ok(await basePage.titleContains('Cadastro'));
    });

    it('Cadastro de usuário PF com senha inválida', async function (){

        const usuario = UsuarioPF.pessoaFisica();

        usuario.senha = '12345678';

        usuario.confirmacaoSenha = usuario.senha;

        await cadastroPage.pessoaFisica.preencherFormulario(usuario);

        await cadastroPage.pessoaFisica.clicarCadastrar();

        assert.ok((await basePage.getText(cadastroPage.pessoaFisica.locators.erroSenha)).includes('Sua senha deve cumprir os seguintes requisitos:'));

        assert.ok(await basePage.titleContains('Cadastro'));
    });

    it('Cadastro de usuário PF com confirmação de senha diferente', async function(){

        const usuario = UsuarioPF.pessoaFisica();

        usuario.confirmacaoSenha = '72946582p';

        await cadastroPage.pessoaFisica.preencherFormulario(usuario);

        await cadastroPage.pessoaFisica.clicarCadastrar();

        assert.ok((await basePage.getText(cadastroPage.locators.erroConfirmacaoSenha)).includes('Sua senha está diferente da confirmação.'));

        assert.ok(await basePage.titleContains('Cadastro'));
    });
});
