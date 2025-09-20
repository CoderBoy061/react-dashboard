import React from "react";
import { render } from "@testing-library/react";
import { renderSidebarIcon } from "../../components/sidebarIcons";
import {
  breadcrumbIcon,
  changeThemeIcon,
  historyIcon,
  IconBellPanel,
  IconPanel,
  starIcon,
} from "../../components/headerIcons";

describe("Icons", () => {
  it("renderSidebarIcon returns svg for known names and null for unknown", () => {
    const { container: c1 } = render(renderSidebarIcon("grid"));
    expect(c1.querySelector("svg")).toBeTruthy();
    const { container: c2 } = render(renderSidebarIcon("unknown"));
    expect(c2.firstChild).toBeNull();
  });

  it("header icons render svgs", () => {
    const icons = [
      breadcrumbIcon(),
      changeThemeIcon(),
      historyIcon(),
      IconBellPanel(),
      IconPanel(),
      starIcon(),
    ];
    icons.forEach((el) => {
      const { container } = render(el);
      expect(container.querySelector("svg")).toBeTruthy();
    });
  });
});
