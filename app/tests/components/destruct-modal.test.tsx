import { DestructModal } from "@/app/components/ui/destruct-modal";
import {
  logRoles,
  render,
  screen,
} from "@/app/test-utils/testing-library-utils";
import { userEvent } from "@testing-library/user-event";

const setOpenMock = vi.fn();
const destructFunctionMock = vi.fn();

describe("destruct modal", () => {
  //   modal should render only when open is true
  it("should not render modal when open is false", () => {
    render(
      <DestructModal
        open={false}
        setOpen={function (open: boolean): void {
          throw new Error("Function not implemented.");
        }}
        action={""}
        destructFunction={function (): void {
          throw new Error("Function not implemented.");
        }}
        isPending={false}
      />,
    );
    const modal = screen.queryByRole("dialog");
    expect(modal).not.toBeInTheDocument();
  });
  // should not render modal when open is false
  it("should render modal when open is true and render accurate elements", () => {
    const { container } = render(
      <DestructModal
        open={true}
        setOpen={setOpenMock}
        action={"Blacklist User"}
        destructFunction={destructFunctionMock}
        isPending={false}
      />,
    );
    const modal = screen.getByRole("dialog");
    const actionBtn = screen.getByRole("button", { name: /blacklist/i });
    const cancelBtn = screen.getByRole("button", { name: /cancel/i });
    const action = screen.getByText("Blacklist User");
    expect(modal).toBeInTheDocument();
    expect(action).toBeInTheDocument();
    expect(actionBtn).toBeInTheDocument();
    expect(cancelBtn).toBeInTheDocument();
    logRoles(container);
  });
  // should show blacklist btn for blacklist action
  it("should show blacklist btn for blacklist action", () => {
    const { container } = render(
      <DestructModal
        open={true}
        setOpen={setOpenMock}
        action={"Blacklist User"}
        destructFunction={destructFunctionMock}
        isPending={false}
      />,
    );
    const actionBtn = screen.getByRole("button", { name: /blacklist/i });
    const wrongBtn = screen.queryByRole("button", { name: /activate/i });
    const action = screen.getByText("Blacklist User");

    expect(action).toBeInTheDocument();
    expect(actionBtn).toBeInTheDocument();
    expect(wrongBtn).not.toBeInTheDocument();
    logRoles(container);
  });
  //   should show activate btn for activate action
  it("should show activate btn for activate action", () => {
    const { container } = render(
      <DestructModal
        open={true}
        setOpen={setOpenMock}
        action={"Activate User"}
        destructFunction={destructFunctionMock}
        isPending={false}
      />,
    );
    const actionBtn = screen.getByRole("button", { name: /Activate/i });
    const wrongBtn = screen.queryByRole("button", { name: /blacklist/i });
    const action = screen.getByText("Activate User");

    expect(action).toBeInTheDocument();
    expect(actionBtn).toBeInTheDocument();
    expect(wrongBtn).not.toBeInTheDocument();
    logRoles(container);
  });
  // cancel should close modal
  it("should close modal onclick of the cancel btn", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <DestructModal
        open={true}
        setOpen={setOpenMock}
        action={"Activate User"}
        destructFunction={destructFunctionMock}
        isPending={false}
      />,
    );
    const cancelBtn = screen.getByRole("button", { name: /cancel/i });
    // click btn
    await user.click(cancelBtn);
    // assert
    expect(setOpenMock).toHaveBeenCalledWith(false);
    logRoles(container);
  });
  // proceed should close modal but also trigger destruct fxn
  it("should close modal onclick of the cancel btn", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <DestructModal
        open={true}
        setOpen={setOpenMock}
        action={"Activate User"}
        destructFunction={destructFunctionMock}
        isPending={false}
      />,
    );
    const proceedBtn = screen.getByRole("button", { name: /activate/i });
    // click btn
    await user.click(proceedBtn);
    // assert
    expect(setOpenMock).toHaveBeenCalledWith(false);
    expect(destructFunctionMock).toHaveBeenCalled();
    logRoles(container);
  });
});
