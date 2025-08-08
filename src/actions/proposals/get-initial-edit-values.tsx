"use server";

export const getInitialValuesEditProposal = async (id: number | string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/proposals/initial-edit/${id}`,
      { cache: "no-store" } // avoid caching in Next.js
    );

    const data = await res.json();

    if (res.status != 200) {
      return {
        success: false,
        message: "Failed fetching initial proposal data",
      };
    }

    return { success: true, data: data };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Failed fetching initial proposal data" };
  }
};
