import { getMainTableData } from "@/actions/proposals/main-table-data";
import { useCallback, useEffect, useState } from "react";

export function useServerHomeTableData({
  pageIndex,
  pageSize,
  statusFilter,
  nameFilter,
}: {
  pageIndex: number;
  pageSize: number;
  statusFilter: string | number;
  nameFilter: string;
}) {
  const [data, setData] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const gotData = await getMainTableData(
        pageIndex,
        pageSize,
        statusFilter,
        nameFilter
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
  }, [pageIndex, pageSize, statusFilter, nameFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, rowCount, loading, error, refetch: fetchData };
}
