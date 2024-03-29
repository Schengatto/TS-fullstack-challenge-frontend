class CreateOrder {
    constructor() {
        this.url = `${Cypress.env("BASE_URL")}/order/create`;
    }

    visit() {
        cy.visit(this.url);
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
}

export default CreateOrder;
