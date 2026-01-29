import { Icons } from "@/app/components/ui/icons";
import { UserBox } from "@/app/components/users/user-box";
import { render, screen } from "@/app/test-utils/testing-library-utils";

describe("user-box", () => {
  it("should render correct name and value", () => {
    render(
      <UserBox
        icon={<Icons.activeUsers />}
        name={"statusName"}
        value={5}
        color={""}
      />,
    );

    const name = screen.getByRole("heading", { name: "statusName" });
    const value = screen.getByText(5);
    expect(name).toBeInTheDocument();
    expect(value).toBeInTheDocument();
  });
});
