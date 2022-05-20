/* eslint-disable */
import { v1 as uuid } from "uuid";

import type { Patient, NewPatient } from "../types";
import patientsData from "../../data/patients";

const getAllPatients = (): Omit<Patient, "ssn">[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
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
};
