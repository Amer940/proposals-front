import { getMoneyMonthlyAnalyticsData } from "@/actions/analytics/get-money-monthly";
import { getProposalsAnalyticsData } from "@/actions/analytics/get-all-proposals";
import ChartsTabs from "@/components/ChartsTabs";
import Navbar from "@/components/Navbar";
import { getPartnerMonthlyAnalyticsData } from "@/actions/analytics/get-partner-monthly";

export default async function Home() {
  const moneyMonthly = await getMoneyMonthlyAnalyticsData();
  const partnerMonthly = await getPartnerMonthlyAnalyticsData();
  const proposalsSent = await getProposalsAnalyticsData();

  return (
    <>
      <Navbar />
      <div className="font-sans flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 max-w-[1200px] mx-auto">
        <div className="flex flex-col justify-center items-center align-middle gap-3">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Proposal Tracker
          </h3>
          <small className="text-sm leading-none font-medium text-white/50">
            This is the main &quot;see-all&quot; table with analytics. Go to
            other pages from the navbar for more actions.
          </small>
        </div>
        <ChartsTabs
          moneyMonthly={moneyMonthly}
          proposalsSent={proposalsSent}
          partnerMonthly={partnerMonthly}
        />
      </div>
    </>
  );
}
