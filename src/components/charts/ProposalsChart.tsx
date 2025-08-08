"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { proposalsAnalytics } from "@/types";

export const description = "An interactive bar chart";

const chartConfig = {
  views: {
    label: "Proposals",
  },
  sent: {
    label: "Sent",
    color: "var(--chart-5)",
  },
  accepted: {
    label: "Accepted",
    color: "var(--chart-1)",
  },
  denied: {
    label: "Denied",
    color: "var(--chart-4)",
  },
  ignored: {
    label: "Ignored",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ProposalsChart({
  chartData,
}: {
  chartData: proposalsAnalytics[];
}) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("sent");

  const total = React.useMemo(
    () => ({
      sent: chartData.reduce((acc, curr) => acc + +curr.sent, 0),
      accepted: chartData.reduce((acc, curr) => acc + +curr.accepted, 0),
      denied: chartData.reduce((acc, curr) => acc + +curr.denied, 0),
      ignored: chartData.reduce((acc, curr) => acc + +curr.ignored, 0),
    }),
    []
  );

  const deniedChart = chartData.filter((item) => item.denied !== 0);
  const acceptedChart = chartData.filter((item) => item.accepted !== 0);
  const sentChart = chartData.filter((item) => item.sent !== 0);
  const ignoredChart = chartData.filter((item) => item.ignored !== 0);

  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>
            {activeChart === "sent"
              ? "Showing total proposals sent ever."
              : activeChart === "accepted"
              ? "Showing total proposals accepted ever."
              : activeChart === "denied"
              ? "Showing total proposals denied ever."
              : "Showing total proposals ignored ever."}
          </CardDescription>
        </div>
        <div className="flex">
          {["sent", "accepted", "denied", "ignored"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="data-[active=true]:bg-muted/50 relative z-30 flex  flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6 cursor-pointer"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-muted-foreground text-xs">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={
              activeChart === "sent"
                ? sentChart
                : activeChart === "accepted"
                ? acceptedChart
                : activeChart === "denied"
                ? deniedChart
                : ignoredChart
            }
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      accepted: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
