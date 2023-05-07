class OrdersList {
    constructor() {
        this.url = `${Cypress.env("BASE_URL")}/order`;
    }

    visit() {
        cy.visit(this.url);
    }

    get readyOrders() {
        return cy.get("[data-test=\"OrderList__Table__readyOrders\"]");
    }

    get processedOrders() {
        return cy.get("[data-test=\"OrderList__Table__processedOrders\"]");
    }
}

export default OrdersList;
