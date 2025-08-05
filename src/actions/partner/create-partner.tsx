"use server";

import { createPartnerType } from "@/types";

export const createPartner = async (body: createPartnerType) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/partner/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // tell backend it's JSON
        },
        body: JSON.stringify(body),
        cache: "no-store",
      } // avoid caching in Next.js
    );

    if (res.status != 201) return { success: false, message: res.json() };

    return { success: true, message: "Partner created successfully" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Failed to create partner." };
  }
};
