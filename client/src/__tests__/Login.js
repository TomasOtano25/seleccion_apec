import React from "react";
import { create } from "react-test-renderer";
import { render, cleanup, fireEvent } from "react-testing-library";
import { MemoryRouter } from "react-router-dom";
import "jest-dom/extend-expect";
import LoginPage from "../pages/Login";

afterEach(cleanup);

describe("Login page", () => {
  it("should matches the snapshot", () => {
    const loginPage = create(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(loginPage.toJSON()).toMatchSnapshot();
  });

  it("should change the entry email change and the button be disabled", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const emailInput = getByPlaceholderText("Email");
    fireEvent.change(emailInput, {
      target: { value: "20180089@unapec.edu.do" }
    });

    const submitButton = getByTestId("submit-button");

    expect(emailInput.value).toBe("20180089@unapec.edu.do");

    expect(submitButton).not.toBeDisabled();
  });
  it("should submit", () => {});
  it("should not submit if required fields are empty", () => {});
});
