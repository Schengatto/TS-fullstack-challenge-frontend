Feature: Orders management - Order List
  The Order list page gives to the user a view to easy check which are the orders ready to be added to a plan and the order already processed.
  In this page the user can add a new order or start a new plan

  Background:
    Given a user that accesses the application

  Scenario: The user can see the list of orders
    When the user navigates to the orders list page
    Then the page contains a table with the orders ready to be inserted into a new plan
    And the page contains a table with the orders already processed
    And the page contains the button add new order
    And the page contains the button start new plan

  # Scenario: The user starts a Plan
  #   When the user navigates to the start a Plan page
  #   And the user selects a Depot
  #   And the user clicks on the start the Plan
  #   Then all the orders with the status “Order placed” are processed
  #   And the user is redirected to the plan tracking page
  #   And the user can see the delivery tracking
  #   And all the orders of the plan have now the status “Preparing for shipment”