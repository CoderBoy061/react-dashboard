import { statusToClass, ORDERS } from "../../orders/mockData";

describe("mockData helpers", () => {
  it("statusToClass maps known statuses and defaults to pending", () => {
    expect(statusToClass("In Progress")).toBe("progress");
    expect(statusToClass("Pending")).toBe("pending");
    expect(statusToClass("Approved")).toBe("approved");
    expect(statusToClass("Rejected")).toBe("rejected");
    expect(statusToClass("Complete")).toBe("complete");
    expect(statusToClass("Unknown")).toBe("pending");
  });

  it("ORDERS contains expected fields", () => {
    expect(Array.isArray(ORDERS)).toBe(true);
    expect(ORDERS[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        user: expect.any(String),
        status: expect.any(String),
      })
    );
  });
});
