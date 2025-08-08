"use client";

import CustomSelect from "../form-parts/CustomSelect";
import CustomInput from "../form-parts/CustomInput";
import SuccessToast from "../SuccessToast";
import CheckNoDataToast from "../CheckNoDataToast";
import { Button } from "../ui/button";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { createPartnerType, selectFieldType } from "@/types";
import { createPartner } from "@/actions/partner/create-partner";
import { useState } from "react";

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

const CreatePartnerForm = ({
  allCountries,
}: {
  //allCountries: selectFieldType[];
  allCountries: {
    success: boolean;
    message?: string;
    data?: selectFieldType[];
  };
}) => {
  const initialValues: createPartnerType = {
    name: "",
    email: "",
    country: "",
    country_id: null,
    city: "",
    description: "",
  };

  // State for success toast
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Error happened while getting proposals"
  );

  const handleSubmit = async (
    values: createPartnerType,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (option: boolean) => void; resetForm: () => void }
  ) => {
    try {
      const res = await createPartner(values);

      if (res.success) {
        setShowSuccessToast(true);
        setSuccessMessage("Partner created successfully!");
        resetForm();
      } else {
        setShowErrorToast(true);
        setErrorMessage("Failed to create partner. Please try again.");
      }
    } catch (error) {
      console.log("Error submitting form:", error);
      setShowErrorToast(true);
      setErrorMessage("Failed to create partner. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <CheckNoDataToast
        show={showErrorToast}
        message={errorMessage}
        onClose={() => setShowErrorToast(false)}
      />
      <SuccessToast
        show={showSuccessToast}
        message={successMessage}
        onClose={() => setShowSuccessToast(false)}
      />

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
                options={allCountries.data}
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
