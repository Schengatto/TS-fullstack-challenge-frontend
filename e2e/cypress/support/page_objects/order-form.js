class OrderForm {

    get dateInput() {
        return cy.get("[data-test=\"InputText__Date\"] [data-test=\"InputText_Input\"]");
    }

    get statusInput() {
        return cy.get("[data-test=\"InputText__Status\"] [data-test=\"InputText_Input\"]");
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

export default OrderForm;