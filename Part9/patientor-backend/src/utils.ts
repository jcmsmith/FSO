import { NewPatient, Gender } from "./types";

type PatientFields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

const convertToNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: PatientFields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseStringData(name),
    dateOfBirth: parseStringData(dateOfBirth),
    ssn: parseStringData(ssn),
    gender: parseGender(gender),
    occupation: parseStringData(occupation),
  };

  return newPatient;
};

const parseStringData = (data: unknown): string => {
  if (!data || !isString(data)) {
    throw new Error(`Incorrect or missing data: ${data}`);
  }

  return data;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }

  return gender;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

export default convertToNewPatient;
