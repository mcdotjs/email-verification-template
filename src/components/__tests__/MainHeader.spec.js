import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import MainHeader from "../MainHeader.vue";

describe("MainHeader", () => {
  it("renders-properly", () => {
    const wrapper = mount(MainHeader, {
      props: { header: "test header", subheading: "test subheading" },
    });
    expect(wrapper.text()).toContain("test header");
  });
});
