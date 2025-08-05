"use client";

import CustomSelect from "../form-parts/CustomSelect";
import CustomInput from "../form-parts/CustomInput";
import SuccessToast from "../SuccessToast";
import CheckNoDataToast from "../CheckNoDataToast";
import { Button } from "../ui/button";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { createPartnerType } from "@/types";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Partner name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  country_id: Yup.number().required("Country is required"),
  city: Yup.string()
    .min(2, "City must be at least 2 characters")
    .required("City is required"),
  description: Yup.string().optional(),
});

const CreatePartnerForm = () => {
  const initialValues: createPartnerType = {
    name: "",
    email: "",
    country: "",
    country_id: null,
    city: "",
    description: "",
  };

  const handleSubmit = async (
    values: createPartnerType,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (option: boolean) => void; resetForm: () => void }
  ) => {
    try {
      console.log("Form submitted with values:", values);

      // Here you would typically make an API call
      // const response = await fetch('/api/partners', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(values),
      // });

      // Show success message
      // setShowSuccessToast(true);
      // setSuccessMessage('Partner created successfully!');

      // Reset form after successful submission
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      // setShowErrorToast(true);
      // setErrorMessage('Failed to create partner. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* <CheckNoDataToast
        show={showErrorToast || error}
        message={errorMessage}
        onClose={() => setShowErrorToast(false)}
      />
      <SuccessToast
        show={showSuccessToast}
        message={successMessage}
        onClose={() => setShowSuccessToast(false)}
      /> */}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => {
          return (
            <Form className="flex flex-col gap-4 w-[35vw]">
              <CustomInput
                label="Name of the partner"
                placeholder="John Doe"
                name="name"
              />
              <CustomInput
                label="Email of the partner"
                placeholder="john@mail.com"
                name="email"
              />
              <CustomSelect
                options={[
                  { label: "Tset", value: 2 },
                  { label: "tt", value: 3 },
                ]}
                label={"Select country for partner"}
                placeholder={"Country"}
                name="country_id"
                onChange={(option) => {
                  setFieldValue("country", option.label);
                  setFieldValue("country_id", option.value);
                }}
              />
              <CustomInput
                label="City of the partner"
                placeholder="Los Angeles"
                name="city"
              />
              <CustomInput
                label="About the partner"
                placeholder="John Doe is..."
                name="description"
              />
              <Button type="submit" disabled={isSubmitting}>
                {" "}
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default CreatePartnerForm;
