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

import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { DataTableColumnHeader } from "@/components/ColumnHeader";
import { Payment, selectFieldType } from "@/types";
import { deleteProposal } from "@/actions/proposals/delete-proposal";
import EditProposalDialog from "@/components/forms/EditProposalDialog";
import { MainTable } from "@/components/tables/MainTable";
import { useMemo } from "react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export function ProposalsTableWrapper({
  allStatuses,
  allPartners,
}: {
  allStatuses: { success: boolean; data?: selectFieldType[] };
  allPartners: { success: boolean; data?: selectFieldType[] };
}) {
  // Now you can use the function approach since this is a client component
  const columnsWithData = useMemo(() => {
    return createColumns();
  }, []);

  return (
    <MainTable
      columns={columnsWithData}
      allStatuses={allStatuses}
      allPartners={allPartners}
    />
  );
}

function createColumns(): ColumnDef<Payment>[] {
  return [
    {
      accessorFn: (row) => row.status?.name,
      id: "status.name",
      header: "Status",
    },
    {
      accessorFn: (row) => row.partner?.name,
      id: "partner.name",
      header: "Partner Name",
    },
    {
      accessorKey: "demand",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Demand" />
      ),
      cell: ({ row }) => {
        const demand = parseFloat(row.getValue("demand"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(demand);

        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "agreed",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Agreed Amount" />
      ),
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("agreed"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "paid",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Paid Amount" />
      ),
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("paid"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return <div className="font-medium">{formatted}</div>;
      },
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
        onEdit?: (proposal: any) => void;
      }) => {
        const proposal = row.original;
        const handleDelete = async () => {
          try {
            const result = await deleteProposal(proposal.id);

            if (result?.success) {
              onSuccess?.("Proposal deleted successfully!");
            } else {
              onError?.("Error happened. Proposal was not deleted.");
            }
          } catch (error) {
            console.log(error);
            onError?.("Error happened. Proposal was not deleted.");
          }
        };

        const handleEdit = () => {
          onEdit?.(proposal);
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
                Delete proposal
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
                Edit proposal
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
