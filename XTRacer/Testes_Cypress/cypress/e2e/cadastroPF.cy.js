import { faker } from '@faker-js/faker';

import HomePage from '../pages/HomePage.js';

import CadastroPage from '../pages/CadastroPage.js';

import UsuarioPF from '../fixtures/UsuarioPF.js';

describe('Realizar Cadastro de Pessoa Física', () => {

  beforeEach(() =>{

    HomePage.abrir();

    HomePage.abrirMenuMinhaConta();

    HomePage.acessarPaginaCadastro();

    CadastroPage.elements.titulo().should('contain', 'Cadastro de novo cliente');
  });

  it('Cadastro de usuário PF com dados válidos', () => {

    const usuario = UsuarioPF.pessoaFisica();

    CadastroPage.pessoaFisica.preencherFormulario(usuario);

    CadastroPage.pessoaFisica.clicarCadastrar();

    cy.title().should('include', 'Seu cadastro foi efetuado com sucesso!');
  });

  it('Cadastro de usuário PF com nome completo inválido', () => {

    const usuario = UsuarioPF.pessoaFisica();

    usuario.nomeCompleto = '721* 843$';

    CadastroPage.pessoaFisica.preencherFormulario(usuario);

    CadastroPage.pessoaFisica.clicarCadastrar();

    CadastroPage.pessoaFisica.elements.erroNomeCompleto().should('be.visible').and('contain', 'Digite o seu nome completo, por favor.');

    cy.title().should('include', 'Cadastro');
  });

  it('Cadastro de usuário PF com data de nascimento inválida', () => {

    const usuario = UsuarioPF.pessoaFisica();

    usuario.dataNascimento = '10131999';

    CadastroPage.pessoaFisica.preencherFormulario(usuario);

    CadastroPage.pessoaFisica.clicarCadastrar();

    CadastroPage.pessoaFisica.elements.erroDataNascimento().should('be.visible').and('have.text', 'Data de nascimento inválida.');

    cy.title().should('include', 'Cadastro');
  });

  it('Cadastro de usuário PF com CPF inválido', () => {

    const usuario = UsuarioPF.pessoaFisica();

    usuario.cpf = '64718490682';

    CadastroPage.pessoaFisica.preencherFormulario(usuario);

    CadastroPage.pessoaFisica.clicarCadastrar();

    CadastroPage.pessoaFisica.elements.erroCpf().should('be.visible').and('contain', 'CPF inválido!');

    cy.title().should('include', 'Cadastro');
  });

  it('Cadastro de usuário PF com número de telefone celular inválido', () => {

    const usuario = UsuarioPF.pessoaFisica();

    usuario.celular = '67445927348';

    CadastroPage.pessoaFisica.preencherFormulario(usuario);

    CadastroPage.pessoaFisica.clicarCadastrar();

    CadastroPage.pessoaFisica.elements.erroCelular().should('be.visible').and('contain', 'Telefone Celular');

    cy.title().should('include', 'Cadastro');
  });

  const emailFormatoInvalido = [

    `usuario${faker.string.alphanumeric(8)}@`,
    `usuario${faker.string.alphanumeric(8)}@email`,
    `@usuario${faker.string.alphanumeric(8)}`
  ];

  emailFormatoInvalido.forEach((email) => {

  it(`Cadastro de usuário PF com formato de e-mail inválido: ${email}`, () => {

    const usuario = UsuarioPF.pessoaFisica();

    usuario.email = email;

    usuario.confirmacaoEmail = usuario.email;

    CadastroPage.pessoaFisica.elements.email().invoke('removeAttr', 'type');

    CadastroPage.pessoaFisica.elements.confirmacaoEmail().invoke('removeAttr', 'type');

    cy.window().then((win) => {

        cy.stub(win, 'alert').as('alertaSpy');
    });

    CadastroPage.pessoaFisica.preencherFormulario(usuario);

    CadastroPage.pessoaFisica.clicarCadastrar();

    cy.get('@alertaSpy').should('have.been.calledWithMatch', 'Por favor, digite o e-mail corretamente.');

    cy.title().should('include', 'Cadastro');
  });
  });

  it('Cadastro de usuário PF com confirmação de e-mail diferente', () => {

    const usuario = UsuarioPF.pessoaFisica();

    usuario.confirmacaoEmail = 'usuario27124@gmail.com';

    CadastroPage.pessoaFisica.preencherFormulario(usuario);

    CadastroPage.pessoaFisica.clicarCadastrar();

    CadastroPage.pessoaFisica.elements.erroConfirmacaoEmail().should('be.visible').and('contain', 'A confirmação de e-mail está diferente do e-mail digitado.');

    cy.title().should('include', 'Cadastro');
  });

  it('Cadastro de usuário PF com senha inválida', () => {

    const usuario = UsuarioPF.pessoaFisica();

    usuario.senha = '57283946';

    usuario.confirmacaoSenha = usuario.senha;

    CadastroPage.pessoaFisica.preencherFormulario(usuario);

    CadastroPage.pessoaFisica.clicarCadastrar();

    CadastroPage.pessoaFisica.elements.erroSenha().should('be.visible').and('contain', 'Sua senha deve cumprir os seguintes requisitos:');

    cy.title().should('include', 'Cadastro');
  });

  it('Cadastro de usuário PF com confirmação de senha diferente', () => {

    const usuario = UsuarioPF.pessoaFisica();

    usuario.confirmacaoSenha = '94762548c';

    CadastroPage.pessoaFisica.preencherFormulario(usuario);

    CadastroPage.pessoaFisica.clicarCadastrar();

    CadastroPage.pessoaFisica.elements.erroConfirmacaoSenha().should('be.visible').and('contain', 'Sua senha está diferente da confirmação.');

    cy.title().should('include', 'Cadastro');
  });
});