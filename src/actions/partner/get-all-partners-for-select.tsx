"use server";

export const getAllPartnersForSelect = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/partner/all`,
      { cache: "no-store" } // avoid caching in Next.js
    );

    const data = await res.json();

    if (res.status != 200) {
      return { success: false, message: "Failed fetching partners" };
    }

    return { success: true, data: data };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Failed fetching partners" };
  }
};
