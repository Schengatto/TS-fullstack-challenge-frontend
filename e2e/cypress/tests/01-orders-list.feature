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
