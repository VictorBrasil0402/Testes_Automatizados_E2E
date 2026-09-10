const { By } = require('selenium-webdriver');

const BasePage = require('../pages/BasePage');

class CadastroPJComponent extends BasePage {

    constructor(driver){

        super(driver);

        this.locators = {

            linkPessoaJuridica: By.linkText('Pessoa Jurídica'),

            razaoSocial: By.id('razao_social'),

            inscricaoEstadual: By.id('ie'),

            cnpj: By.id('cnpj'),

            nomeCompleto: By.id('pj_nome_cliente'),

            celular: By.id('telefone_cliente_2'),

            email: By.id('email_cliente'),

            confirmacaoEmail: By.id('email_cliente2'),

            senha: By.id('senha_cliente'),

            confirmacaoSenha: By.id('senha_cliente2'),

            botaoCadastrar: By.xpath("//button[contains(., 'Avançar')]"),

            erroRazaoSocial: By.id('razao_social_erro'),

            erroInscricaoEstadual: By.id('ie_erro'),

            erroCnpj: By.id('cnpj_erro'),

            erroNomeCompleto: By.id('pj_nome_cliente_erro'),

            erroCelular: By.css('.blocoAlerta'),

            erroConfirmacaoEmail: By.id('email_cliente2_erro'),

            erroSenha: By.id('senha_cliente_erro'),

            erroConfirmacaoSenha: By.id('senha_cliente2_erro')
        };
    }

    async clicarOpcaoPJ(){

        await this.click(this.locators.linkPessoaJuridica);
    }

    async preencherFormulario(usuario){

        await this.type(this.locators.razaoSocial, usuario.razaoSocial);

        await this.type(this.locators.inscricaoEstadual, usuario.inscricaoEstadual);

        await this.type(this.locators.cnpj, usuario.cnpj);

        await this.type(this.locators.nomeCompleto, usuario.nomeCompleto);

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

module.exports = CadastroPJComponent;