import { LoginForm } from "@/app/components/auth/login-form";
import { server } from "@/app/mocks/server";
import { render, screen } from "@/app/test-utils/testing-library-utils";
import { userEvent } from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
const AUTH_API_URL = process.env.NEXT_PUBLIC_LOGIN_API!;

const loginMock = vi.fn();

vi.mock("@/app/hooks/useLogin", () => ({
  default: () => ({
    login: loginMock,
    isPending: false,
  }),
}));

describe("Login UI Behaviour", () => {
  it("should render login form with heading", () => {
    // ARRANGE
    render(<LoginForm />);
    // ACT
    const heading = screen.getByRole("heading", { name: /welcome/i });

    // ASSERT
    expect(heading).toBeInTheDocument();
  });

  it("should render input fields correctly", () => {
    // ARRANGE
    render(<LoginForm />);
    // ACT
    const emailElement = screen.getByLabelText(/email/i);
    const passwordElement = screen.getByLabelText(/password/i);
    // ASSERT
    expect(emailElement).toBeInTheDocument();
    expect(passwordElement).toBeInTheDocument();
    expect(emailElement).toHaveAttribute("type", "email");
    expect(passwordElement).toHaveAttribute("type", "password");
  });

  it("should render buttons correctly", () => {
    // ARRANGE
    render(<LoginForm />);
    // ACT
    const passwordTypeBtn = screen.getByRole("button", { name: /show/i });
    const submitBtn = screen.getByRole("button", { name: /log in/i });
    const forgotPasswordBtn = screen.getByRole("button", {
      name: /forgot password/i,
    });
    // ASSERT
    expect(passwordTypeBtn).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    expect(forgotPasswordBtn).toBeInTheDocument();
  });

  it("should change password input type when button is clicked", async () => {
    const user = userEvent.setup();
    // RENDER APP
    render(<LoginForm />);
    // FIND ELEMENTS
    const passwordElement = screen.getByLabelText(/password/i);
    const passwordTypeBtn = screen.getByRole("button", { name: /show/i });
    // CHECK INITIAL CONDITIONS
    expect(passwordElement).toBeInTheDocument();
    expect(passwordElement).toHaveAttribute("type", "password");
    // after clicking the button, button text and password attribute type should change
    await user.click(passwordTypeBtn);
    expect(passwordTypeBtn).toHaveTextContent(/hide/i);
    expect(passwordElement).toHaveAttribute("type", "text");

    // after clicking the button, button text and password attribute type should change
    await user.click(passwordTypeBtn);
    expect(passwordTypeBtn).toHaveTextContent(/show/i);
    expect(passwordElement).toHaveAttribute("type", "password");
  });

  it("should display required field error if empty fields submit", async () => {
    const user = userEvent.setup();
    // render app
    render(<LoginForm />);
    // find elements
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginBtn = screen.getByRole("button", { name: /log in/i });
    const noErrorTexts = screen.queryAllByRole("alert");
    // check initial conditions
    expect(emailInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
    expect(noErrorTexts).toHaveLength(0);
    // after clicking the btn while fields are empty, required text should be triggered
    await user.click(loginBtn);
    const errorTexts = screen.getAllByRole("alert");
    expect(errorTexts).toHaveLength(2);
    errorTexts.forEach((error) =>
      expect(error).toHaveTextContent(/is required/i),
    );
    // ASSERT
  });

  it("should not route and throw error when button is clicked and credentials are wrong", async () => {
    server.resetHandlers(
      http.get(AUTH_API_URL, () => {
        return HttpResponse.json([
          {
            email: "wrong@gmail.com",
            password: "wrongPassword",
          },
        ]);
      }),
    );
    render(<LoginForm />);
    expect(loginMock).not.toHaveBeenCalled();
  });

  it("should route to dashboard when button is clicked and fields are filled", async () => {
    const user = userEvent.setup();
    // ARRANGE
    render(<LoginForm />);
    // ACT
    const emailElement = screen.getByLabelText(/email/i);
    const passwordElement = screen.getByLabelText(/password/i);

    await user.clear(emailElement);
    await user.clear(passwordElement);

    await user.type(emailElement, "example@gmail.com");
    await user.type(passwordElement, "12345678");

    await user.click(screen.getByRole("button", { name: /log in/i }));

    expect(loginMock).toHaveBeenCalledWith(
      {
        email: "example@gmail.com",
        password: "12345678",
      },
      expect.objectContaining({
        onSuccess: expect.any(Function),
      }),
    );
  });
});
