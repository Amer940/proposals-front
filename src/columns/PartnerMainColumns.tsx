"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Payment } from "@/types";
import { deletePartner } from "@/actions/home/partner/delete-partner";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "country.name",
    header: "Country",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    id: "actions",
    cell: ({
      row,
      onSuccess,
      onError,
    }: {
      row: any;
      onSuccess?: (message: string) => void;
      onError?: (message: string) => void;
    }) => {
      const partner = row.original;
      const handleDelete = async () => {
        try {
          const result = await deletePartner(partner.id);

          if (result?.success) {
            onSuccess?.("Partner deleted successfully!");
          } else {
            onError?.("Error happened. Partner was not deleted.");
          }
        } catch (error) {
          console.log(error);
          onError?.("Error happened. Partner was not deleted.");
        }
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer" onClick={handleDelete}>
              Delete partner
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              View customer
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              View payment details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
