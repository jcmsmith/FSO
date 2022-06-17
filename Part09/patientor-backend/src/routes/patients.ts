import express from "express";

import service from "../services/patientsService";
import { Patient } from "../types";
import { convertToNewPatient, getErrorMessage } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  const data = service.getAllPatients();
  console.log("data:", data);

  res.status(200).json(data);
});

router.get(`/:id`, (req, res) => {
  try {
    const patient = service.getPatientById(req.params.id);
    console.log(patient);

    res.status(200).json(patient);
  } catch (e: unknown) {
    res.status(404).send(getErrorMessage(e));
  }
});

router.post("/", (req, res) => {
  try {
    const newPatient = convertToNewPatient(req.body);
    const addedPatient = service.addPatient(newPatient);
    res.status(200).json(addedPatient);
  } catch (e: unknown) {
    res.status(400).send(getErrorMessage(e));
  }
});

router.post(`/:id/entries`, (req, res) => {
  try {
    const newEntry: Patient = service.addEntry(req.params.id, req.body);
    console.log(newEntry);

    res.status(201).json(newEntry);
  } catch (e: unknown) {
    res.status(400).send(getErrorMessage(e));
  }
});

export default router;
