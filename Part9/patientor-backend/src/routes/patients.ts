import express from "express";

import service from "../services/patientsService";
import convertToNewPatient from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  const data = service.getAllPatients();
  console.log(data);

  res.status(200).json(data);
});

router.post("/", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = convertToNewPatient(req.body);
    const addedPatient = service.addPatient(newPatient);
    res.status(200).json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
