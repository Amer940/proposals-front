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
import { Payment, selectFieldType } from "@/types";
import { deletePartner } from "@/actions/partner/delete-partner";
import { PartnerMainTable } from "@/components/tables/PartnerMainTable";
import { useMemo } from "react";

export function PartnersTableWrapper({
  allCountries,
}: {
  allCountries: { success: boolean; data?: selectFieldType[] };
}) {
  // Now you can use the function approach since this is a client component
  const columnsWithData = useMemo(() => {
    return createColumns();
  }, []);

  return (
    <PartnerMainTable
      columns={columnsWithData}
      allCountries={allCountries.data}
    />
  );
}

function createColumns(): ColumnDef<Payment>[] {
  return [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorFn: (row) => row.country?.name,
      id: "country.name",
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
        onEdit,
      }: {
        row: any;
        onSuccess?: (message: string) => void;
        onError?: (message: string) => void;
        onEdit?: (partner: any) => void;
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

        const handleEdit = () => {
          onEdit?.(partner);
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
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleDelete}
              >
                Delete partner
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
                Edit partner
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
