Feature: Orders management

  Background:
    Given a user that accesses the application

  Scenario: The user can see the list of orders
    When the user navigates to the orders list page
    Then the user sees a table with the current orders

  Scenario: The user creates a new order
    When the user opens the create new order page
    And the user fills out the “Create a new order” form with the required information
    And the user confirm the new order
    Then a new order is created
    And the user is redirected to the order page
    And the user sees the new order in the list
    And the new order has the status “Order Placed”

  Scenario: The user accesses the order detail page
    When the user navigates to the orders list page
    And the user clicks over an order in the orders list
    Then the user is redirected to the order detail page
    And the user is redirected to the order detail page
    And the user sees the order information

  Scenario: The user updates an existing order
    When the user navigates to the order details page of an existing order
    And the user fills out the “Update the order information”
    And the user confirms the new changes
    Then the selected order is updated
    And the user can see the updated information on the order detail page

  Scenario: The user starts a Plan
    When the user navigates to the start a Plan page
    And the user selects a Depot
    And the user clicks on the start the Plan
    Then all the orders with the status “Order placed” are processed
    And the user is redirected to the plan tracking page
    And the user can see the delivery tracking
    And all the orders of the plan have now the status “Preparing for shipment”