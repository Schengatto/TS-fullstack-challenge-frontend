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

    get invoiceNumberInput() {
        return cy.get("[data-test=\"InputText__InvoiceNumber\"] [data-test=\"InputText_Input\"]");
    }

    get notesInput() {
        return cy.get("[data-test=\"TextArea__OrderNotes\"] [data-test=\"TextArea_Input\"]");
    }

    fillForm(invoiceId = `I${Date.now()}`) {
        this.invoiceNumberInput.type(invoiceId);
        this.notesInput.type("I am just an order test!");
    }
}

export default CreateOrder;
