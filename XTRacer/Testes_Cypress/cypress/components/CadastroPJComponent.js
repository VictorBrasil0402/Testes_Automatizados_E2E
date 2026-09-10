class CadastroPJComponent{

    elements = {

        linkPessoaJuridica: () => cy.contains('Pessoa Jurídica'),

        razaoSocial: () => cy.get('#razao_social'),

        inscricaoEstadual: () => cy.get('#ie'),

        cnpj: () => cy.get('#cnpj'),

        nomeCompleto: () => cy.get('#pj_nome_cliente'),

        celular: () => cy.get('#telefone_cliente_2'),

        email: () => cy.get('#email_cliente'),

        confirmacaoEmail: () => cy.get('#email_cliente2'),

        senha: () => cy.get('#senha_cliente'),

        confirmacaoSenha: () => cy.get('#senha_cliente2'),

        botaoCadastrar: () => cy.contains('button', 'Avançar'),

        erroRazaoSocial: () => cy.get('#razao_social_erro'),

        erroInscricaoEstadual: () => cy.get('#ie_erro'),

        erroCnpj: () => cy.get('#cnpj_erro'),

        erroNomeCompleto: () => cy.get('#pj_nome_cliente_erro'),

        erroCelular: () => cy.get('.blocoAlerta'),

        erroConfirmacaoEmail: () => cy.get('#email_cliente2_erro'),

        erroSenha: () => cy.get('#senha_cliente_erro'),

        erroConfirmacaoSenha: () => cy.get('#senha_cliente2_erro')
    };

    clicarOpcaoPJ(){

        this.elements.linkPessoaJuridica().click();
    }

    preencherFormulario(usuario){

        this.elements.razaoSocial().type(usuario.razaoSocial);

        this.elements.inscricaoEstadual().type(usuario.inscricaoEstadual);

        this.elements.cnpj().type(usuario.cnpj);

        this.elements.nomeCompleto().type(usuario.nomeCompleto);

        this.elements.celular().type(usuario.celular);

        this.elements.email().type(usuario.email);

        this.elements.confirmacaoEmail().type(usuario.confirmacaoEmail);

        this.elements.senha().type(usuario.senha);

        this.elements.confirmacaoSenha().type(usuario.confirmacaoSenha);
    }

    clicarCadastrar(){

        this.elements.botaoCadastrar().click();
    }
}

export default new CadastroPJComponent();