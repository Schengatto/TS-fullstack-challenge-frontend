import { Then, When} from "@badeball/cypress-cucumber-preprocessor";
import OrdersList from "../support/page_objects/order-list";

const ordersList = new OrdersList();

When("the user navigates to the orders list page", () => {
  ordersList.visit();
});

Then("the page contains a table with the orders ready to be inserted into a new plan", () => {
  ordersList.readyOrders.should("be.visible");
});

Then("the page contains a table with the orders already processed", () => {
  ordersList.processedOrders.should("be.visible");
});

Then("the page contains the button add new order", () => {
  ordersList.addNewOrderButton.should("be.visible");
});

Then("the page contains the button start new plan", () => {
  ordersList.startNewPlanButton.should("be.visible");
});
