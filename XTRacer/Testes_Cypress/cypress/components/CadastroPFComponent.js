class CadastroPFComponent{

    elements = {

        nomeCompleto: () => cy.get('#pf_nome_cliente'),

        dataNascimento: () => cy.get('#pf_data_nascimento'),

        cpf: () => cy.get('#pf_cpf_cliente'),

        celular: () => cy.get('#telefone_cliente_2'),

        email: () => cy.get('#email_cliente'),

        confirmacaoEmail: () => cy.get('#email_cliente2'),

        senha: () => cy.get('#senha_cliente'),

        confirmacaoSenha: () => cy.get('#senha_cliente2'),

        botaoCadastrar: () => cy.contains('button', 'Avançar'),

        erroNomeCompleto: () => cy.get('#pf_nome_cliente_erro'),

        erroDataNascimento: () => cy.get('#pf_data_nascimento_erro'),

        erroCpf: () => cy.get('#pf_cpf_cliente_erro'),

        erroCelular: () => cy.get('.blocoAlerta'),

        erroConfirmacaoEmail: () => cy.get('#email_cliente2_erro'),

        erroSenha: () => cy.get('#senha_cliente_erro'),

        erroConfirmacaoSenha: () => cy.get('#senha_cliente2_erro')
    };

    preencherFormulario(usuario){

        this.elements.nomeCompleto().type(usuario.nomeCompleto);

        this.elements.dataNascimento().type(usuario.dataNascimento);

        this.elements.cpf().type(usuario.cpf);

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

export default new CadastroPFComponent();