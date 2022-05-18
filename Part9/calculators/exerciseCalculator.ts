interface ExerciseParams {
  targetHours: number;
  dailyHours: Array<number>;
}

const parseExerciseArguments = (args: Array<string>): ExerciseParams => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const targetHours = Number(args[2]);
  if (isNaN(targetHours) || !isFinite(targetHours) || targetHours <= 0) {
    throw new Error(`Invalid argument given for target hours: ${targetHours}`);
  }
  if (targetHours >= 8) {
    throw new Error("Come on dude, that's way too many hours per day!");
  }

  let dailyHours: Array<number> = [];

  args.forEach((element, index) => {
    if (index <= 2) {
      return;
    }

    const hours = Number(element);

    if (isNaN(hours) || !isFinite(hours)) {
      throw new Error(`Invalid argument given for daily hours: ${element}`);
    }
    if (hours < 0 || hours > 24) {
      throw new Error(`Daily hours must be between 0 and 24!`);
    }

    dailyHours.push(hours);
  });

  return {
    targetHours,
    dailyHours,
  };
};

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  targetHours: number,
  dailyHours: Array<number>
): ExerciseResult => {
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

try {
  const { targetHours, dailyHours } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(targetHours, dailyHours));
} catch (error: unknown) {
  let errorMessage = "Something went wrong!";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

//console.log(calculateExercises(2, [3, 0, 2, 4.5, 0, 3, 1]));
