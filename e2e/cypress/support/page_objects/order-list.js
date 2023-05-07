class OrdersList {
    constructor() {
        this.url = `${Cypress.env("BASE_URL")}/order`;
    }

    visit() {
        cy.visit(this.url);
    }

    get addNewOrderButton() {
        return cy.get("[data-test=\"Button__AddNewOrder\"]");
    }

    get startNewPlanButton() {
        return cy.get("[data-test=\"Button__StartNewPlan\"]");
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
        searchInput.type(searchTerm).wait(1000);
    }

    searchForProcessedOrder(searchTerm) {
        const searchInput = cy.get("[data-test=\"OrderList__Table__processedOrders\"] [data-test=\"SearchBar__Input\"]");
        searchInput.type(searchTerm).wait(1000);
    }

    openFirstReadyOrder() {
        const orderRow = cy.get("[data-test=\"OrderList__Table__readyOrders\"] [data-test=\"Table_Row_0\"]");
        orderRow.click();
    }
}

export default OrdersList;
