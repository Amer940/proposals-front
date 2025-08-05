import { dataError, Partner } from "@/types";

export const getPartnerTableData = async (
  pageIndex: number,
  pageSize: number,
  nameFilter: string,
  emailFilter: string,
  countryFilter: string,
  cityFilter: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/partner?` +
        new URLSearchParams({
          page: String(pageIndex),
          pageSize: String(pageSize),
          name: nameFilter,
          email: emailFilter,
          city: cityFilter,
          country: countryFilter,
        }),
      { cache: "no-store" } // avoid caching in Next.js
    );

    const data = await res.json();

    if ((data as dataError).message) {
      return { rows: [], total: 0, message: "Error" };
    }

    return {
      rows: data.rows as Partner[],
      total: data.count ?? 0,
    };
  } catch (err) {
    console.log(err);
    return { rows: [], total: 0 };
  }
};
