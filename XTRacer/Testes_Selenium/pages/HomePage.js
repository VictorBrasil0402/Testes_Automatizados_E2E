const { By } = require('selenium-webdriver'); 

const BasePage = require('./BasePage');

class HomePage extends BasePage {

    constructor(driver) {

        super(driver);

        this.url = "https://www.xtracer.com.br";

        this.locators = {

            menuMinhaConta: By.xpath("//h4[contains(text(),'MINHA CONTA')]"),

            linkCadastro: By.linkText('Cadastre-se'),

            linkLogin: By.linkText('Entre'),

            linkProdutos: By.linkText('Todos Os Produtos')
        };
    }

    async abrir() {

        await this.open(this.url);
    }

    async abrirMenuMinhaConta() {

        await this.hover(this.locators.menuMinhaConta);
    }

    async acessarPaginaCadastro() {

        await this.abrirMenuMinhaConta();

        await this.click(this.locators.linkCadastro);
    }

    async acessarPaginaLogin() {

        await this.abrirMenuMinhaConta();

        await this.click(this.locators.linkLogin);
    }

    async acessarPaginaProdutos() {

        await this.click(this.locators.linkProdutos);
    }
}

module.exports = HomePage;