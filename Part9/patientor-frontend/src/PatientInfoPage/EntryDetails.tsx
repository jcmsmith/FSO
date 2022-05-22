import { FC } from "react";
import Box from "@mui/material/Box";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import WorkIcon from "@mui/icons-material/Work";
import { blue, indigo, red, yellow, green } from "@mui/material/colors";

import { useStateValue } from "../state";
import {
  Entry,
  HospitalEntry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HealthCheckRating,
} from "../types";
import { assertNever } from "../utils";

const EntryDetails = (entry: Entry) => {
  const [{ diagnoses }] = useStateValue();
  const sx = {
    width: 500,
    height: 200,
    backgroundColor: blue[50],
    "&:hover": {
      backgroundColor: indigo[50],
      opacity: [0.9, 0.8, 0.7],
    },
    display: "block",
    border: 1,
    borderRadius: 5,
    alignItems: "center",
    overflow: "auto",
  };

  const mapCodes = () => {
    return entry.diagnosisCodes?.map((code) => {
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
    });
  };

  switch (entry.type) {
    case "Hospital":
      return (
        <Box sx={sx}>
          <Hospital entry={entry} mapCodes={mapCodes} />
        </Box>
      );
    case "HealthCheck":
      return (
        <Box sx={sx}>
          <Health entry={entry} mapCodes={mapCodes} />
        </Box>
      );
    case "OccupationalHealthcare":
      return (
        <Box sx={sx}>
          <Occupational entry={entry} mapCodes={mapCodes} />
        </Box>
      );
    default:
      return assertNever(entry);
  }
};

interface EntryProps {
  entry: Entry;
  mapCodes: () => any;
}

const Hospital: FC<EntryProps> = (props) => {
  // What an absolutely ridiculous workaround to have to use just to get TS to believe it's the right type,
  // even though it says it is when calling <HealthEntry> in the switch statement...
  // If I don't do this, it INSISTS that this one is an OccupationalHealthcareEntry, Occupational is health, and health is hospital
  const entry = props.entry as HospitalEntry;

  return (
    <div>
      <p>
        {entry.date} <LocalHospitalIcon />
      </p>
      <p>{entry.description}</p>
      <p>Diagnosis by: {entry.specialist}</p>
      <p>Discharge date: {entry.discharge.date}</p>
      <p>Discharge criteria: {entry.discharge.criteria}</p>
      {props.mapCodes()}
    </div>
  );
};

const Occupational: FC<EntryProps> = (props) => {
  const entry = props.entry as OccupationalHealthcareEntry;
  return (
    <div>
      <p>
        {entry.date} <WorkIcon />
      </p>
      <p>Employer: {entry.employerName}</p>
      <p>{entry.description}</p>
      <p>Diagnosis by: {entry.specialist}</p>
      {props.mapCodes()}
    </div>
  );
};

const Health: FC<EntryProps> = (props) => {
  const entry = props.entry as HealthCheckEntry;
  const rating = entry.healthCheckRating;
  const sx =
    rating === HealthCheckRating.Healthy
      ? { color: blue[500] }
      : rating === HealthCheckRating.LowRisk
      ? { color: green[400] }
      : rating === HealthCheckRating.HighRisk
      ? { color: yellow[200] }
      : { color: red[200] };

  return (
    <div>
      <p>
        {entry.date} <MedicalInformationIcon />
      </p>
      <p>{entry.description}</p>
      <HealthAndSafetyIcon sx={sx} />
      <p>Diagnosis by: {entry.specialist}</p>
      {props.mapCodes()}
    </div>
  );
};

export default EntryDetails;
