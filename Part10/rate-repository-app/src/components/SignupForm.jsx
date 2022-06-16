import { Button } from "react-native";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import * as yup from "yup";

import useAuth from "../hooks/useAuth";
import FormikTextInput from "./FormikTextInput";
import { CREATE_USER } from "../graphql/mutations";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1)
    .max(30, "Username is too long")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password is too short")
    .max(50, "Password is too long")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Must match password")
    .required("Password confirmation is required"),
});

const SignupForm = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [signup] = useMutation(CREATE_USER, {
    onError: (error) => console.log("create user", error),
  });

  const onSubmit = async (values) => {
    const username = values.username;
    const password = values.password;

    const newUser = { user: { username, password } };
    await signup({ variables: newUser });
    await signIn(username, password);
    navigate("/repositories");
  };

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        confirmPassword: "",
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <>
          <FormikTextInput
            name="username"
            placeholder="username"
            onChangeText={handleChange("username")}
            onBlur={handleBlur("username")}
            value={values.username}
          />
          <FormikTextInput
            name="password"
            placeholder="password"
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            isSecure
          />
          <FormikTextInput
            name="confirmPassword"
            placeholder="confirmPassword"
            onChangeText={handleChange("confirmPassword")}
            onBlur={handleBlur("confirmPassword")}
            value={values.confirmPassword}
            isSecure
          />
          <Button onPress={handleSubmit} title="submit" />
        </>
      )}
    </Formik>
  );
};

export default SignupForm;
