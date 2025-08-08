"use client";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import {
  createProposalType,
  editProposalType,
  initialValuesProposal,
  selectFieldType,
} from "@/types";
import { useState } from "react";
import CheckNoDataToast from "../CheckNoDataToast";
import CustomSelect from "../form-parts/CustomSelect";
import CustomInput from "../form-parts/CustomInput";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { editProposal } from "@/actions/proposals/edit-proposal";

const validationSchema = Yup.object({
  demand: Yup.number().required("Demand amount is required"),
  agreed: Yup.number().required("Agreed amount is required"),
  partner_id: Yup.number().required("Partner is required"),
  status_id: Yup.number().required("Status is required"),
});

const EditProposalDialog = ({
  row,
  allStatuses,
  allPartners,
  success,
}: {
  row: initialValuesProposal;
  allStatuses: selectFieldType[];
  allPartners: selectFieldType[];
  success?: (message: string) => void;
}) => {
  const initialValues: editProposalType = {
    id: row.id ?? null,
    demand: row.demand ?? null,
    agreed: row.agreed ?? null,
    partner: row.partner?.name ?? "",
    partner_id: row.partner?.id ?? null,
    status: row.status?.name ?? "",
    status_id: row.status?.id ?? null,
  };

  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Error happened while getting data"
  );

  const handleSubmit = async (
    values: editProposalType,
    {
      setSubmitting,
    }: { setSubmitting: (option: boolean) => void; resetForm: () => void }
  ) => {
    try {
      const res = await editProposal(values);

      if (res.success) {
        success?.("Proposal updated successfully!");
      } else {
        setShowErrorToast(true);
        setErrorMessage("Failed to update proposal. Please try again.");
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
        show={showErrorToast}
        message={errorMessage}
        onClose={() => setShowErrorToast(false)}
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit of selected proposal</DialogTitle>
          <DialogDescription>
            This action cannot be undone once you submit.
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => {
            return (
              <Form className="flex flex-col gap-4 w-full">
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
                  options={allPartners}
                  label={"Select partner"}
                  placeholder={"Partner"}
                  name="partner_id"
                  onChange={(option) => {
                    setFieldValue("partner", option.label);
                    setFieldValue("partner_id", option.value);
                  }}
                />
                <CustomSelect
                  options={allStatuses}
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
      </DialogContent>
    </>
  );
};

export default EditProposalDialog;
