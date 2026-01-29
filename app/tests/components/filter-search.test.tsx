import { FilterSearch } from "@/app/components/ui/filter-search";
import {
  logRoles,
  render,
  screen,
} from "@/app/test-utils/testing-library-utils";
import { userEvent } from "@testing-library/user-event";

const applyFilterMock = vi.fn();
const clearFilterMock = vi.fn();

vi.mock("@/app/hooks/useFilter", () => {
  return {
    default: () => ({
      applyFilter: applyFilterMock,
      clearFilter: clearFilterMock,
    }),
  };
});

describe("filter-search", () => {
  it("should render correct column name for textbox", async () => {
    const user = userEvent.setup();
    render(
      <FilterSearch
        columnDetails={{
          id: "username",
          name: "username",
          filterType: "text",
        }}
      />,
    );
    // find elements
    const openBtn = screen.getByRole("button", { name: /filter button/i });

    await user.click(openBtn);
    expect(openBtn).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("username")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();

    await user.click(openBtn);
    expect(openBtn).toHaveAttribute("aria-expanded", "false");
  });
  it("should render correct column name for select", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <FilterSearch
        columnDetails={{
          id: "username",
          name: "username",
          filterType: "select",
          selectOptions: [{ id: "value", value: "value", name: "value" }],
        }}
      />,
    );
    // find elements
    const openBtn = screen.getByRole("button", { name: /filter button/i });

    await user.click(openBtn);
    expect(openBtn).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("username")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    logRoles(container);
  });
  it("should render filter with accurate values on click", async () => {
    const user = userEvent.setup();

    render(
      <FilterSearch
        columnDetails={{
          id: "username",
          name: "username",
          filterType: "text",
        }}
      />,
    );

    // open popover
    await user.click(screen.getByRole("button", { name: /filter button/i }));

    // type into input
    const input = screen.getByRole("textbox", { name: /username/i });
    await user.type(input, "Vang Cash");

    // click filter
    await user.click(screen.getByRole("button", { name: /filter username/i }));

    // assert interaction
    expect(applyFilterMock).toHaveBeenCalledWith({
      key: "username",
      value: "Vang Cash",
    });
    expect(
      screen.getByRole("button", { name: /filter button/i }),
    ).toHaveAttribute("aria-expanded", "false");
  });
  it("should clear filter for column on click", async () => {
    const user = userEvent.setup();

    render(
      <FilterSearch
        columnDetails={{
          id: "username",
          name: "username",
          filterType: "text",
        }}
      />,
    );

    // open popover
    await user.click(screen.getByRole("button", { name: /filter button/i }));

    // type into input
    const input = screen.getByRole("textbox", { name: /username/i });
    await user.type(input, "Vang Cash");

    // click filter
    await user.click(screen.getByRole("button", { name: /reset username/i }));

    // assert interaction
    expect(clearFilterMock).toHaveBeenCalledWith("username");
  });
});
