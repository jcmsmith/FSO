import React from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container } from "@material-ui/core";

import { apiBaseUrl } from "./constants";
import {
  useStateValue,
  setPatientList,
  setCurrentPatient,
  blankPatient,
} from "./state";
import { Patient } from "./types";

import PatientListPage from "./PatientListPage";
import { Typography } from "@material-ui/core";

import PatientInfoPage from "./PatientInfoPage/PatientInfoPage";

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);

  const isHomepage = useMatch(`/`);

  React.useEffect(() => {
    if (!isHomepage) {
      return;
    }

    dispatch(setCurrentPatient(blankPatient));
  }, [isHomepage]);

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route path={`/patients/:id`} element={<PatientInfoPage />} />
          <Route path="/" element={<PatientListPage />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
