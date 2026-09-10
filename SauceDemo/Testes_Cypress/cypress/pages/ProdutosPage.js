class ProdutosPage{

    elements = {

        productsTitle: () => cy.get('[data-test="title"]'),

        products: () => cy.get('[data-test="inventory-list"] .inventory_item_img')
    };

    selecionarProduto(){

        this.elements.products().first().click();
    }
}

export default new ProdutosPage();