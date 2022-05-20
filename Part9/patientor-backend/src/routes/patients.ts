/* eslint-disable */
import express from "express";

import service from "../services/patientsService";

const router = express.Router();

router.get("/", (_req, res) => {
  const data = service.getAllPatients();
  console.log(data);

  res.status(200).json(data);
});

router.post("/", (req, res) => {
  const { name, dateOfBirth, gender, ssn, occupation } = req.body;
  const newPatient = service.addPatient({
    name,
    dateOfBirth,
    gender,
    ssn,
    occupation,
  });
  res.status(200).json(newPatient);
});

export default router;
