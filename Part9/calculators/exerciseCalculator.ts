interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  dailyHours: Array<number>,
  targetHours: number
): Result => {
  const periodLength = dailyHours.length;

  const trainingDays = dailyHours.reduce((previousValue, currentValue) => {
    if (currentValue > 0) {
      return previousValue + 1;
    }
    return previousValue;
  }, 0);

  const sum: number = dailyHours.reduce(
    (previousValue, currentValue) => (previousValue += currentValue),
    0
  );

  const average = sum / periodLength;

  const success = average >= targetHours;

  const rating = !success ? 1 : average > targetHours * 1.5 ? 3 : 2;

  let ratingDescription;

  switch (rating) {
    case 1:
      ratingDescription =
        "You failed to meet your goal for average daily hours :(";
      break;
    case 2:
      ratingDescription = "You reached your goal! Good job!";
      break;
    case 3:
      ratingDescription = "You smashed your goal! Amazing!";
      break;
    default:
      throw new Error("rating was not a value from 1-3");
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetHours,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
