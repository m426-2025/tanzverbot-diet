import { calcDateOnDiet, Sex } from "./tanzverbot-diet";

test("Tanzverbot Diet", () => {
  expect(calcDateOnDiet(70, 75, 1.80, 30, Sex.Male)).toBeGreaterThan(0);
});

test("Tanzverbot Diet", () => {
  expect(calcDateOnDiet(60, 65, 1.65, 28, Sex.Female)).toBeGreaterThan(0);
});

test("Tanzverbot Diet", () => {
  expect(calcDateOnDiet(80, 80, 1.75, 40, Sex.Male)).toBe(0);
});
