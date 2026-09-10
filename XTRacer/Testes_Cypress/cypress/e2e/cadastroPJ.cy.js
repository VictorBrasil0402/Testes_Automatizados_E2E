import HomePage from "../pages/HomePage";

import CadastroPage from "../pages/CadastroPage";

import UsuarioPJ from "../fixtures/UsuarioPJ";

describe('Realizar Cadastro de Pessoa Jurídica', () => {

    it('Cadastro de usuário PJ com dados válidos', () => {
        
       const usuario = UsuarioPJ.pessoaJuridica();
       
       HomePage.abrir();

       HomePage.abrirMenuMinhaConta();
       
       HomePage.acessarPaginaCadastro();
       
       CadastroPage.elements.titulo().should('contain', 'Cadastro de novo cliente');
      
       CadastroPage.pessoaJuridica.clicarOpcaoPJ();

       CadastroPage.pessoaJuridica.preencherFormulario(usuario);

       CadastroPage.pessoaJuridica.clicarCadastrar();

       cy.title().should('include', 'Seu cadastro foi efetuado com sucesso!');
    });

    it('Cadastro de usuário PJ com Razão Social inválida', () => {

        const usuario = UsuarioPJ.pessoaJuridica();

        usuario.razaoSocial = '648!* 792#$';

        HomePage.abrir();

        HomePage.abrirMenuMinhaConta();
       
        HomePage.acessarPaginaCadastro();
       
        CadastroPage.elements.titulo().should('contain', 'Cadastro de novo cliente');
      
        CadastroPage.pessoaJuridica.clicarOpcaoPJ();

        CadastroPage.pessoaJuridica.preencherFormulario(usuario);

        CadastroPage.pessoaJuridica.clicarCadastrar();        

        CadastroPage.pessoaJuridica.elements.erroRazaoSocial().should('be.visible').and('have.text', 'Para cadastro de pessoa jurídica é necessário a Razão Social.');
    });

    it('Cadastro de usuário PJ com Inscrição Estadual inválida', () => {

        const usuario = UsuarioPJ.pessoaJuridica();

        usuario.inscricaoEstadual = 'empresa42 exemplo926';

        HomePage.abrir();

        HomePage.abrirMenuMinhaConta();
       
        HomePage.acessarPaginaCadastro();
       
        CadastroPage.elements.titulo().should('contain', 'Cadastro de novo cliente');
      
        CadastroPage.pessoaJuridica.clicarOpcaoPJ();

        CadastroPage.pessoaJuridica.preencherFormulario(usuario);

        CadastroPage.pessoaJuridica.clicarCadastrar();

        CadastroPage.pessoaJuridica.elements.erroInscricaoEstadual().should('be.visible').and('have.text', 'Para cadastro de pessoa jurídica, preencha o campo Inscrição Estadual.');
    });

    it('Cadastro de usuário PJ com CNPJ inválido', () => {

        const usuario = UsuarioPJ.pessoaJuridica();

        usuario.cnpj = '42347624323432';

        HomePage.abrir();

        HomePage.abrirMenuMinhaConta();
       
        HomePage.acessarPaginaCadastro();
       
        CadastroPage.elements.titulo().should('contain', 'Cadastro de novo cliente');
      
        CadastroPage.pessoaJuridica.clicarOpcaoPJ();

        CadastroPage.pessoaJuridica.preencherFormulario(usuario);

        CadastroPage.pessoaJuridica.clicarCadastrar();

        CadastroPage.pessoaJuridica.elements.erroCnpj().should('be.visible').and('contain', 'CNPJ inválido!');
    });

    it('Cadastro de Usuário PJ com nome completo inválido', () => {

        const usuario = UsuarioPJ.pessoaJuridica();

        usuario.nomeCompleto = '873# 401%$';

        HomePage.abrir();

        HomePage.abrirMenuMinhaConta();
       
        HomePage.acessarPaginaCadastro();
       
        CadastroPage.elements.titulo().should('contain', 'Cadastro de novo cliente');
      
        CadastroPage.pessoaJuridica.clicarOpcaoPJ();

        CadastroPage.pessoaJuridica.preencherFormulario(usuario);

        CadastroPage.pessoaJuridica.clicarCadastrar();

        CadastroPage.pessoaJuridica.elements.erroNomeCompleto().should('be.visible').and('have.text', 'Digite o seu nome completo, por favor.');
    });

    it('Cadastro de usuário PJ com número de telefone celular inválido', () => {

        const usuario = UsuarioPJ.pessoaJuridica();

        usuario.celular = '14637285967';

        HomePage.abrir();

        HomePage.abrirMenuMinhaConta();
       
        HomePage.acessarPaginaCadastro();
       
        CadastroPage.elements.titulo().should('contain', 'Cadastro de novo cliente');
      
        CadastroPage.pessoaJuridica.clicarOpcaoPJ();

        CadastroPage.pessoaJuridica.preencherFormulario(usuario);

        CadastroPage.pessoaJuridica.clicarCadastrar();

        CadastroPage.pessoaJuridica.elements.erroCelular().should('be.visible').and('contain', 'Telefone Celular');
    });

    it('Cadastro de usuário PJ com e-mail inválido', () => {

        const usuario = UsuarioPJ.pessoaJuridica();

        usuario.email = usuario.email.replace('@', '%@');

        usuario.confirmacaoEmail = usuario.email;

        HomePage.abrir();

        HomePage.abrirMenuMinhaConta();
       
        HomePage.acessarPaginaCadastro();
       
        CadastroPage.elements.titulo().should('contain', 'Cadastro de novo cliente');
      
        CadastroPage.pessoaJuridica.clicarOpcaoPJ();

        CadastroPage.pessoaJuridica.elements.email().invoke('removeAttr', 'type');

        CadastroPage.pessoaJuridica.elements.confirmacaoEmail().invoke('removeAttr', 'type');
        
        cy.window().then((win) => {
            
            cy.stub(win, 'alert').as('alertaSpy');
        });

        CadastroPage.pessoaJuridica.preencherFormulario(usuario);

        CadastroPage.pessoaJuridica.clicarCadastrar();

        cy.get('@alertaSpy').should('have.been.calledWith', 'Por favor, digite o e-mail corretamente.');
    });

    it('Cadastro de usuário PJ com confirmação de e-mail diferente', () => {

        const usuario = UsuarioPJ.pessoaJuridica();

        usuario.confirmacaoEmail = 'user62396@yahoo.com';

        HomePage.abrir();

        HomePage.abrirMenuMinhaConta();
       
        HomePage.acessarPaginaCadastro();
       
        CadastroPage.elements.titulo().should('contain', 'Cadastro de novo cliente');
      
        CadastroPage.pessoaJuridica.clicarOpcaoPJ();

        CadastroPage.pessoaJuridica.preencherFormulario(usuario);

        CadastroPage.pessoaJuridica.clicarCadastrar();

        CadastroPage.pessoaJuridica.elements.erroConfirmacaoEmail().should('be.visible').and('contain', 'A confirmação de e-mail está diferente do e-mail digitado.');
    });

    it('Cadastro de usuário PJ com senha inválida', () => {

        const usuario = UsuarioPJ.pessoaJuridica();

        usuario.senha = '33792357';

        HomePage.abrir();

        HomePage.abrirMenuMinhaConta();
       
        HomePage.acessarPaginaCadastro();
       
        CadastroPage.elements.titulo().should('contain', 'Cadastro de novo cliente');
      
        CadastroPage.pessoaJuridica.clicarOpcaoPJ();

        CadastroPage.pessoaJuridica.preencherFormulario(usuario);

        CadastroPage.pessoaJuridica.clicarCadastrar();

        CadastroPage.pessoaJuridica.elements.erroSenha().should('be.visible').and('contain', 'Sua senha deve cumprir os seguintes requisitos:');
    });

    it('Cadastro de usuário PJ com confirmação de senha diferente', () => {

        const usuario = UsuarioPJ.pessoaJuridica();

        usuario.confirmacaoSenha = '21792492s';

        HomePage.abrir();

        HomePage.abrirMenuMinhaConta();
       
        HomePage.acessarPaginaCadastro();
       
        CadastroPage.elements.titulo().should('contain', 'Cadastro de novo cliente');
      
        CadastroPage.pessoaJuridica.clicarOpcaoPJ();

        CadastroPage.pessoaJuridica.preencherFormulario(usuario);

        CadastroPage.pessoaJuridica.clicarCadastrar();

        CadastroPage.pessoaJuridica.elements.erroConfirmacaoSenha().should('be.visible').and('contain', 'Sua senha está diferente da confirmação.');
    });
});

