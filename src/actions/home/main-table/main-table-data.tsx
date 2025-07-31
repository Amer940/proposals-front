import { dataError, Payment } from "@/types";

export const getMainTableData = async () => {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/main-table`);

    const data = await res.json();

    if ((data as dataError)?.message) {
      return [];
    }

    return data as Payment[];
  } catch (err) {
    console.log(err);
    return [];
  }
};
