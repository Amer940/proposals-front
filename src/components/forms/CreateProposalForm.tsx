"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { createProposalType, selectFieldType } from "@/types";
import { useState } from "react";
import CheckNoDataToast from "@/components/CheckNoDataToast";
import SuccessToast from "@/components/SuccessToast";
import CustomInput from "@/components/form-parts/CustomInput";
import CustomSelect from "@/components/form-parts/CustomSelect";
import { Button } from "@/components/ui/button";
import { createProposal } from "@/actions/proposals/create-proposal";

const validationSchema = Yup.object({
  demand: Yup.number().required("Demand amount is required"),
  agreed: Yup.number().required("Agreed amount is required"),
  partner_id: Yup.number().required("Partner is required"),
  status_id: Yup.number().required("Status is required"),
});

const CreateProposalForm = ({
  allPartners,
  allStatuses,
}: {
  allPartners: { success: boolean; message?: string; data?: selectFieldType[] };
  allStatuses: { success: boolean; message?: string; data?: selectFieldType[] };
}) => {
  const initialValues: createProposalType = {
    demand: null,
    agreed: null,
    partner: "",
    partner_id: null,
    status: "",
    status_id: null,
  };

  // State for success toast
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Error happened while getting data"
  );

  const handleSubmit = async (
    values: createProposalType,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (option: boolean) => void; resetForm: () => void }
  ) => {
    try {
      const res = await createProposal(values);

      if (res.success) {
        setShowSuccessToast(true);
        setSuccessMessage("Proposal created successfully!");
        resetForm();
      } else {
        setShowErrorToast(true);
        setErrorMessage("Failed to create proposal. Please try again.");
      }
    } catch (error) {
      console.log("Error submitting form:", error);
      setShowErrorToast(true);
      setErrorMessage("Failed to create proposal. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <CheckNoDataToast
        show={showErrorToast || !allPartners?.success || !allStatuses?.success}
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
                label="Demand price $"
                placeholder="100"
                name="demand"
                type="number"
              />
              <CustomInput
                label="Agreed price $"
                placeholder="70"
                name="agreed"
                type="number"
              />
              <CustomSelect
                options={allPartners?.data}
                label={"Select partner"}
                placeholder={"Partner"}
                name="partner_id"
                onChange={(option) => {
                  setFieldValue("partner", option.label);
                  setFieldValue("partner_id", option.value);
                }}
              />
              <CustomSelect
                options={allStatuses?.data}
                label={"Select status"}
                placeholder={"Status"}
                name="status_id"
                onChange={(option) => {
                  setFieldValue("status", option.label);
                  setFieldValue("status_id", option.value);
                }}
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

export default CreateProposalForm;
