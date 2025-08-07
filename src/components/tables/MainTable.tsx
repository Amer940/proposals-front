"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CheckNoDataToast from "../CheckNoDataToast";
import { useCallback, useState } from "react";
import { useServerHomeTableData } from "@/functions/getFilteredMainTable";
import useDebouncedState from "@/functions/debouncedStateFunction";
import SuccessToast from "../SuccessToast";
import { selectFieldType } from "@/types";
import CustomSelectNoFormik from "../CustomSelectNoFormik";
import { Dialog } from "../ui/dialog";
import EditProposalDialog from "../forms/EditProposalDialog";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  allStatuses: { success: boolean; message?: string; data?: selectFieldType[] };
  allPartners: { success: boolean; message?: string; data?: selectFieldType[] };
}

export function MainTable<TData, TValue>({
  columns,
  allStatuses,
  allPartners,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const [statusFilter, setStatusFilter] = useState<string | number>("");
  const [nameFilter, setNameFilter] = useDebouncedState("", 400);

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(15);

  // State for success toast
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [editingProposal, setEditingProposal] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Error happened while getting proposals"
  );

  const { data, rowCount, loading, error, refetch } = useServerHomeTableData({
    pageIndex,
    pageSize,
    statusFilter,
    nameFilter,
  });

  const modifiedStatuses = [
    { label: "All", value: "all" },
    ...(allStatuses.data ?? []),
  ];

  const handleSuccess = useCallback(
    (message: string) => {
      setSuccessMessage(message);
      setShowSuccessToast(true);

      setIsEditDialogOpen(false);
      setEditingProposal(null);

      refetch();
    },
    [refetch]
  );

  const handleError = useCallback(
    (message: string) => {
      setErrorMessage(message);
      setShowErrorToast(true);
      // Refetch data to update the table
      refetch();
    },
    [refetch]
  );

  // Create enhanced columns with success handler
  const enhancedColumns = columns.map((column) => {
    if (column.id === "actions") {
      return {
        ...column,
        cell: ({ row }: any) => {
          // Pass the handleSuccess function to the actions column
          return column.cell({
            row,
            onSuccess: handleSuccess,
            onError: handleError,
            onEdit: (proposal: any) => {
              setEditingProposal(proposal);
              setIsEditDialogOpen(true);
            },
          });
        },
      };
    }
    return column;
  });

  const table = useReactTable({
    data,
    columns: enhancedColumns,
    pageCount: Math.ceil(rowCount / pageSize),
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination: { pageIndex, pageSize },
    },
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(next.pageIndex);
      setPageSize(next.pageSize);
    },
  });

  return (
    <>
      <CheckNoDataToast
        show={showErrorToast || error}
        message={errorMessage}
        onClose={() => setShowErrorToast(false)}
      />
      <SuccessToast
        show={showSuccessToast}
        message={successMessage}
        onClose={() => setShowSuccessToast(false)}
      />
      <div className="w-full">
        <div className="flex items-center py-4 gap-4">
          <CustomSelectNoFormik
            options={modifiedStatuses}
            placeholder={"Filter Status"}
            value={statusFilter}
            onChange={(option) => {
              setStatusFilter(option.value);
            }}
          />
          <Input
            placeholder="Filter by name..."
            onChange={(event) => {
              setNameFilter(event.target.value);
            }}
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" className="ml-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id == "status.name"
                        ? "Status"
                        : column.id == "partner.name"
                        ? "Partner name"
                        : column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      {editingProposal && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <EditProposalDialog
            row={editingProposal}
            allStatuses={allStatuses.data ?? []}
            allPartners={allPartners.data ?? []}
            success={handleSuccess}
          />
        </Dialog>
      )}
    </>
  );
}
