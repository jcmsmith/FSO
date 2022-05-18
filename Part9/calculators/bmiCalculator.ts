interface BmiParams {
  height: number;
  weight: number;
}

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

const calculateBmi = (height: number, weight: number): string => {
  const meters: number = height / 100;
  const bmi: number = weight / meters ** 2;

  const underweight: boolean = bmi < 18.5;
  const ideal: boolean = bmi >= 18.5 && bmi <= 25;
  const overweight: boolean = bmi > 25 && bmi < 30;
  const obese: boolean = bmi > 30;

  if (ideal) {
    return "Ideal (healthy weight)";
  }
  if (underweight) {
    return "Underweight!";
  }
  if (overweight) {
    return "Overweight!";
  }
  if (obese) {
    return "Obese!!";
  }
};

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log("Your result:", calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something went wrong!";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

// console.log(calculateBmi(180, 74));
// console.log(calculateBmi(150, 60));
// console.log(calculateBmi(100, 300));
// console.log(calculateBmi(500, 50));
