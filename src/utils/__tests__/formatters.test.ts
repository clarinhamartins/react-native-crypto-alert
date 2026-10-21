import { formatChange, formatPrice } from "../index";

describe("formatPrice", () => {
  test("formats a typical price with two decimal places by default", () => {
    expect(formatPrice(67999.5)).toBe("67,999.50");
  });

  test("respects a custom decimals argument", () => {
    expect(formatPrice(0.1234, 4)).toBe("0.1234");
  });

  test("formats zero as a boundary value", () => {
    expect(formatPrice(0)).toBe("0.00");
  });

  test("formats a negative price", () => {
    expect(formatPrice(-15)).toBe("-15.00");
  });
});

describe("formatChange", () => {
  test("prefixes a positive change with a plus sign", () => {
    expect(formatChange(2.456)).toBe("+2.46%");
  });

  test("does not prefix a negative change with a plus sign", () => {
    expect(formatChange(-1.23)).toBe("-1.23%");
  });

  test("treats zero as positive, prefixing it with a plus sign", () => {
    expect(formatChange(0)).toBe("+0.00%");
  });

  test("rounds to two decimal places", () => {
    expect(formatChange(3.8949)).toBe("+3.89%");
  });
});
