import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

import { useStateValue } from "../state";
import { setCurrentPatient } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient, isPatient, Gender } from "../types";

const PatientInfoPage = () => {
  const [{ currentPatient, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id || typeof id !== "string") {
      console.error("id not found!");
      return;
    }

    if (currentPatient.name === "none") {
      axios
        .get<Patient>(`${apiBaseUrl}/patients/${id}`)
        .then((response) => {
          const patient = response.data;
          if (isPatient(patient)) {
            dispatch(setCurrentPatient(patient));
          } else {
            console.error("Data recieved was not of type Patient!", patient);
            return <p>Something went wrong!</p>;
          }
        })
        .catch((e) => {
          if (axios.isAxiosError(e)) {
            console.error(e?.response?.data || "Unrecognized axios error");
          } else {
            console.error("Unknown error", e);
          }
        });
    }
  }, []);

  //console.log(currentPatient);

  if (currentPatient.name === "none") {
    return <p>loading...</p>;
  }

  const GenderIcon =
    currentPatient.gender === Gender.Other
      ? TransgenderIcon
      : currentPatient.gender === Gender.Female
      ? FemaleIcon
      : MaleIcon;

  return (
    <>
      <h2>
        {currentPatient.name}
        <GenderIcon />
      </h2>
      <p>ssn: {currentPatient.ssn}</p>
      <p>occupation: {currentPatient.occupation}</p>
      <h3>Entries:</h3>
      {currentPatient.entries[0] === undefined ? <p>No entries</p> : null}

      {currentPatient.entries.map((entry) => {
        return (
          <div key={entry.id}>
            <p>Entry id: {entry.id}</p>
            <p>Date: {entry.date}</p>
            <p>{entry.description}</p>
            {entry.diagnosisCodes?.map((code) => {
              const codeDiagnosis = diagnoses.find(
                (diagnosis) => diagnosis.code === code
              );

              return (
                <div key={code}>
                  <p>
                    {code}
                    {"  -  ["}
                    {codeDiagnosis?.name}
                    {"]  -  ["}
                    {codeDiagnosis?.latin}
                    {"]"}
                  </p>
                </div>
              );
            })}
            <p>--------------------------------</p>
          </div>
        );
      })}
    </>
  );
};

export default PatientInfoPage;
