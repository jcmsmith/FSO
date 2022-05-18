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

console.log(calculateBmi(180, 74));
console.log(calculateBmi(150, 60));
console.log(calculateBmi(100, 300));
console.log(calculateBmi(500, 50));
