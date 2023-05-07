class OrderDetail {
    get backButton() {
        return cy.get("[data-test=\"Button__Back\"]");
    }

    get editOrderButton() {
        return cy.get("[data-test=\"Button__EditOrder\"]");
    }

    get deleteOrderButton() {
        return cy.get("[data-test=\"Button__DeleteOrder\"]");
    }

    get cancelButton() {
        return cy.get("[data-test=\"OrderForm__Button__cancel\"]");
    }

    get addNewPackageButton() {
        return cy.get("[data-test=\"OrderForm__Button__addPackage\"]");
    }

    get saveButton() {
        return cy.get("[data-test=\"OrderForm__Button__save\"]");
    }

    get planDetailsButton() {
        return cy.get("[data-test=\"Button__PlanDetails\"]");
    }
}

export default OrderDetail;
