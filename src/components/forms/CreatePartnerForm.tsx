import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { Input } from "@/components/ui/input";

const CreatePartnerForm = () => {
  return (
    <>
      <Select
      // value={statusFilter}
      // onValueChange={(value) => {
      //   setStatusFilter(value);
      // }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Filter Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <DropdownMenuSeparator />
          <SelectItem value="1">Success</SelectItem>
          <SelectItem value="2">Denied</SelectItem>
          <SelectItem value="3">Sent</SelectItem>
          <SelectItem value="4">Ignored</SelectItem>
        </SelectContent>
      </Select>
      <Input
        placeholder="Filter emails..."
        // onChange={(event) => {
        //   setEmailFilter(event.target.value);
        // }}
        className="max-w-sm"
      />
    </>
  );
};

export default CreatePartnerForm;
