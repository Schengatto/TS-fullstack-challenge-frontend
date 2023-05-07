import { Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import OrdersList from "../../support/page_objects/order-list";

const ordersListPageObjcet = new OrdersList();

Given("a user that accesses the application", () => {
  cy.visitRootPage();
});

Then("the user navigates to the orders list page", () => {
  ordersListPageObjcet.visit();
});

Then("the page contains a table with the orders ready to be inserted into a new plan", () => {
  ordersListPageObjcet.readyOrders.should("be.visible");
});

Then("the page contains a table with the orders already processed", () => {
  ordersListPageObjcet.processedOrders.should("be.visible");
});
