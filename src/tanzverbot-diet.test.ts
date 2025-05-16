import { calcDateOnDiet, Sex } from "./tanzverbot-diet";

test("Tanzverbot Diet", () => {
  expect(calcDateOnDiet(70, 75, 1.80, 30, Sex.Male)).toBeGreaterThan(0);
});

test("Test 2", () => {
  expect(calcDateOnDiet(60, 65, 1.65, 28, Sex.Female)).toBeGreaterThan(0);
});

test("Test 3", () => {
  expect(calcDateOnDiet(80, 80, 1.75, 40, Sex.Male)).toBe(0);
});

test("Test 4", () => {
  expect(calcDateOnDiet(0, 1000, 3, 1000, Sex.Female)).toBeGreaterThan(0);
});

test("Test 5)", () => {
  expect(calcDateOnDiet(700, 800, 1.60, 40, Sex.Male)).toBe(0);
});

test("Test 6", () => {
  expect(() => calcDateOnDiet(-10, 0, 1.75, 30, Sex.Female))
    .toThrow("Gewichte müssen >= 0 sein");
});