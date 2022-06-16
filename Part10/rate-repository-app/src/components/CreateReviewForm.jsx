import { Button } from "react-native";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import * as yup from "yup";

import FormikTextInput from "./FormikTextInput";
import { CREATE_REVIEW } from "../graphql/mutations";

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .min(3, "Owner's name must be at least 3 characters in length")
    .required("Owner's name is required"),
  repositoryName: yup
    .string()
    .min(3, "Repo name must be at least 3 characters in length")
    .required("Repo name is required"),
  rating: yup
    .number()
    .max(100, "Rating must be between 0 and 100")
    .min(0, "Rating must be between 0 and 100")
    .integer("Rating must be an integer"),
  text: yup.string().optional(),
});

const CreateReviewForm = () => {
  const navigate = useNavigate();

  const [addReview] = useMutation(CREATE_REVIEW, {
    onError: (error) => {
      console.error("add review", error);
    },
  });

  const onSubmit = async (values) => {
    if (!values.rating) {
      console.log("No rating submitted");
      return;
    }

    const review = {
      review: {
        ownerName: values.ownerName,
        repositoryName: values.repositoryName,
        rating: parseInt(values.rating),
        text: values.text,
      },
    };

    const data = await addReview({ variables: review });
    const id = data.data.createReview.repositoryId;
    console.log("id", data);
    navigate(`/repositories/${id}`);
  };

  return (
    <Formik
      initialValues={{
        ownerName: "",
        repositoryName: "",
        rating: "50",
        text: "",
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <>
          <FormikTextInput
            name="ownerName"
            placeholder="owner's name"
            onChangeText={handleChange("ownerName")}
            onBlur={handleBlur("ownerName")}
            value={values.ownerName}
          />
          <FormikTextInput
            name="repositoryName"
            placeholder="repository name"
            onChangeText={handleChange("repositoryName")}
            onBlur={handleBlur("repositoryName")}
            value={values.repositoryName}
          />
          <FormikTextInput
            name="rating"
            placeholder="rating"
            onChangeText={handleChange("rating")}
            onBlur={handleBlur("rating")}
            value={values.rating}
          />
          <FormikTextInput
            name="text"
            placeholder="text"
            onChangeText={handleChange("text")}
            onBlur={handleBlur("text")}
            value={values.text}
            multiline
          />
          <Button onPress={handleSubmit} title="submit" />
        </>
      )}
    </Formik>
  );
};

export default CreateReviewForm;
