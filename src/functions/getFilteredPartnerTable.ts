import { getPartnerTableData } from "@/actions/partner/partner-main-table-data";
import { useCallback, useEffect, useState } from "react";

export function useServerPartnerTableData({
  pageIndex,
  pageSize,
  nameFilter,
  emailFilter,
  countryFilter,
  cityFilter,
}: {
  pageIndex: number;
  pageSize: number;
  nameFilter: string;
  emailFilter: string;
  countryFilter: string;
  cityFilter: string;
}) {
  const [data, setData] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const gotData = await getPartnerTableData(
        pageIndex,
        pageSize,
        nameFilter,
        emailFilter,
        countryFilter,
        cityFilter
      );

      if (gotData.message) {
        setData([]);
        setRowCount(0);
        setData([]);
      }

      setData(gotData.rows || []);
      setRowCount(gotData.total || 0);
    } catch (err) {
      console.log("Error fetching data:", err);
      setError(true);
      setData([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  }, [pageIndex, pageSize, nameFilter, emailFilter, countryFilter, cityFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, rowCount, loading, error, refetch: fetchData };
}
