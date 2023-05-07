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

    get readyOrderTableEmpyMessage() {
        return cy.get("[data-test=\"OrderList__Table__readyOrders\"] [data-test=\"Table__Empty__message\"]");
    }

    searchForReadyOrder(searchTerm) {
        const searchInput = cy.get("[data-test=\"OrderList__Table__readyOrders\"] [data-test=\"SearchBar__Input\"]");
        searchInput.type(searchTerm);
    }

    searchForProcessedOrder(searchTerm) {
        const searchInput = cy.get("[data-test=\"OrderList__Table__processedOrders\"] [data-test=\"SearchBar__Input\"]");
        searchInput.type(searchTerm);
    }
}

export default OrdersList;
