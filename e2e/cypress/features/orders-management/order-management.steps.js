import { Then, When, Given } from "@badeball/cypress-cucumber-preprocessor";

Given("a user that accesses the application", () => {
  cy.visitRootPage();
});

Then("the user navigates to the orders list page", () => {
  cy.navigateToPath("/order");
});

Then("the destination button should not be visible", () => {
  headerComponent.destinationsLink.should("not.exist");
});

Then("the browser should render the 404 content", () => {
  cy.get(`.error-card__content-code`).should("contain.text", "404");
});

Then("it should see a list of regions", () => {
  destinationPage.regionsList.should("be.visible");
});

When(
  "the user clicks the go to region button of the region {word}",
  (region) => {
    destinationPage.goToRegionDetails(region);
  }
);

Then("it should be redirected to {word}", (path) => {
  cy.location().should((location) => {
    expect(location.pathname).to.eq(path);
  });
});

Then("the region page should contain a list of countries", () => {
  regionPage.countriesList.should("be.visible");
});

Then("the region page should have the title {string}", (title) => {
  regionPage.regionTitle.should("contain.text", title);
});

Then("the page should contain the description of the region", () => {
  regionPage.regionDescription.should("be.visible");
});

When(
  "the user clicks the go to contry button of the contry {word}",
  (country) => {
    regionPage.goToCountryDetails(country);
  }
);

Then("the country page should contain the image of the country", () => {
  countryPage.countryImageContainer.should("be.visible");
});

Then("the country page should contain the description of the country", () => {
  countryPage.countryDescription.should("be.visible");
});

Then("the country page should not contain the filters button", () => {
  cy.get(
    '[data-test="Country__Page__content"] [data-test="CountryFilter__Button__filters"]'
  ).should("not.exist");
});

Then("the country page should not contain the search button", () => {
  cy.get(
    '[data-test="Country__Page__content"] [data-test="SearchBox__Button__submit"]'
  ).should("not.exist");
});
