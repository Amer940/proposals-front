"use client";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import {
  editPartnerType,
  initialValuesPartner,
  selectFieldType,
} from "@/types";
import { useState } from "react";
import CheckNoDataToast from "../CheckNoDataToast";
import CustomSelect from "../form-parts/CustomSelect";
import CustomInput from "../form-parts/CustomInput";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { editPartner } from "@/actions/partner/edit-partner";

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

const EditPartnerDialog = ({
  row,
  allCountries,
  success,
}: {
  row: initialValuesPartner;
  allCountries: selectFieldType[];
  success?: (message: string) => void;
}) => {
  const initialValues: editPartnerType = {
    id: row.id ?? null,
    name: row.name ?? "",
    email: row.email ?? "",
    country: row.country.name ?? "",
    country_id: row.country.id ?? null,
    city: row.city ?? "",
    description: row.description ?? "",
  };

  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Error happened while getting data"
  );

  const handleSubmit = async (
    values: editPartnerType,
    {
      setSubmitting,
    }: { setSubmitting: (option: boolean) => void; resetForm: () => void }
  ) => {
    try {
      const res = await editPartner(values);

      if (res.success) {
        success?.("Partner updated successfully!");
      } else {
        setShowErrorToast(true);
        setErrorMessage("Failed to update partner. Please try again.");
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit of selected partner</DialogTitle>
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
                  options={allCountries}
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
      </DialogContent>
    </>
  );
};

export default EditPartnerDialog;
