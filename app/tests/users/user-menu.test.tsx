import { UserMenu } from "@/app/components/users/user-menu";
import {
  logRoles,
  render,
  screen,
} from "@/app/test-utils/testing-library-utils";
import { Organization, UserStatus } from "@/app/types/types";
import { userEvent } from "@testing-library/user-event";

const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

const userDetails = {
  _id: "69750c5ac3a39646f401e526",
  organization: "Lendsqr" as Organization,
  username: "Mcknight Horne",
  email: "mcknighthorne@farmage.com",
  phone: "+234 7885695818",
  date_joined: "2022-09-23T09:06:28-01:00",
  status: "Active" as UserStatus,
};

vi.mock("@/app/hooks/useUserDetails", () => ({
  useUserDetails: () => ({
    data: { name: userDetails.username, email: userDetails.email },
  }),
}));

describe("menu-box", () => {
  it("should render menu button", () => {
    // render
    const { container } = render(<UserMenu rowDetails={userDetails} />);

    // find related elements
    const menuBtn = screen.getByRole("button", { name: /menu button/i });
    expect(menuBtn).toHaveAttribute("aria-expanded", "false");
    logRoles(container);
  });

  it("should render menu box with accurate details for active users on click of button", async () => {
    const user = userEvent.setup();
    // render
    const { container } = render(
      <UserMenu
        rowDetails={{
          _id: "69750c5ac3a39646f401e526",
          organization: "Lendsqr",
          username: "Mcknight Horne",
          email: "mcknighthorne@farmage.com",
          phone: "+234 7885695818",
          date_joined: "2022-09-23T09:06:28-01:00",
          status: "Active",
        }}
      />,
    );

    // find related elements
    const menuBtn = screen.getByRole("button", { name: /menu button/i });
    expect(menuBtn).toHaveAttribute("aria-expanded", "false");
    await user.click(menuBtn);
    expect(menuBtn).toHaveAttribute("aria-expanded", "true");
    const blacklistBtn = screen.getByRole("menuitem", {
      name: /blacklist user/i,
    });
    const activateBtn = screen.queryByRole("menuitem", {
      name: /Activate user/i,
    });
    expect(activateBtn).not.toBeInTheDocument();
    expect(blacklistBtn).toBeInTheDocument();
    logRoles(container);
  });

  it("should render menu box with accurate details for blacklisted users on click of button", async () => {
    const user = userEvent.setup();
    // render
    const { container } = render(
      <UserMenu
        rowDetails={{
          _id: "69750c5ac3a39646f401e526",
          organization: "Lendsqr",
          username: "Mcknight Horne",
          email: "mcknighthorne@farmage.com",
          phone: "+234 7885695818",
          date_joined: "2022-09-23T09:06:28-01:00",
          status: "Blacklisted",
        }}
      />,
    );

    // find related elements
    const menuBtn = screen.getByRole("button", { name: /menu button/i });
    expect(menuBtn).toHaveAttribute("aria-expanded", "false");
    await user.click(menuBtn);
    expect(menuBtn).toHaveAttribute("aria-expanded", "true");
    const updateStatusBtn = screen.getByRole("menuitem", {
      name: /Activate user/i,
    });
    logRoles(container);
  });

  it("should route to user details page onclick of the button", async () => {
    const user = userEvent.setup();
    // render
    render(<UserMenu rowDetails={userDetails} />);

    // find related elements
    const menuBtn = screen.getByRole("button", { name: /menu button/i });
    expect(menuBtn).toHaveAttribute("aria-expanded", "false");
    await user.click(menuBtn);
    expect(menuBtn).toHaveAttribute("aria-expanded", "true");
    const routeToDetailsBtn = screen.getByRole("menuitem", {
      name: /view details/i,
    });
    await user.click(routeToDetailsBtn);

    expect(push).toHaveBeenCalledWith(`/customers/users/${userDetails._id}`);
  });

  it("should open modal when update user button is clicked", async () => {
    const user = userEvent.setup();
    // render
    render(
      <UserMenu
        rowDetails={{
          _id: "69750c5ac3a39646f401e526",
          organization: "Lendsqr",
          username: "Mcknight Horne",
          email: "mcknighthorne@farmage.com",
          phone: "+234 7885695818",
          date_joined: "2022-09-23T09:06:28-01:00",
          status: "Active",
        }}
      />,
    );

    // find related elements
    const menuBtn = screen.getByRole("button", { name: /menu button/i });
    expect(menuBtn).toHaveAttribute("aria-expanded", "false");
    await user.click(menuBtn);
    expect(menuBtn).toHaveAttribute("aria-expanded", "true");
    const updateStatusBtn = screen.getByRole("menuitem", {
      name: /Blacklist user/i,
    });
    await user.click(updateStatusBtn);

    expect(
      screen.getByRole("button", { name: /blacklist Mcknight Horne/i }),
    ).toBeInTheDocument();
  });
});
