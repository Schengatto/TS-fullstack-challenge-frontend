import { Then, When } from "@badeball/cypress-cucumber-preprocessor";
import OrdersList from "../support/page_objects/order-list";
import CreatePlan from "../support/page_objects/create-plan";
import OrderDetail from "../support/page_objects/order-detail";

const ordersList = new OrdersList();
const createPlan = new CreatePlan();
const orderDetail = new OrderDetail();

When("There is at least one order ready for plan", () => {
  const url = `${Cypress.env("API_ENDPOINT")}/order`;
  const headers = {
    "Origin": "http://localhost:8080"
  };
  const body = { "invoiceId": "I9999999", "notes": "Test Cypress", "packages": [{ "code": "AZ12", "notes": "", "destination": { "owner": "Tester", "address": "motherboard", "city": "Localhost", "latitude": "1", "longitude": "1", "postalCode": "E2E", "notes": "", "phoneNumber": "" }, "supplierId": "Cypress" }], "status": "ORDER_PLACED" };
  cy.request({ method: "POST", url, headers, body, failOnStatusCode: false }).should((response) => {
    expect(response.status).to.eq(201);
  });
});

When("the user navigates to the order lists page", () => {
  ordersList.visit();
});

When("the user clicks the button Start New Plan", () => {
  ordersList.startNewPlanButton.click();
});

When("the user selects a Depot", () => {
  createPlan.selectDepot(1);
});

When("the user clicks on the button Start the new Plan", () => {
  createPlan.startTheNewPlanButton.click();
});

Then("the user is redirected to the orders list page", () => {
  cy.url().should("eq", `${Cypress.env("BASE_URL")}/order`);
});

Then("all the orders with the status “Order placed” are processed", () => {
  ordersList.readyOrderTableEmpyMessage.should("be.visible");
});

When("the user clicks on one processed order", () => {
  ordersList.openFirstProcessedOrder();
});

When("the user clicks on the button Plans Details", () => {
  orderDetail.planDetailsButton.click();
});

Then("the user is redirected to the plan tracking page", () => {
  cy.url().should("contain", `${Cypress.env("BASE_URL")}/plan/`);
});
