Feature:UC-1 Product Detail Verification

Background: 
    Given User is logged in as a standard user


Scenario: User sees consistent product data and adds product to the cart
    When User reads data for "<productName>" and opens it's detail's page
    Then Product price on details page matches inventory page
    And Product description on details page matches inventory page
    When User adds product to the cart
    Then Cart badge is displayed
    And Remove button is displayed

Examples:
    |   productName                       |
    |   Sauce Labs Backpack               |
    |   Sauce Labs Bike Light             |
    |   Sauce Labs Bolt T-Shirt           |
    |   Sauce Labs Fleece Jacket          |
    |   Sauce Labs Onesie                 |
    |   Test.allTheThings() T-Shirt (Red) |