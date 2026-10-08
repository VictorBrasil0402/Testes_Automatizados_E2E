import { faker } from '@faker-js/faker';

import HomePage from '../pages/HomePage.js';

import CadastroPage from '../pages/CadastroPage.js';

import UsuarioPJ from '../fixtures/UsuarioPJ.js';

describe('Realizar Cadastro de Pessoa Jurídica', () => {

    beforeEach(() => {

        HomePage.abrir();

        HomePage.abrirMenuMinhaConta();
       
        HomePage.acessarPaginaCadastro();
       
        CadastroPage.elements.titulo().should('contain', 'Cadastro de novo cliente');

    });

    it('Cadastro de usuário PJ com dados válidos', () => {
        
       const usuario = UsuarioPJ.pessoaJuridica();
        
       CadastroPage.pessoaJuridica.clicarOpcaoPJ();

       CadastroPage.pessoaJuridica.preencherFormulario(usuario);

       CadastroPage.pessoaJuridica.clicarCadastrar();

       cy.title().should('include', 'Seu cadastro foi efetuado com sucesso!');
    });

    it('Cadastro de usuário PJ com Razão Social inválida', () => {

        const usuario = UsuarioPJ.pessoaJuridica();

        usuario.razaoSocial = '648!* 792#$';
      
        CadastroPage.pessoaJuridica.clicarOpcaoPJ();

        CadastroPage.pessoaJuridica.preencherFormulario(usuario);

        CadastroPage.pessoaJuridica.clicarCadastrar();        

        CadastroPage.pessoaJuridica.elements.erroRazaoSocial().should('be.visible').and('have.text', 'Para cadastro de pessoa jurídica é necessário a Razão Social.');

        cy.title().should('include', 'Cadastro');
    });

    it('Cadastro de usuário PJ com Inscrição Estadual inválida', () => {

        const usuario = UsuarioPJ.pessoaJuridica();

        usuario.inscricaoEstadual = 'empresa42 exemplo926';
      
        CadastroPage.pessoaJuridica.clicarOpcaoPJ();

        CadastroPage.pessoaJuridica.preencherFormulario(usuario);

        CadastroPage.pessoaJuridica.clicarCadastrar();

        CadastroPage.pessoaJuridica.elements.erroInscricaoEstadual().should('be.visible').and('have.text', 'Para cadastro de pessoa jurídica, preencha o campo Inscrição Estadual.');

        cy.title().should('include', 'Cadastro');
    });

    it('Cadastro de usuário PJ com CNPJ inválido', () => {

        const usuario = UsuarioPJ.pessoaJuridica();

        usuario.cnpj = '42347624323432';
      
        CadastroPage.pessoaJuridica.clicarOpcaoPJ();

        CadastroPage.pessoaJuridica.preencherFormulario(usuario);

        CadastroPage.pessoaJuridica.clicarCadastrar();

        CadastroPage.pessoaJuridica.elements.erroCnpj().should('be.visible').and('contain', 'CNPJ inválido!');

        cy.title().should('include', 'Cadastro');
    });

    it('Cadastro de Usuário PJ com nome completo inválido', () => {

        const usuario = UsuarioPJ.pessoaJuridica();

        usuario.nomeCompleto = '873# 401%$';
      
        CadastroPage.pessoaJuridica.clicarOpcaoPJ();

        CadastroPage.pessoaJuridica.preencherFormulario(usuario);

        CadastroPage.pessoaJuridica.clicarCadastrar();

        CadastroPage.pessoaJuridica.elements.erroNomeCompleto().should('be.visible').and('have.text', 'Digite o seu nome completo, por favor.');

        cy.title().should('include', 'Cadastro');
    });

    it('Cadastro de usuário PJ com número de telefone celular inválido', () => {

        const usuario = UsuarioPJ.pessoaJuridica();

        usuario.celular = '14637285967';
      
        CadastroPage.pessoaJuridica.clicarOpcaoPJ();

        CadastroPage.pessoaJuridica.preencherFormulario(usuario);

        CadastroPage.pessoaJuridica.clicarCadastrar();

        CadastroPage.pessoaJuridica.elements.erroCelular().should('be.visible').and('contain', 'Telefone Celular');

        cy.title().should('include', 'Cadastro');
    });

    const emailFormatoInvalido = [

        `usuario${faker.string.alphanumeric(8)}@`,
        `usuario${faker.string.alphanumeric(8)}@email`,
        `@usuario${faker.string.alphanumeric(8)}`
    ];

    emailFormatoInvalido.forEach((email) => {

    it(`Cadastro de usuário PJ com formato de e-mail inválido: ${email}`, () => {

        const usuario = UsuarioPJ.pessoaJuridica();

        usuario.email = email;

        usuario.confirmacaoEmail = usuario.email;
      
        CadastroPage.pessoaJuridica.clicarOpcaoPJ();

        CadastroPage.pessoaJuridica.elements.email().invoke('removeAttr', 'type');

        CadastroPage.pessoaJuridica.elements.confirmacaoEmail().invoke('removeAttr', 'type');
        
        cy.window().then((win) => {
            
            cy.stub(win, 'alert').as('alertaSpy');
        });

        CadastroPage.pessoaJuridica.preencherFormulario(usuario);

        CadastroPage.pessoaJuridica.clicarCadastrar();

        cy.get('@alertaSpy').should('have.been.calledWithMatch', 'Por favor, digite o e-mail corretamente.');

        cy.title().should('include', 'Cadastro');
    });
    });

    it('Cadastro de usuário PJ com confirmação de e-mail diferente', () => {

        const usuario = UsuarioPJ.pessoaJuridica();

        usuario.confirmacaoEmail = 'user62396@yahoo.com';
      
        CadastroPage.pessoaJuridica.clicarOpcaoPJ();

        CadastroPage.pessoaJuridica.preencherFormulario(usuario);

        CadastroPage.pessoaJuridica.clicarCadastrar();

        CadastroPage.pessoaJuridica.elements.erroConfirmacaoEmail().should('be.visible').and('contain', 'A confirmação de e-mail está diferente do e-mail digitado.');

        cy.title().should('include', 'Cadastro');
    });

    it('Cadastro de usuário PJ com senha inválida', () => {

        const usuario = UsuarioPJ.pessoaJuridica();

        usuario.senha = '33792357';
      
        CadastroPage.pessoaJuridica.clicarOpcaoPJ();

        CadastroPage.pessoaJuridica.preencherFormulario(usuario);

        CadastroPage.pessoaJuridica.clicarCadastrar();

        CadastroPage.pessoaJuridica.elements.erroSenha().should('be.visible').and('contain', 'Sua senha deve cumprir os seguintes requisitos:');

        cy.title().should('include', 'Cadastro');
    });

    it('Cadastro de usuário PJ com confirmação de senha diferente', () => {

        const usuario = UsuarioPJ.pessoaJuridica();

        usuario.confirmacaoSenha = '21792492s';
      
        CadastroPage.pessoaJuridica.clicarOpcaoPJ();

        CadastroPage.pessoaJuridica.preencherFormulario(usuario);

        CadastroPage.pessoaJuridica.clicarCadastrar();

        CadastroPage.pessoaJuridica.elements.erroConfirmacaoSenha().should('be.visible').and('contain', 'Sua senha está diferente da confirmação.');

        cy.title().should('include', 'Cadastro');
    });
});

