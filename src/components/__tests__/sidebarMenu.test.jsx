import { sidebarMenu } from "../../components/sidebarMenu";

describe("sidebarMenu data", () => {
  it("contains dashboards section with default item", () => {
    const dashboards = sidebarMenu.find((s) => s.key === "dashboards");
    expect(dashboards).toBeTruthy();
    const def = dashboards.items.find((i) => i.key === "default");
    expect(def).toEqual(expect.objectContaining({ label: "Default" }));
  });
});
