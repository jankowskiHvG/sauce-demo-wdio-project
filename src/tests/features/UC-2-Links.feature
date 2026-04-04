Feature: UC-2 Social Media Links

    Background:
        Given User is logged in as a standard user

    Scenario Outline: User can open <socialPlatform> link
        When User scrolls to footer
        Then "<socialPlatform>" icon is displayed in footer
        And "<socialPlatform>" link has correct href
        When User clicks "<socialPlatform>" icon
        Then New tab opens with a correct "<socialPlatform>" URL

    Examples:
        |   socialPlatform  |
        |   twitter         |
        |   facebook        |
        |   linkedin        |

