describe("Blog App", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("");
  });
  describe("when logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();
      cy.contains("mluukkai logged-in");
    });
  });

  it("login fails with wrong password", function () {
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();
    cy.get(".notification")
      .should("contain", "Wrong credentials")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");
    cy.contains("Matti Luukkainen logged in").should("not.exist");
  });
});
describe("and a note exists", function () {
  beforeEach(function () {
    cy.createBlog({
      title: "Testing Blog Title",
      author: "Testing Author",
      url: "http://example.com",
    });
    cy.contains("#save").click();
  });
});
