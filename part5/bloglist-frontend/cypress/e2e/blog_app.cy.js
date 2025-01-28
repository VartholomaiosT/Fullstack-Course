describe("Blog app", function () {
  const user = {
    name: "Matti Luukkainen",
    username: "mluukkai",
    password: "salainen",
  };
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    cy.visit("");
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();
      cy.contains(`${user.name} logged-in`);
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("Testing Blog Title");
      cy.get("#author").type("Testing Author");
      cy.get("#url").type("http://example.com");
      cy.contains("save").click();

      cy.contains("Testing Blog Title Testing Author");
    });
    beforeEach(function () {
      cy.login({ username: user.username, password: user.password });
    });

    it("A blog can be liked", function () {
      cy.createBlog({
        title: "Testing Blog Title",
        author: "Testing Author",
        url: "http://example.com",
      });
      cy.contains("Testing Blog Title Testing Author")
        .parent()
        .find("button")
        .contains("view")
        .click();
      cy.contains("Testing Blog Title Testing Author")
        .parent()
        .find("button")
        .contains("like")
        .click();
      cy.contains("likes 1");
    });

    it("User that created a blog can delete it", function () {
      cy.createBlog({
        title: "Another Testing Blog Title",
        author: "Other Author",
        url: "http://example.com",
      });
      cy.contains("Another Testing Blog Title Other Author")
        .parent()
        .find("button")
        .contains("view")
        .click();
      cy.contains("Testing Blog Title Other Author")
        .parent()
        .find("button")
        .contains("remove")
        .click();
      cy.contains("Testing Blog Title Other Author").should("not.exist");
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
