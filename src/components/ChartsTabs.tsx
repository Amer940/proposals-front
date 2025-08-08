import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoneyChart } from "./charts/MoneyChart";
import { monthlyAnalytics, monthlyPartner, proposalsAnalytics } from "@/types";
import { getMoneyYearlyAnalyticsData } from "@/actions/analytics/get-money-yearly";
import { ProposalsChart } from "./charts/ProposalsChart";
import { PartnersChart } from "./charts/PartnersChart";
import { getPartnerYearlyAnalyticsData } from "@/actions/analytics/get-partner-yearly";

const ChartsTabs = async ({
  moneyMonthly,
  proposalsSent,
  partnerMonthly,
}: {
  moneyMonthly: {
    success: boolean;
    message?: string;
    data?: monthlyAnalytics[];
  };
  proposalsSent: {
    success: boolean;
    message?: string;
    data?: proposalsAnalytics[];
  };
  partnerMonthly: {
    success: boolean;
    message?: string;
    data?: monthlyPartner[];
  };
}) => {
  const moneyYearly = await getMoneyYearlyAnalyticsData();
  const partnerYearly = await getPartnerYearlyAnalyticsData();

  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="money">
        <TabsList>
          <TabsTrigger value="money">Money</TabsTrigger>
          <TabsTrigger value="proposals">Proposals</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
        </TabsList>
        <TabsContent value="money">
          <MoneyChart
            chartData={moneyMonthly.data ?? []}
            chartDataYearly={moneyYearly.data ?? []}
          />
        </TabsContent>
        <TabsContent value="proposals">
          <ProposalsChart chartData={proposalsSent.data ?? []} />
        </TabsContent>
        <TabsContent value="partners">
          <PartnersChart
            chartData={partnerMonthly.data ?? []}
            chartDataYearly={partnerYearly.data ?? []}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChartsTabs;
