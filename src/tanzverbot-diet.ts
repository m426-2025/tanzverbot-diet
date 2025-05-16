export enum Sex {
  Male,
  Female,
}

export interface FoodLogEntry {
  caloriesPerPortion: number;
  portions: number;
}

// Tagesplan der Tanzverbot-Diät als kalorien- und portionsbasierte Liste
const DAILY_DIET: FoodLogEntry[] = [
  { caloriesPerPortion: 137, portions: 4 },   // Kellogg's Tresor
  { caloriesPerPortion: 64, portions: 8 },    // Weihenstephan Haltbare Milch
  { caloriesPerPortion: 271, portions: 4 },   // Mühle Frikadellen
  { caloriesPerPortion: 40, portions: 12 },   // Volvic Tee
  { caloriesPerPortion: 297, portions: 1 },   // Neuburger lockerer Sahnepudding
  { caloriesPerPortion: 125, portions: 6 },   // Lagnese Viennetta
  { caloriesPerPortion: 482, portions: 2 },   // Schöller 10ForTwo
  { caloriesPerPortion: 835, portions: 2 },   // Ristorante Pizza Salame
  { caloriesPerPortion: 37, portions: 25 },   // Schweppes Ginger Ale
  { caloriesPerPortion: 59, portions: 20 },   // Mini Babybel
];

// Kalorien, die für 1 kg Fettzunahme benötigt werden
const CALORIES_PER_KG = 9000;

// Validierung der Gewichtsangaben
function validateWeights(startWeight: number, targetWeight: number) {
  if (startWeight < 0 || targetWeight < 0) {
    throw new Error("Gewichte müssen >= 0 sein");
  }
  if (targetWeight < startWeight) {
    throw new Error("Zielgewicht darf nicht unter Startgewicht liegen");
  }
}

// Grundumsatz-Formeln getrennt nach Geschlecht
function bmrMale(weight: number, heightCm: number, age: number): number {
  return 66.47 + 13.7 * weight + 5.003 * heightCm - 6.75 * age;
}

function bmrFemale(weight: number, heightCm: number, age: number): number {
  return 655.1 + 9.563 * weight + 1.85 * heightCm - 4.676 * age;
}

// Berechnet die insgesamt aufgenommene Kalorienanzahl für gegebene Einträge
export function calculateTotalCalories(foodLog: FoodLogEntry[]): number {
  return foodLog.reduce(
    (sum, entry) => sum + entry.caloriesPerPortion * entry.portions,
    0
  );
}

/**
 * Berechnet die Anzahl Tage, die man sich an die Tanzverbot-Diät halten muss,
 * um von startWeight auf targetWeight zu kommen.
 * @param startWeight in kg
 * @param targetWeight in kg
 * @param heightInMeters in m
 * @param age in Jahren
 * @param sex Geschlecht (Sex.Male | Sex.Female)
 * @returns Tage (aufgerundet) oder 0, wenn kein Kalorienüberschuss
 */
export function calcDateOnDiet(
  startWeight: number,
  targetWeight: number,
  heightInMeters: number,
  age: number,
  sex: Sex
): number {
  validateWeights(startWeight, targetWeight);

  // Kalorienzufuhr pro Tag aus der Tanzverbot-Diät-Tabelle
  const totalCaloriesToday = calculateTotalCalories(DAILY_DIET);

  // Höhe in cm für die BMR-Formel
  const heightInCm = heightInMeters * 100;

  // Grundumsatz berechnen
  const bmr =
    sex === Sex.Male
      ? bmrMale(startWeight, heightInCm, age)
      : bmrFemale(startWeight, heightInCm, age);

  // Täglicher Kalorienüberschuss
  const dailySurplus = totalCaloriesToday - bmr;
  if (dailySurplus <= 0) {
    return 0;
  }

  // Gesamtkalorien, die für die gewünschte Gewichtszunahme nötig sind
  const totalCaloriesNeeded = (targetWeight - startWeight) * CALORIES_PER_KG;

  // Anzahl Tage (aufgerundet)
  const daysNeeded = Math.ceil(totalCaloriesNeeded / dailySurplus);

  return daysNeeded;
}
