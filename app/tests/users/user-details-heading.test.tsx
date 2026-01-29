import { UserDetailsHeading } from "@/app/components/users/user-details-heading";
import {
  logRoles,
  render,
  screen,
} from "@/app/test-utils/testing-library-utils";
import { userEvent } from "@testing-library/user-event";

describe("user-details heading", () => {
  it("should render header and button elements correctly", () => {
    const { container } = render(
      <UserDetailsHeading
        id={"69750c5ac3a39646f401e526"}
        status={"Active"}
        username={"Jane Doe"}
      />,
    );
    logRoles(container);
    const heading = screen.getByRole("heading", { name: /user details/i });
    const updateStatusBtn = screen.getByRole("button", {
      name: /blacklist user/i,
    });
    const otherStatusBtn = screen.queryByRole("button", {
      name: /Activate user/i,
    });
    expect(heading).toBeInTheDocument();
    expect(updateStatusBtn).toBeInTheDocument();
    expect(otherStatusBtn).not.toBeInTheDocument();
  });

  it("should update status btn should open modal ", async () => {
    const user = userEvent.setup();
    render(
      <UserDetailsHeading
        id={"69750c5ac3a39646f401e526"}
        status={"Active"}
        username={"Jane Doe"}
      />,
    );
    const updateStatusBtn = screen.getByRole("button", {
      name: /blacklist user/i,
    });
    await user.click(updateStatusBtn);

    expect(
      screen.getByRole("button", { name: /blacklist/i }),
    ).toBeInTheDocument();
  });
});
