class PackageForm {
    get cancelButton() {
        return cy.get("[data-test=\"Button__Cancel\"]");
    }

    get addPackageButton() {
        return cy.get("[data-test=\"Button__AddPackage\"]");
    }

    get updatePackageButton() {
        return cy.get("[data-test=\"Button__UpdatePackage\"]");
    }

    get codeInput() {
        return cy.get("[data-test=\"InputText__Code\"] [data-test=\"InputText_Input\"]");
    }

    get supplierInput() {
        return cy.get("[data-test=\"InputText__Supplier\"] [data-test=\"InputText_Input\"]");
    }

    get recipientInput() {
        return cy.get("[data-test=\"InputText__RecipientName\"] [data-test=\"InputText_Input\"]");
    }

    get cityInput() {
        return cy.get("[data-test=\"InputText__City\"] [data-test=\"InputText_Input\"]");
    }

    get postalCodeInput() {
        return cy.get("[data-test=\"InputText__PostalCode\"] [data-test=\"InputText_Input\"]");
    }

    get roadInput() {
        return cy.get("[data-test=\"InputText__Road\"] [data-test=\"InputText_Input\"]");
    }

    get latitudeInput() {
        return cy.get("[data-test=\"InputText__Latitude\"] [data-test=\"InputText_Input\"]");
    }

    get longitudeInput() {
        return cy.get("[data-test=\"InputText__Longitude\"] [data-test=\"InputText_Input\"]");
    }

    get phoneNumberInput() {
        return cy.get("[data-test=\"InputText__PhoneNumber\"] [data-test=\"InputText_Input\"]");
    }

    get notesInput() {
        return cy.get("[data-test=\"TextArea__Notes\"] [data-test=\"TextArea_Input\"]");
    }

    fillForm(packageId = `P${Date.now()}`) {
        this.codeInput.type(packageId);
        this.supplierInput.type("S9999");
        this.recipientInput.type("Cypress");
        this.cityInput.type("Localhost");
        this.postalCodeInput.type("e0010");
        this.roadInput.type("0.0.0.0");
        this.latitudeInput.type(20);
        this.longitudeInput.type(10);
        this.phoneNumberInput.type(+3901234567)
        this.notesInput.type("I am just a package test!");
    }
}

export default PackageForm;
