"use server";

import { editProposalType } from "@/types";

export const editProposal = async (body: editProposalType) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/proposals/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // tell backend it's JSON
        },
        body: JSON.stringify(body),
        cache: "no-store",
      } // avoid caching in Next.js
    );

    if (res.status !== 200) {
      let errorMessage = "Unknown error occurred.";
      const rawBody = await res.text();

      try {
        const parsed = JSON.parse(rawBody);
        errorMessage = parsed?.message || errorMessage;
      } catch {
        errorMessage = rawBody || errorMessage;
      }

      return { success: false, message: errorMessage };
    }

    return { success: true, message: "Proposal created successfully" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Failed to create proposal." };
  }
};
