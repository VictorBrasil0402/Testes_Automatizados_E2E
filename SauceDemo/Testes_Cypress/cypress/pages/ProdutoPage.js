class ProdutoPage{

    elements = {

        cartButton: () => cy.get('[data-test="add-to-cart"]'),

        cartBadge: () => cy.get('[data-test="shopping-cart-badge"]'),

        cartLink: () => cy.get('[data-test="shopping-cart-link"]')
    };

    adicionarProdutoCarrinho(){

        this.elements.cartButton().click();
    }

    acessarCarrinho(){

        this.elements.cartLink().click();
    }
}

export default new ProdutoPage();