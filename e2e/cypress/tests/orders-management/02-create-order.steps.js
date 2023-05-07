import { Then, When } from "@badeball/cypress-cucumber-preprocessor";
import CreateOrder from "../../support/page_objects/create-order";
import PackageForm from "../../support/page_objects/package-form";
import OrdersList from "../../support/page_objects/order-list";
import OrderForm from "../../support/page_objects/order-form";

const createOrder = new CreateOrder();
const orderForm = new OrderForm();
const packageForm = new PackageForm();
const ordersList = new OrdersList();

When("the user navigates to the create new order page", () => {
  createOrder.visit();
});

When("the user fills all the required information for the order", () => {
  orderForm.fillForm("I9999");
});

When("the user click the button Add a new package", () => {
  createOrder.addNewPackageButton.click();
});

When("the user fills the Package information", () => {
  packageForm.fillForm();
});

When("the user clicks the button Add Package", () => {
  packageForm.addPackageButton.click();
});

When("the user confirms the new order", () => {
  createOrder.saveButton.click().wait(500);
});

Then("the user is redirected to the order page", () => {
  cy.url().should("eq", `${Cypress.env("BASE_URL")}/order`);
});

Then("the user sees the new order in ready orders list", () => {
  ordersList.searchForReadyOrder("I9999");
  ordersList.readyOrderTableEmpyMessage.should("not.exist");
});