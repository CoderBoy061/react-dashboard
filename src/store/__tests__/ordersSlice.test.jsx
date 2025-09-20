import reducer, {
  setQuery,
  toggleStatus,
  setPage,
  toggleSortDir,
} from "../ordersSlice";

describe("ordersSlice", () => {
  const initial = { query: "", status: [], page: 1, sortDir: "desc" };

  it("should return initial state for unknown action", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual(initial);
  });

  it("setQuery sets query and resets page", () => {
    const state = { ...initial, page: 3 };
    const next = reducer(state, setQuery("foo"));
    expect(next.query).toBe("foo");
    expect(next.page).toBe(1);
  });

  it("toggleStatus adds a status when absent and resets page", () => {
    const next = reducer(initial, toggleStatus("Pending"));
    expect(next.status).toEqual(["Pending"]);
    expect(next.page).toBe(1);
  });

  it("toggleStatus removes a status when present and resets page", () => {
    const state = { ...initial, status: ["Pending"], page: 2 };
    const next = reducer(state, toggleStatus("Pending"));
    expect(next.status).toEqual([]);
    expect(next.page).toBe(1);
  });

  it("setPage sets current page", () => {
    const next = reducer(initial, setPage(5));
    expect(next.page).toBe(5);
  });

  it("toggleSortDir toggles between desc and asc", () => {
    const s1 = reducer(initial, toggleSortDir());
    expect(s1.sortDir).toBe("asc");
    const s2 = reducer(s1, toggleSortDir());
    expect(s2.sortDir).toBe("desc");
  });
});
