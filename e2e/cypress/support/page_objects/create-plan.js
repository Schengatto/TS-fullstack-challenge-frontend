class CreatePlan {
    constructor() {
        this.url = `${Cypress.env("BASE_URL")}/plan/create`;
    }

    visit() {
        cy.visit(this.url);
    }

    get depotSelector() {
        return cy.get("[data-test=\"PlanForm__Select__depot\"]");
    }

    get cancelButton() {
        return cy.get("[data-test=\"Button__Cancel\"]");
    }

    get startTheNewPlanButton() {
        return cy.get("[data-test=\"PlanForm__Button__start\"]");
    }

    selectDepot(depotName) {
        this.depotSelector.select(depotName);
    }
}

export default CreatePlan;
