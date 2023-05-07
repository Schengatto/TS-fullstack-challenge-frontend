Feature: Orders management - Order Detail and update

  Background:
    Given a user that accesses the application

  Scenario: The user accesses the order detail page
    When the user navigates to the orders list page
    And the user clicks over an order in the orders list
    Then the user is redirected to the order detail page
    And the user sees the order information

  Scenario: The user updates an existing order
    When the user navigates to the orders list page
    And the user clicks over an order in the orders list
    And the user click the button Edit Order
    And the user edits the order information
    And the user confirms the new changes
    Then the user can see the updated information on the order detail page
