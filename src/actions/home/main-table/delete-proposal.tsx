"use server";

export const deleteProposal = async (proposal_id: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/main-table/${proposal_id}`,
      {
        method: "DELETE",
        cache: "no-store",
      } // avoid caching in Next.js
    );

    if (res.status != 204)
      return { success: false, message: "Failed to delete partner." };

    return { success: true, message: "Proposal deleted successfully" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Failed to delete proposal." };
  }
};
