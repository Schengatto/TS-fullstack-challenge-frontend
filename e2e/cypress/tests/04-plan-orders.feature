Feature: Orders management - Plan Orders
  The user can create a new plan to process the orders having the status "Order Placed".
  Once the plan is created, it will be possible to check the tracking plan related to each order processed.

  Background:
    Given a user that accesses the application

  Scenario: The user starts a Plan
    When There is at least one order ready for plan
    And the user navigates to the order lists page
    And the user clicks the button Start New Plan
    And the user selects a Depot
    And the user clicks on the button Start the new Plan
    Then the user is redirected to the orders list page
    And all the orders with the status “Order placed” are processed

  Scenario: The user starts a Plan
    When the user navigates to the order lists page
    And the user clicks on one processed order
    And the user clicks on the button Plans Details
    Then the user is redirected to the plan tracking page
