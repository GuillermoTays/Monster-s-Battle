export const numbersFractionCalculator = (numbers: number[]) => {
  // Initialize counters for positive, negative, and zero values.
  let positiveCount = 0;
  let negativeCount = 0;
  let zeroCount = 0;

  // Loop through the array to count the numbers of each type.
  for (const num of numbers) {
    if (num > 0) {
      positiveCount++;
    } else if (num < 0) {
      negativeCount++;
    } else {
      zeroCount++;
    }
  }

  // Calculate the total count of numbers.
  const totalCount = numbers.length;

  // Calculate the fractions for each type.
  const positiveFraction = positiveCount / totalCount;
  const negativeFraction = negativeCount / totalCount;
  const zeroFraction = zeroCount / totalCount;

  // Return the fractions as an object with fixed decimal places.
  return {
    positives: positiveFraction.toFixed(6),
    negative: negativeFraction.toFixed(6),
    zeros: zeroFraction.toFixed(6),
  };
};
