import express from "express";
const app = express();

import { calculateBmi } from "./bmiCalculator";

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height: number = Number(req.query.height);
  const weight: number = Number(req.query.weight);

  const bmi = calculateBmi(height, weight);

  if (typeof bmi !== "string") {
    return res.status(400).json(bmi);
  }

  const result = {
    weight,
    height,
    bmi,
  };

  return res.json(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
