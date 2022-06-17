import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Entry, HealthCheckEntry, HealthCheckRating } from "../types";
import { addEntry } from "../state/reducer";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { Field, FieldProps, Form, Formik } from "formik";
import { Button, Grid, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useState } from "react";

type EntryFormValues = Omit<HealthCheckEntry, "id">;

type HealthOption = {
  value: HealthCheckRating;
  label: string;
};

const healthOptions: HealthOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical" },
];

type HealthFieldProps = {
  name: string;
  label: string;
  options: HealthOption[];
};

const AddEntryForm = () => {
  const [{ diagnoses }, dispatch] = useStateValue();
  const [selectedDiagnosis, setDiagnosis] = useState<string[]>([]);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const onSubmit = async (values: EntryFormValues) => {
    const entry = { ...values, diagnosisCodes: selectedDiagnosis };

    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id as string}/entries`,
        entry
      );
      dispatch(addEntry(newEntry));
      navigate("/");
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
      }
    }
  };

  const onCancel = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div>
      {" "}
      <Formik
        initialValues={{
          description: "",
          date: "",
          specialist: "",
          healthCheckRating: HealthCheckRating.Healthy,
          type: "HealthCheck",
        }}
        onSubmit={onSubmit}
        validate={(values) => {
          const requiredError = "Field is required";
          const errors: { [field: string]: string } = {};
          if (!values.description) {
            errors.description = requiredError;
          }
          if (!values.date) {
            errors.date = requiredError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          return errors;
        }}
      >
        {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
          return (
            <Form className="form ui">
              <Field
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
              />
              <Field
                label="Date"
                placeholder="Date"
                name="date"
                component={TextField}
              />
              <Field
                label="Specialist"
                placeholder="Specialist"
                name="specialist"
                component={TextField}
              />
              <HealthSelectField
                label="Health Rating"
                name="healthCheckRating"
                options={healthOptions}
              />
              <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                setDiagnosis={setDiagnosis}
                diagnoses={Object.values(diagnoses)}
              />
              <Grid>
                <Grid item>
                  <Button
                    color="secondary"
                    variant="contained"
                    style={{ float: "left" }}
                    type="button"
                    onClick={(event) => onCancel(event)}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    style={{
                      float: "right",
                    }}
                    type="submit"
                    variant="contained"
                    disabled={!dirty || !isValid}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

const FormikSelect = ({ field, ...props }: FieldProps) => {
  return <Select {...field} {...props} />;
};

const HealthSelectField = ({ name, label, options }: HealthFieldProps) => {
  return (
    <>
      <InputLabel>{label}</InputLabel>
      <Field
        fullWidth
        style={{ marginBottom: "0.5em" }}
        label={label}
        component={FormikSelect}
        name={name}
      >
        {options.map((option) => {
          return (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          );
        })}
      </Field>
    </>
  );
};

export default AddEntryForm;
