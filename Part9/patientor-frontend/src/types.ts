export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
}

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
