import type { BmiParams, ErrorMessage } from "./types";

const parseBmiArguments = (args: Array<string>): BmiParams => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (height <= 0 || weight <= 0) {
    throw new Error("Height and weight values must be greater than zero!");
  }

  if (height >= 1000 || weight >= 1000) {
    throw new Error("Height and weight values are too large!");
  }

  if (!isNaN(height) && !isNaN(weight)) {
    return {
      height,
      weight,
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (
  height: number,
  weight: number
): string | ErrorMessage => {
  let errorMessage: string = "";

  if (isNaN(height) || isNaN(weight)) {
    errorMessage = "Invalid values provided for height and/or weight!";
  }

  if (height <= 0 || weight <= 0) {
    errorMessage = "Height and/or weight values must be greater than zero!";
  }

  if (height >= 1000 || weight >= 1000) {
    errorMessage = "Height and/or weight values are too large!";
  }

  if (errorMessage !== "") {
    return {
      error: errorMessage,
    };
  }

  const meters: number = height / 100;
  const m2: number = meters ** 2;
  const bmi: number = weight / m2;

  const underweight: boolean = bmi < 18.5;
  const ideal: boolean = bmi >= 18.5 && bmi <= 25;
  const overweight: boolean = bmi > 25 && bmi < 30;
  const obese: boolean = bmi >= 30;

  let result: string = "Something went wrong";

  if (ideal) {
    result = "Ideal (healthy weight)";
  }
  if (underweight) {
    result = "Underweight!";
  }
  if (overweight) {
    result = "Overweight!";
  }
  if (obese) {
    result = "Obese!!";
  }

  return result;
};

const getBmiFromCL = (args: Array<string>): string => {
  let result: string = "If you see this message, something isn't right!";

  try {
    const { height, weight } = parseBmiArguments(args);
    result = "Your result:" + calculateBmi(height, weight);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong!";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  } finally {
    return result;
  }
};

export default getBmiFromCL;

// console.log(calculateBmi(180, 74));
// console.log(calculateBmi(150, 60));
// console.log(calculateBmi(100, 300));
// console.log(calculateBmi(500, 50));
