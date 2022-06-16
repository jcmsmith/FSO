/* eslint-disable jest/expect-expect */
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import { SignInFormContainer } from "../../components/SignInForm";

describe("SignIn Form", () => {
  describe("Container", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const onSubmit = jest.fn();
      const { getByPlaceholderText, getByText } = render(
        <SignInFormContainer onSubmit={onSubmit} />
      );

      const usernameInput = getByPlaceholderText("Username");
      const passwordInput = getByPlaceholderText("Password");

      fireEvent.changeText(usernameInput, "matti");
      fireEvent.changeText(passwordInput, "password");
      fireEvent.press(getByText("Login"));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);

        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: "matti",
          password: "password",
        });
      });
    });
  });
});
