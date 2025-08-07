import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoneyChart } from "./charts/MoneyChart";
import { monthlyAnalytics, sentAnalytics } from "@/types";
import { getMoneyYearlyAnalyticsData } from "@/actions/analytics/get-money-yearly";
import { ProposalsChart } from "./charts/ProposalsChart";

const ChartsTabs = async ({
  moneyMonthly,
  proposalsSent,
}: {
  moneyMonthly: {
    success: boolean;
    message?: string;
    data?: monthlyAnalytics[];
  };
  proposalsSent: {
    success: boolean;
    message?: string;
    data?: sentAnalytics[];
  };
}) => {
  const moneyYearly = await getMoneyYearlyAnalyticsData();
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="proposals">
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
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Current password</Label>
                <Input id="tabs-demo-current" type="password" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">New password</Label>
                <Input id="tabs-demo-new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChartsTabs;
