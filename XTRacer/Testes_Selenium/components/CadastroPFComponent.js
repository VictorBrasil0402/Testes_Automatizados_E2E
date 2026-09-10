const { By } = require('selenium-webdriver');

const BasePage = require('../pages/BasePage');

class CadastroPFComponent extends BasePage {

    constructor(driver){

        super(driver);

        this.locators = {

            nomeCompleto: By.id('pf_nome_cliente'),

            dataNascimento: By.id('pf_data_nascimento'),

            cpf: By.id('pf_cpf_cliente'),

            celular: By.id('telefone_cliente_2'),

            email: By.id('email_cliente'),

            confirmacaoEmail: By.id('email_cliente2'),

            senha: By.id('senha_cliente'),

            confirmacaoSenha: By.id('senha_cliente2'),

            botaoCadastrar: By.xpath("//button[contains(., 'Avançar')]"),

            erroNomeCompleto: By.id('pf_nome_cliente_erro'),

            erroDataNascimento: By.id('pf_data_nascimento_erro'),

            erroCpf: By.id('pf_cpf_cliente_erro'),

            erroCelular: By.css('.blocoAlerta'),

            erroConfirmacaoEmail: By.id('email_cliente2_erro'),

            erroSenha: By.id('senha_cliente_erro'),

            erroConfirmacaoSenha: By.id('senha_cliente2_erro')
        };
    }

    async preencherFormulario(usuario){

        await this.type(this.locators.nomeCompleto, usuario.nomeCompleto);

        await this.type(this.locators.dataNascimento, usuario.dataNascimento);

        await this.type(this.locators.cpf, usuario.cpf);

        await this.type(this.locators.celular, usuario.celular);

        await this.type(this.locators.email, usuario.email);

        await this.type(this.locators.confirmacaoEmail, usuario.confirmacaoEmail);

        await this.type(this.locators.senha, usuario.senha);

        await this.type(this.locators.confirmacaoSenha, usuario.confirmacaoSenha);
    }

    async clicarCadastrar(){

        await this.click(this.locators.botaoCadastrar);
    }
}

module.exports = CadastroPFComponent;