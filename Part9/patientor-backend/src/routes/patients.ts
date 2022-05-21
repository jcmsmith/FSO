import express from "express";

import service from "../services/patientsService";
import {
  convertToNewPatient,
  getErrorMessage,
  parseStringData,
} from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  const data = service.getAllPatients();
  console.log("data:", data);

  res.status(200).json(data);
});

router.get(`/:id`, (req, res) => {
  const id = parseStringData(req.params.id);

  try {
    const patient = service.getPatientById(id);
    res.status(200).json(patient);
  } catch (e: unknown) {
    res.status(404).send(getErrorMessage(e));
  }
});

router.post("/", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = convertToNewPatient(req.body);
    const addedPatient = service.addPatient(newPatient);
    res.status(200).json(addedPatient);
  } catch (e: unknown) {
    res.status(400).send(getErrorMessage(e));
  }
});

export default router;
