class CarrinhoPage{

    elements = {

        cartTitle: () => cy.get('[data-test="title"]'),

        itemQuantity: () => cy.get('[data-test="item-quantity"]'),

        itemPrice: () => cy.get('[data-test="inventory-item-price"]'),

        checkoutButton: () => cy.get('[data-test="checkout"]')
    };

    obterQuantidadeProduto(){

        return this.elements.itemQuantity().invoke('text').then(text => Number(text));
    }

    obterPrecoProduto(){

        return this.elements.itemPrice().invoke('text').then(text => Number(text.replace(/[^\d.]/g, '')));
    }

    acessarCheckout(){

        this.elements.checkoutButton().click();
    }
}

export default new CarrinhoPage();