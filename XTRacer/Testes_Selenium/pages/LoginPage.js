const { By } = require('selenium-webdriver');

const BasePage = require('./BasePage');

class LoginPage extends BasePage {

    constructor(driver){

        super(driver);

        this.locators = {

            botaoEntrar: By.css('#login-button:not(.app__loading)'),

            campoIdentificador: By.id('input-email'),

            botaoContinuar: By.id('tray-login-identify'),
            
            campoSenha: By.id('input-password'),

            botaoEnviar: By.id('password-submit'),

            loading: By.css('.tray-loading'),

            erroIdentificador: By.xpath("//span[contains(text(), 'Dados inválidos. Tente novamente.')]"),

            erroAutenticacao: By.xpath("//span[contains(text(), 'Autenticação incorreta.')]")
        };
    }

    async abrirFormularioLogin(){

        await this.click(this.locators.botaoEntrar);
    }  

    async preencherEmail(usuario){

        await this.type(this.locators.campoIdentificador, usuario.email);
    }

    async clicarContinuar(){

        await this.click(this.locators.botaoContinuar);
    }

    async preencherSenha(usuario){

        await this.type(this.locators.campoSenha, usuario.senha);
    }

    async clicarEnviar(){ 
        
        await this.waitInvisible(this.locators.loading); 
        
        await this.click(this.locators.botaoEnviar);
    }
}

module.exports = LoginPage;