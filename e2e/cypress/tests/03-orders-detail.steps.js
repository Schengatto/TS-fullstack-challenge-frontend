import { Then, When } from "@badeball/cypress-cucumber-preprocessor";
import OrdersList from "../support/page_objects/order-list";
import OrderForm from "../support/page_objects/order-form";
import OrderDetail from "../support/page_objects/order-detail";

const ordersList = new OrdersList();
const orderForm = new OrderForm();
const orderDetail = new OrderDetail();

When("the user navigates to the orders list page", () => {
  ordersList.visit();
});

When("the user clicks over an order in the orders list", () => {
  ordersList.openFirstReadyOrder();
});

Then("the user is redirected to the order detail page", () => {
  cy.url().should("include", `${Cypress.env("BASE_URL")}/order/`);
});

Then("the user sees the order information", () => {
  orderForm.dateInput.should("be.visible");
  orderForm.statusInput.should("be.visible");
  orderForm.invoiceNumberInput.should("be.visible");
  orderForm.notesInput.should("be.visible");
});

When("the user click the button Edit Order", () => {
  orderDetail.editOrderButton.click();
});

When("the user edits the order information", () => {
  orderForm.notesInput.clear().type("Another test");
});

When("the user confirms the new changes", () => {
  orderDetail.saveButton.click();
});

Then("the user can see the updated information on the order detail page", () => {
  orderForm.notesInput.contains("Another test");
});