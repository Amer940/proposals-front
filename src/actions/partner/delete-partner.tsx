"use server";

export const deletePartner = async (partner_id: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/partner/${partner_id}`,
      {
        method: "DELETE",
        cache: "no-store",
      } // avoid caching in Next.js
    );

    if (res.status != 204)
      return { success: false, message: "Failed to delete partner." };

    return { success: true, message: "Partner deleted successfully" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Failed to delete partner." };
  }
};
