@editor @editor_atto @atto @atto_poodll @_bug_phantomjs
Feature: Atto Poodll plugin
  Basic poodll anywhere integration test

  @javascript
  Scenario: Visit
    Given the following config values are set as admin:
      | config | value | plugin |
      | toolbar | files = poodll, html | editor_atto |
    And I log in as "admin"
    And I expand "Site administration" node
    And I expand "Plugins" node
    And I expand "Filters" node
    And I follow "Manage filters"
    And I click on "On" "option" in the "PoodLL Filter" "table_row"
    And I navigate to "Manage courses and categories" node in "Site administration > Courses"
    And I follow "Create new course"
    Then "//button[@class=\"atto_poodll_button_audiomp3\"]" "xpath_element" should exist