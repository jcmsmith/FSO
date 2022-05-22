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
  const [{ currentPatient }, dispatch] = useStateValue();
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
    </>
  );
};

export default PatientInfoPage;
