class ListMetricsPage {
    constructor() {
        this.url = `${Cypress.env("base_url")}/metrics`;
    }

    visit() {
        cy.visit(this.url);
    }

    get metricsTable() {
        return cy.get("[data-test=\"ListMetrics__Table\"]");
    }

    get addNewMetricButton() {
        return cy.get("[data-test=\"Button__AddNewMetric\"]");
    }

    get searchBar() {
        return cy.get("[data-test=\"SearchBar__Input\"]");
    }
}

class DetailMetricPage {
    constructor() {
        this.url = `${Cypress.env("base_url")}/metrics/4bd`;
    }

    visit() {
        cy.visit(this.url);
    }

    get chart() {
        return cy.get("canvas");
    }

    get backToListButton() {
        return cy.get("[data-test=\"Button__BackToList\"]");
    }

    get editMetricButton() {
        return cy.get("[data-test=\"Button__EditMetric\"]");
    }

    get deleteMtricButton() {
        return cy.get("[data-test=\"Button__DeleteMetric\"]");
    }
}

class CreateMetricPage {
    constructor() {
        this.url = `${Cypress.env("base_url")}/metrics/create`;
    }

    visit() {
        cy.visit(this.url);
    }
}

class MetricForm {
    get codeInput() {
        return cy.get("[data-test=\"InputText__Code\"] > [data-test=\"InputText_Input\"]");
    }

    get cancelButton() {
        return cy.get("[data-test=\"Button__Cancel\"]");
    }

    get addNewAmountButton() {
        return cy.get("[data-test=\"Button__AddNewAmount\"]");
    }

    get saveButton() {
        return cy.get("[data-test=\"Button__Save\"]");
    }

    getAmountAtIndex(index) {
        return cy.get(`[data-test="InputText__Amount${index}"]`);
    }

    getDeleteAmountButtonAtIndex(index) {
        return cy.get(`[data-test="MetricForm__AmountRow__${index}"] > .amount-actions > [data-test="Button__Delete"]`);
    }
}

class MetricsPageObject {
    listMetricPage = new ListMetricsPage();
    detailMetricPage = new DetailMetricPage();
    createMetricPage = new CreateMetricPage();
    metricForm = new MetricForm();
}

export default MetricsPageObject;
