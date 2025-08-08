"use server";

export const getPartnerYearlyAnalyticsData = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/analytics/partner-yearly`,
      { cache: "no-store" } // avoid caching in Next.js
    );

    const data = await res.json();

    if (res.status != 200) {
      return {
        success: false,
        message: "Failed fetching yearly partner analytics data",
      };
    }

    return { success: true, data: data };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Failed fetching yearly partner analytics data",
    };
  }
};
