import { DataTable } from "@/app/components/ui/data-table";
import { userColumns } from "@/app/components/users/users-columns";
import {
  mockTableData,
  render,
  screen,
  within,
} from "@/app/test-utils/testing-library-utils";
import { userEvent } from "@testing-library/user-event";

describe("data-table rendering", () => {
  // account for empty table
  it("should render no results if table is empty ", async () => {
    render(<DataTable columns={[]} data={[]} />);
    const noResults = await screen.findByRole("row", { name: /no result/i });
    expect(noResults).toBeInTheDocument();
  });
  //   check for accurate display of table values
  it("should display accurately the table values ", () => {
    const expectedHeadings = [
      "organization",
      "username",
      "email",
      "phone Number",
      "date Joined",
      "status",
      "",
    ];
    // render
    render(<DataTable columns={userColumns} data={mockTableData} />);
    // find elements
    const tableHeadings = screen.getAllByRole("columnheader");
    const tableData = screen.getByRole("cell", {
      name: mockTableData[0].username,
    });

    // assertions
    tableHeadings.forEach((heading, index) => {
      expect(heading).toHaveTextContent(expectedHeadings[index]);
    });
    expect(tableData).toBeInTheDocument();
  });
});

describe("data-table pagination", () => {
  it("should not render pagination if table is empty ", async () => {
    render(<DataTable columns={[]} data={[]} />);
    const paginationFirstPage = screen.queryByRole("button", { name: "1" });
    expect(paginationFirstPage).not.toBeInTheDocument();
  });
  // check that pagination is in the dom
  it("should render pagination buttons based on total users", () => {
    // render
    render(<DataTable columns={userColumns} data={mockTableData} />);
    // find elements
    const paginationFirstPage = screen.getByRole("button", { name: "1" });
    const paginationSecondPage = screen.getByRole("button", { name: "2" });
    const paginationThirdPage = screen.queryByRole("button", { name: "3" });

    // assertions
    expect(paginationFirstPage).toBeInTheDocument();
    expect(paginationSecondPage).toBeInTheDocument();
    expect(paginationThirdPage).not.toBeInTheDocument();
  });
  // check that pagination shows the accurate no of items in the dom
  it("should show only users for the current page", () => {
    // render
    render(<DataTable columns={userColumns} data={mockTableData} />);
    // find elements
    const rowsIncludingHeading = screen.getAllByRole("row");
    // assertions
    expect(rowsIncludingHeading).toHaveLength(11);
  });
  // check that pagination disables back btn if it is at the beginning of the dom and disables next btn if it is at the end of the dom
  it("should disable back btn if it is at the beginning of the dom and disable next btn if at the end", async () => {
    const user = userEvent.setup();
    // render
    render(<DataTable columns={userColumns} data={mockTableData} />);
    // find elements
    const previousBtn = screen.getByRole("button", { name: /previous /i });
    const nextBtn = screen.getByRole("button", { name: /next /i });
    // assertions
    expect(previousBtn).toBeDisabled();
    expect(nextBtn).toBeEnabled();

    await user.click(nextBtn);
    expect(previousBtn).toBeEnabled();
    expect(nextBtn).toBeDisabled();
  });
});

describe("data-table menu", () => {
  //   check that clicking ellipse displays menu options
  it("should display menu box on click of the menu button and remove on second click", async () => {
    const user = userEvent.setup();
    // render
    render(<DataTable columns={userColumns} data={mockTableData} />);
    // find elements
    const menuBtn = screen.getAllByRole("button", { name: /menu button/i });
    //  confirm initial state
    expect(menuBtn[0]).toHaveAttribute("aria-expanded", "false");
    // assertions
    await user.click(menuBtn[0]);
    expect(menuBtn[0]).toHaveAttribute("aria-expanded", "true");

    // second click
    await user.click(menuBtn[0]);
    expect(menuBtn[0]).toHaveAttribute("aria-expanded", "false");
  });
});

describe("data-table filter", () => {
  //   check that clicking popover displays filter box
  it("should display popover on click of the filter button and remove on second click", async () => {
    const user = userEvent.setup();
    // render
    render(<DataTable columns={userColumns} data={mockTableData} />);
    // find elements
    const filterBtns = screen.getAllByRole("button", {
      name: /filter button/i,
    });
    //  confirm initial state
    expect(filterBtns[0]).toHaveAttribute("aria-expanded", "false");
    // assertions
    await user.click(filterBtns[0]);
    expect(filterBtns[0]).toHaveAttribute("aria-expanded", "true");
    // second click
    await user.click(filterBtns[0]);
    expect(filterBtns[0]).toHaveAttribute("aria-expanded", "false");
  });
});

describe("data-table limit-setter", () => {
  // check that limit setter is not rendered if table is empty
  it("should not render limit setter if table is empty ", async () => {
    render(<DataTable columns={[]} data={[]} />);
    const limitSetter = screen.queryByRole("combobox", { name: /Showing/i });
    expect(limitSetter).not.toBeInTheDocument();
  });
  //   check that limit setter is rendered and does not show numbers greater than the table count
  it("should render limit setter based on total users and does not show numbers greater than the total users", async () => {
    render(<DataTable columns={userColumns} data={mockTableData} />);
    const limitSetter = screen.getByRole("combobox", { name: /Showing/i });

    const options = within(limitSetter).getAllByRole(
      "option",
    ) as HTMLOptionElement[];
    options.forEach((option) => {
      expect(Number(option.value)).toBeLessThanOrEqual(mockTableData.length);
    });

    expect(limitSetter).toBeInTheDocument();
  });
  // check that limit setter displays the accurate no of items in the dom when selected
  it("should render accurate number of users according to limit setter", async () => {
    const user = userEvent.setup();
    render(<DataTable columns={userColumns} data={mockTableData} />);
    const limitSetter = screen.getByRole("combobox", { name: /Showing/i });

    const options = within(limitSetter).getAllByRole(
      "option",
    ) as HTMLOptionElement[];
    const firstOption = options[0].value;

    await user.selectOptions(limitSetter, firstOption);
    const rows = screen.getAllByRole("row");

    expect(rows.length - 1).toBeLessThanOrEqual(Number(firstOption));
  });
});
