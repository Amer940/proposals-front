"use server";

import { dataError, Payment } from "@/types";

export const getMainTableData = async (
  pageIndex: number,
  pageSize: number,
  statusFilter: string,
  nameFilter: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/proposals?` +
        new URLSearchParams({
          page: String(pageIndex),
          pageSize: String(pageSize),
          status: statusFilter,
          name: nameFilter,
        }),
      { cache: "no-store" } // avoid caching in Next.js
    );

    const data = await res.json();

    if ((data as dataError).message) {
      return { rows: [], total: 0, message: "Error" };
    }

    return {
      rows: data.rows as Payment[],
      total: data.count ?? 0,
    };
  } catch (err) {
    console.log(err);
    return { rows: [], total: 0 };
  }
};
