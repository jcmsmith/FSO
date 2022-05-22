import { Diagnosis, Patient } from "./types";

export const isPatient = (param: unknown): param is Patient => {
  if (typeof param === "object" && param !== null) {
    return (
      "id" in param &&
      "name" in param &&
      "occupation" in param &&
      "gender" in param
    );
  } else {
    return false;
  }
};

export const isDiagnosis = (param: unknown): param is Diagnosis => {
  if (typeof param === "object" && param !== null) {
    return "code" in param && "name" in param;
  } else {
    return false;
  }
};

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
