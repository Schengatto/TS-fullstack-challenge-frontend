import { Given } from "@badeball/cypress-cucumber-preprocessor";

Given("a user that accesses the application", () => {
    cy.visitRootPage();
});