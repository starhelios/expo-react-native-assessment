import { fireEvent, render } from "@testing-library/react-native";
import { act } from "react-test-renderer";
import Login from "../pages/login/index";
import { saveToken } from "../store";

jest.mock("../store", () => ({
  saveToken: jest.fn(),
}));

const flushMicroTasksQueue = () =>
  new Promise((resolve) => setImmediate(resolve));

describe("Login Screen", () => {
  it("should be rendered", () => {
    const { getAllByText } = render(<Login />);
    expect(getAllByText("LOGIN").length).toBe(1);
  });

  it("should show invalid inputs messages", () => {
    const { getByTestId, queryAllByText } = render(<Login />);
    fireEvent.press(getByTestId("SignIn.Button"));

    expect(
      queryAllByText('The field "email" must be a valid email address.').length
    ).toBe(1);
    expect(queryAllByText('The field "password" is mandatory.').length).toBe(1);
  });

  it("should success with correct credentials", async () => {
    fetch.mockResponseOnce(JSON.stringify({ passes: true }));
    const navigateMock = jest.fn();

    const { getByTestId } = render(
      <Login navigation={{ navigate: navigateMock }} />
    );

    fireEvent.changeText(
      getByTestId("SignIn.emailInput"),
      "eve.holt@reqres.in"
    );
    fireEvent.changeText(getByTestId("SignIn.pwdInput"), "cityslicka");
    fireEvent.press(getByTestId("SignIn.Button"));

    // expect(fetch.mock.calls).toMatchSnapshot();
    await act(flushMicroTasksQueue);
    expect(saveToken).toHaveBeenCalledTimes(1);
    expect(navigateMock).toBeCalledWith("Home");
  });
});
