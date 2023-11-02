export const diceFacesCalculator = (
  dice1: number,
  dice2: number,
  dice3: number
): number => {
  // Check if any of the dice values are out of range.
  if (![dice1, dice2, dice3].every((value) => value >= 1 && value <= 6)) {
    throw new Error("Dice out of number range");
  }

  // Check if all three dice are the same.
  if (dice1 === dice2 && dice2 === dice3) {
    return dice1 * 3;
  }

  // Check if two of the dice are the same.
  if (dice1 === dice2 || dice1 === dice3) return dice1 * 2;

  if (dice2 === dice3) return dice2 * 2;

  // If no two dice are equal, return the largest number.
  return Math.max(dice1, dice2, dice3);
};