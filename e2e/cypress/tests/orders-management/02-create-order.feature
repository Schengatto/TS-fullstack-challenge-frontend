Feature: Orders management - Create Order

  Background:
    Given a user that accesses the application

  Scenario: The user creates a new order
    When the user navigates to the create new order page
    And the user fills all the required information for the order
    And the user click the button Add a new package
    And the user fills the Package information
    And the user clicks the button Add Package
    And the user confirms the new order
    Then the user is redirected to the order page
    And the user sees the new order in ready orders list