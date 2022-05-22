import { v1 as uuid } from "uuid";

import type { Patient, NewPatient, PublicPatient, Entry } from "../types";
import patientsData from "../../data/patients";
import { parseEntry, parseStringData } from "../utils";

const getAllPatients = (): PublicPatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id: unknown): Patient => {
  const patientId = parseStringData(id);
  const patient = patientsData.find((patient) => patient.id === patientId);

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

const addEntry = (id: unknown, data: unknown): Patient => {
  const patientId = parseStringData(id);
  const entry = parseEntry(data);
  const newEntry: Entry = { ...entry, id: uuid() };

  let patientFound = false;
  let newPatient: unknown;

  patientsData.forEach((patient) => {
    if (patient.id === patientId) {
      patientFound = true;
      patient.entries.push(newEntry);
      newPatient = patient;
    }
  });

  if (!patientFound) {
    throw new Error("Patient not found!");
  }

  return newPatient as Patient;
};

export default {
  getAllPatients,
  addPatient,
  getPatientById,
  addEntry,
};
