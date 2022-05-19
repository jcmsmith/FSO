import type { Patient } from "../types";
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

const addPatient = () => {
  return null;
};

export default {
  getAllPatients,
  addPatient,
};
