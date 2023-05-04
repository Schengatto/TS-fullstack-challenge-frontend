import MetricsPageObject from "../../support/page_objects/metrics";

describe("Metrics list page", () => {
    const TEST_METRIC_CODE = "TestE2E";
    let metricsPageObject = new MetricsPageObject();

    beforeEach("The user access to the metrics list page", () => {
        metricsPageObject.listMetricPage.visit();
        cy.url().should("eq", metricsPageObject.listMetricPage.url);
    });

    it("should allow the user to see the metrics and the add new metric button", () => {
        metricsPageObject.listMetricPage.metricsTable.should("exist");
        metricsPageObject.listMetricPage.addNewMetricButton.should("exist");
    });

    it("should allow the user to create a new metric", () => {
        metricsPageObject.listMetricPage.addNewMetricButton.click();
        cy.url().should("eq", metricsPageObject.createMetricPage.url);

        // Check expected elements
        metricsPageObject.metricForm.cancelButton.should("exist");
        metricsPageObject.metricForm.addNewAmountButton.should("exist");
        metricsPageObject.metricForm.saveButton.should("exist");
        metricsPageObject.metricForm.saveButton.should("be.disabled");

        metricsPageObject.metricForm.codeInput.type(TEST_METRIC_CODE);
        metricsPageObject.metricForm.addNewAmountButton.click();
        metricsPageObject.metricForm.getAmountAtIndex(0).type("10");
        metricsPageObject.metricForm.addNewAmountButton.click();
        metricsPageObject.metricForm.getAmountAtIndex(1).type("20");

        metricsPageObject.metricForm.saveButton.should("be.enabled");
        metricsPageObject.metricForm.saveButton.click();

        // Back to list of metrics. The new metrics should be present in the table
        cy.url().should("eq", metricsPageObject.listMetricPage.url);
        metricsPageObject.listMetricPage.searchBar.type(TEST_METRIC_CODE).wait(500);
        metricsPageObject.listMetricPage.metricsTable.get("[data-test=\"Table_Row_0\"]").should("exist");
    });

    it("should allow the user to see the details of the selected metric from the table", () => {
        metricsPageObject.listMetricPage.metricsTable.get("[data-test=\"Table_Row_0\"]").click();
        // Current data are mocked. Anyway in a real QA environment we should do test on known "static" data inserted ad hoc of e2e tests.
        cy.url().should("eq", metricsPageObject.detailMetricPage.url);

        metricsPageObject.detailMetricPage.chart.should("exist");
        metricsPageObject.detailMetricPage.backToListButton.should("exist");
        metricsPageObject.detailMetricPage.editMetricButton.should("exist");
        metricsPageObject.detailMetricPage.deleteMtricButton.should("exist");
    });

    it("should allow the user to edit a metric", () => {
        // Current data are mocked. Anyway in a real QA environment we should do test on known "static" data inserted ad hoc of e2e tests.
        metricsPageObject.detailMetricPage.visit();
        metricsPageObject.detailMetricPage.editMetricButton.click();

        metricsPageObject.metricForm.codeInput.clear().type(TEST_METRIC_CODE);
        metricsPageObject.metricForm.getAmountAtIndex(0).clear().type("10");
        metricsPageObject.metricForm.getDeleteAmountButtonAtIndex(1).click();

        metricsPageObject.metricForm.saveButton.should("be.enabled");
        metricsPageObject.metricForm.saveButton.click();

        // Back to detail of metric.
        cy.url().should("eq", metricsPageObject.detailMetricPage.url);
    });

    it("should allow the user to delete a metric", () => {
        // Current data are mocked. Anyway in a real QA environment we should do test on known "static" data inserted ad hoc of e2e tests.
        metricsPageObject.detailMetricPage.visit();
        metricsPageObject.detailMetricPage.deleteMtricButton.click();

        // Back to detail of metric.
        cy.url().should("eq", metricsPageObject.listMetricPage.url);

        // The deleted metric should be present in the table
        metricsPageObject.listMetricPage.searchBar.type("4bd").wait(500);
        metricsPageObject.listMetricPage.metricsTable.get("[data-test=\"Table_Row_0\"]").should("not.exist");
    });
});