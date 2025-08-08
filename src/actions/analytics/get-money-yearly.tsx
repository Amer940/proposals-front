"use server";

export const getMoneyYearlyAnalyticsData = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/analytics/money-yearly`,
      { cache: "no-store" } // avoid caching in Next.js
    );

    const data = await res.json();

    if (res.status != 200) {
      return {
        success: false,
        message: "Failed fetching yearly money analytics data",
      };
    }

    return { success: true, data: data };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Failed fetching yearly money analytics data",
    };
  }
};
