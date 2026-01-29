// import '@testing-library/jest-dom/vitest'
import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual<any>("next/navigation");

  return {
    ...actual,
    usePathname: () => "/users",
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      refresh: vi.fn(),
    }),
    useSearchParams: () => new URLSearchParams("page=1"),
  };
});

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver as any;

// beforeEach(() => {
//   pushMock.mockReset();
// });
