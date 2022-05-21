import { v1 as uuid } from "uuid";

import type { Patient, NewPatient, PublicPatient } from "../types";
import patientsData from "../../data/patients";

const getAllPatients = (): PublicPatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id: string): PublicPatient => {
  const patient = patientsData.find((patient) => patient.id === id);

  if (patient) {
    return patient;
  } else {
    throw new Error("Patient not found!");
  }
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getAllPatients,
  addPatient,
  getPatientById,
};
