import HomePage from "../pages/HomePage";

import CadastroPage from "../pages/CadastroPage";

import UsuarioPF from "../fixtures/UsuarioPF";

describe('Realizar Cadastro de Pessoa Física', () => {

  it('Cadastro de usuário PF com dados válidos', () => {

    const usuario = UsuarioPF.pessoaFisica();

    HomePage.abrir();

    HomePage.abrirMenuMinhaConta();

    HomePage.acessarPaginaCadastro();

    CadastroPage.elements.titulo().should('contain', 'Cadastro de novo cliente');

    CadastroPage.pessoaFisica.preencherFormulario(usuario);

    CadastroPage.pessoaFisica.clicarCadastrar();

    cy.title().should('include', 'Seu cadastro foi efetuado com sucesso!');
  });

  it('Cadastro de usuário PF com nome completo inválido', () => {

    const usuario = UsuarioPF.pessoaFisica();

    usuario.nomeCompleto = '721* 843$';

    HomePage.abrir();

    HomePage.abrirMenuMinhaConta();

    HomePage.acessarPaginaCadastro();

    CadastroPage.elements.titulo().should('contain', 'Cadastro de novo cliente');

    CadastroPage.pessoaFisica.preencherFormulario(usuario);

    CadastroPage.pessoaFisica.clicarCadastrar();

    CadastroPage.pessoaFisica.elements.erroNomeCompleto().should('be.visible').and('contain', 'Digite o seu nome completo, por favor.');
  });

  it('Cadastro de usuário PF com data de nascimento inválida', () => {

    const usuario = UsuarioPF.pessoaFisica();

    usuario.dataNascimento = '10131999';

    HomePage.abrir();

    HomePage.abrirMenuMinhaConta();

    HomePage.acessarPaginaCadastro();

    CadastroPage.elements.titulo().should('contain', 'Cadastro de novo cliente');

    CadastroPage.pessoaFisica.preencherFormulario(usuario);

    CadastroPage.pessoaFisica.clicarCadastrar();

    CadastroPage.pessoaFisica.elements.erroDataNascimento().should('be.visible').and('have.text', 'Data de nascimento inválida.');
  });

  it('Cadastro de usuário PF com CPF inválido', () => {

    const usuario = UsuarioPF.pessoaFisica();

    usuario.cpf = '64718490682';

    HomePage.abrir();

    HomePage.abrirMenuMinhaConta();

    HomePage.acessarPaginaCadastro();

    CadastroPage.elements.titulo().should('contain', 'Cadastro de novo cliente');

    CadastroPage.pessoaFisica.preencherFormulario(usuario);

    CadastroPage.pessoaFisica.clicarCadastrar();

    CadastroPage.pessoaFisica.elements.erroCpf().should('be.visible').and('contain', 'CPF inválido!');
  });

  it('Cadastro de usuário PF com número de telefone celular inválido', () => {

    const usuario = UsuarioPF.pessoaFisica();

    usuario.celular = '67445927348';

    HomePage.abrir();

    HomePage.abrirMenuMinhaConta();

    HomePage.acessarPaginaCadastro();

    CadastroPage.elements.titulo().should('contain', 'Cadastro de novo cliente');

    CadastroPage.pessoaFisica.preencherFormulario(usuario);

    CadastroPage.pessoaFisica.clicarCadastrar();

    CadastroPage.pessoaFisica.elements.erroCelular().should('be.visible').and('contain', 'Telefone Celular');
  });

  it('Cadastro de usuário PF com e-mail inválido', () => {

    const usuario = UsuarioPF.pessoaFisica();

    usuario.email = usuario.email.replace('@', '%@');

    usuario.confirmacaoEmail = usuario.email;

    HomePage.abrir();

    HomePage.abrirMenuMinhaConta();

    HomePage.acessarPaginaCadastro();

    CadastroPage.elements.titulo().should('contain', 'Cadastro de novo cliente');

    CadastroPage.pessoaFisica.elements.email().invoke('removeAttr', 'type');

    CadastroPage.pessoaFisica.elements.confirmacaoEmail().invoke('removeAttr', 'type');

    cy.window().then((win) => {

        cy.stub(win, 'alert').as('alertaSpy');
    });

    CadastroPage.pessoaFisica.preencherFormulario(usuario);

    CadastroPage.pessoaFisica.clicarCadastrar();

    cy.get('@alertaSpy').should('have.been.calledWith', 'Por favor, digite o e-mail corretamente.');
  });

  it('Cadastro de usuário PF com confirmação de e-mail diferente', () => {

    const usuario = UsuarioPF.pessoaFisica();

    usuario.confirmacaoEmail = 'usuario27124@gmail.com';

    HomePage.abrir();

    HomePage.abrirMenuMinhaConta();

    HomePage.acessarPaginaCadastro();

    CadastroPage.elements.titulo().should('contain', 'Cadastro de novo cliente');

    CadastroPage.pessoaFisica.preencherFormulario(usuario);

    CadastroPage.pessoaFisica.clicarCadastrar();

    CadastroPage.pessoaFisica.elements.erroConfirmacaoEmail().should('be.visible').and('contain', 'A confirmação de e-mail está diferente do e-mail digitado.');
  });

  it('Cadastro de usuário PF com senha inválida', () => {

    const usuario = UsuarioPF.pessoaFisica();

    usuario.senha = '57283946';

    HomePage.abrir();

    HomePage.abrirMenuMinhaConta();

    HomePage.acessarPaginaCadastro();

    CadastroPage.elements.titulo().should('contain', 'Cadastro de novo cliente');

    CadastroPage.pessoaFisica.preencherFormulario(usuario);

    CadastroPage.pessoaFisica.clicarCadastrar();

    CadastroPage.pessoaFisica.elements.erroSenha().should('be.visible').and('contain', 'Sua senha deve cumprir os seguintes requisitos:');
  });

  it('Cadastro de usuário PF com confirmação de senha diferente', () => {

    const usuario = UsuarioPF.pessoaFisica();

    usuario.confirmacaoSenha = '94762548c';

    HomePage.abrir();

    HomePage.abrirMenuMinhaConta();

    HomePage.acessarPaginaCadastro();

    CadastroPage.elements.titulo().should('contain', 'Cadastro de novo cliente');

    CadastroPage.pessoaFisica.preencherFormulario(usuario);

    CadastroPage.pessoaFisica.clicarCadastrar();

    CadastroPage.pessoaFisica.elements.erroConfirmacaoSenha().should('be.visible').and('contain', 'Sua senha está diferente da confirmação.');
  });
});