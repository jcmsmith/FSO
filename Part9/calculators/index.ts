import express from "express";
const app = express();

import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

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

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line
  const target: number = req.body.target;

  // eslint-disable-next-line
  const daily_exercises: Array<number> = req.body.daily_exercises;

  if (!target || !daily_exercises) {
    res.status(400).json({ error: "parameters missing" });
  }

  if (
    isNaN(target) ||
    !isFinite(target) ||
    !(daily_exercises instanceof Array)
  ) {
    res.status(400).json({ error: "malformed parameters" });
  }

  daily_exercises.forEach((hours) => {
    if (isNaN(Number(hours)) || !isFinite(Number(hours))) {
      res.status(400).json({ error: "malformed parameters" });
    }
  });

  const result = calculateExercises(target, daily_exercises);

  res.status(200).json(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
