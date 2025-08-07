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
import { monthlyAnalytics, acceptedlyAnalytics, sentAnalytics } from "@/types";

export const description = "An interactive bar chart";

const chartConfig = {
  views: {
    label: "Money earned",
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
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const chartDataYearly = [
  { date: "2024-04-01", sent: 222, accepted: 150 },
  { date: "2024-04-02", sent: 97, accepted: 180 },
  { date: "2024-04-03", sent: 167, accepted: 120 },
  { date: "2024-04-04", sent: 242, accepted: 260 },
  { date: "2024-04-05", sent: 373, accepted: 290 },
  { date: "2024-04-06", sent: 301, accepted: 340 },
  { date: "2024-04-07", sent: 245, accepted: 180 },
  { date: "2024-04-08", sent: 409, accepted: 320 },
  { date: "2024-04-09", sent: 59, accepted: 110 },
  { date: "2024-04-10", sent: 261, accepted: 190 },
  { date: "2024-04-11", sent: 327, accepted: 350 },
  { date: "2024-04-12", sent: 292, accepted: 210 },
  { date: "2024-04-13", sent: 342, accepted: 380 },
  { date: "2024-04-14", sent: 137, accepted: 220 },
  { date: "2024-04-15", sent: 120, accepted: 170 },
  { date: "2024-04-16", sent: 138, accepted: 190 },
  { date: "2024-04-17", sent: 446, accepted: 360 },
  { date: "2024-04-18", sent: 364, accepted: 410 },
  { date: "2024-04-19", sent: 243, accepted: 180 },
  { date: "2024-04-20", sent: 89, accepted: 150 },
  { date: "2024-04-21", sent: 137, accepted: 200 },
  { date: "2024-04-22", sent: 224, accepted: 170 },
  { date: "2024-04-23", sent: 138, accepted: 230 },
  { date: "2024-04-24", sent: 387, accepted: 290 },
  { date: "2024-04-25", sent: 215, accepted: 250 },
  { date: "2024-04-26", sent: 75, accepted: 130 },
  { date: "2024-04-27", sent: 383, accepted: 420 },
  { date: "2024-04-28", sent: 122, accepted: 180 },
  { date: "2024-04-29", sent: 315, accepted: 240 },
  { date: "2024-04-30", sent: 454, accepted: 380 },
  { date: "2024-05-01", sent: 165, accepted: 220 },
  { date: "2024-05-02", sent: 293, accepted: 310 },
  { date: "2024-05-03", sent: 247, accepted: 190 },
  { date: "2024-05-04", sent: 385, accepted: 420 },
  { date: "2024-05-05", sent: 481, accepted: 390 },
  { date: "2024-05-06", sent: 498, accepted: 520 },
  { date: "2024-05-07", sent: 388, accepted: 300 },
  { date: "2024-05-08", sent: 149, accepted: 210 },
  { date: "2024-05-09", sent: 227, accepted: 180 },
  { date: "2024-05-10", sent: 293, accepted: 330 },
  { date: "2024-05-11", sent: 335, accepted: 270 },
  { date: "2024-05-12", sent: 197, accepted: 240 },
  { date: "2024-05-13", sent: 197, accepted: 160 },
  { date: "2024-05-14", sent: 448, accepted: 490 },
  { date: "2024-05-15", sent: 473, accepted: 380 },
  { date: "2024-05-16", sent: 338, accepted: 400 },
  { date: "2024-05-17", sent: 499, accepted: 420 },
  { date: "2024-05-18", sent: 315, accepted: 350 },
  { date: "2024-05-19", sent: 235, accepted: 180 },
  { date: "2024-05-20", sent: 177, accepted: 230 },
  { date: "2024-05-21", sent: 82, accepted: 140 },
  { date: "2024-05-22", sent: 81, accepted: 120 },
  { date: "2024-05-23", sent: 252, accepted: 290 },
  { date: "2024-05-24", sent: 294, accepted: 220 },
  { date: "2024-05-25", sent: 201, accepted: 250 },
  { date: "2024-05-26", sent: 213, accepted: 170 },
  { date: "2024-05-27", sent: 420, accepted: 460 },
  { date: "2024-05-28", sent: 233, accepted: 190 },
  { date: "2024-05-29", sent: 78, accepted: 130 },
  { date: "2024-05-30", sent: 340, accepted: 280 },
  { date: "2024-05-31", sent: 178, accepted: 230 },
  { date: "2024-06-01", sent: 178, accepted: 200 },
  { date: "2024-06-02", sent: 470, accepted: 410 },
  { date: "2024-06-03", sent: 103, accepted: 160 },
  { date: "2024-06-04", sent: 439, accepted: 380 },
  { date: "2024-06-05", sent: 88, accepted: 140 },
  { date: "2024-06-06", sent: 294, accepted: 250 },
  { date: "2024-06-07", sent: 323, accepted: 370 },
  { date: "2024-06-08", sent: 385, accepted: 320 },
  { date: "2024-06-09", sent: 438, accepted: 480 },
  { date: "2024-06-10", sent: 155, accepted: 200 },
  { date: "2024-06-11", sent: 92, accepted: 150 },
  { date: "2024-06-12", sent: 492, accepted: 420 },
  { date: "2024-06-13", sent: 81, accepted: 130 },
  { date: "2024-06-14", sent: 426, accepted: 380 },
  { date: "2024-06-15", sent: 307, accepted: 350 },
  { date: "2024-06-16", sent: 371, accepted: 310 },
  { date: "2024-06-17", sent: 475, accepted: 520 },
  { date: "2024-06-18", sent: 107, accepted: 170 },
  { date: "2024-06-19", sent: 341, accepted: 290 },
  { date: "2024-06-20", sent: 408, accepted: 450 },
  { date: "2024-06-21", sent: 169, accepted: 210 },
  { date: "2024-06-22", sent: 317, accepted: 270 },
  { date: "2024-06-23", sent: 480, accepted: 530 },
  { date: "2024-06-24", sent: 132, accepted: 180 },
  { date: "2024-06-25", sent: 141, accepted: 190 },
  { date: "2024-06-26", sent: 434, accepted: 380 },
  { date: "2024-06-27", sent: 448, accepted: 490 },
  { date: "2024-06-28", sent: 149, accepted: 200 },
  { date: "2024-06-29", sent: 103, accepted: 160 },
  { date: "2024-06-30", sent: 446, accepted: 400 },
];
const chartDataDenied = [
  { date: "2024-04-01", sent: 222, denied: 150 },
  { date: "2024-04-02", sent: 97, denied: 180 },
  { date: "2024-04-03", sent: 167, denied: 120 },
  { date: "2024-04-04", sent: 242, denied: 260 },
  { date: "2024-04-05", sent: 373, denied: 290 },
  { date: "2024-04-06", sent: 301, denied: 340 },
  { date: "2024-04-07", sent: 245, denied: 180 },
  { date: "2024-04-08", sent: 409, denied: 320 },
  { date: "2024-04-09", sent: 59, denied: 110 },
  { date: "2024-04-10", sent: 261, denied: 190 },
  { date: "2024-04-11", sent: 327, denied: 350 },
  { date: "2024-04-12", sent: 292, denied: 210 },
  { date: "2024-04-13", sent: 342, denied: 380 },
  { date: "2024-04-14", sent: 137, denied: 220 },
  { date: "2024-04-15", sent: 120, denied: 170 },
  { date: "2024-04-16", sent: 138, denied: 190 },
  { date: "2024-04-17", sent: 446, denied: 360 },
  { date: "2024-04-18", sent: 364, denied: 410 },
  { date: "2024-04-19", sent: 243, denied: 180 },
  { date: "2024-04-20", sent: 89, denied: 150 },
  { date: "2024-04-21", sent: 137, denied: 200 },
  { date: "2024-04-22", sent: 224, denied: 170 },
  { date: "2024-04-23", sent: 138, denied: 230 },
  { date: "2024-04-24", sent: 387, denied: 290 },
  { date: "2024-04-25", sent: 215, denied: 250 },
  { date: "2024-04-26", sent: 75, denied: 130 },
  { date: "2024-04-27", sent: 383, denied: 420 },
  { date: "2024-04-28", sent: 122, denied: 180 },
  { date: "2024-04-29", sent: 315, denied: 240 },
  { date: "2024-04-30", sent: 454, denied: 380 },
  { date: "2024-05-01", sent: 165, denied: 220 },
  { date: "2024-05-02", sent: 293, denied: 310 },
  { date: "2024-05-03", sent: 247, denied: 190 },
  { date: "2024-05-04", sent: 385, denied: 420 },
  { date: "2024-05-05", sent: 481, denied: 390 },
  { date: "2024-05-06", sent: 498, denied: 520 },
  { date: "2024-05-07", sent: 388, denied: 300 },
  { date: "2024-05-08", sent: 149, denied: 210 },
  { date: "2024-05-09", sent: 227, denied: 180 },
  { date: "2024-05-10", sent: 293, denied: 330 },
  { date: "2024-05-11", sent: 335, denied: 270 },
  { date: "2024-05-12", sent: 197, denied: 240 },
  { date: "2024-05-13", sent: 197, denied: 160 },
  { date: "2024-05-14", sent: 448, denied: 490 },
  { date: "2024-05-15", sent: 473, denied: 380 },
  { date: "2024-05-16", sent: 338, denied: 400 },
  { date: "2024-05-17", sent: 499, denied: 420 },
  { date: "2024-05-18", sent: 315, denied: 350 },
  { date: "2024-05-19", sent: 235, denied: 180 },
  { date: "2024-05-20", sent: 177, denied: 230 },
  { date: "2024-05-21", sent: 82, denied: 140 },
  { date: "2024-05-22", sent: 81, denied: 120 },
  { date: "2024-05-23", sent: 252, denied: 290 },
  { date: "2024-05-24", sent: 294, denied: 220 },
  { date: "2024-05-25", sent: 201, denied: 250 },
  { date: "2024-05-26", sent: 213, denied: 170 },
  { date: "2024-05-27", sent: 420, denied: 460 },
  { date: "2024-05-28", sent: 233, denied: 190 },
  { date: "2024-05-29", sent: 78, denied: 130 },
  { date: "2024-05-30", sent: 340, denied: 280 },
  { date: "2024-05-31", sent: 178, denied: 230 },
  { date: "2024-06-01", sent: 178, denied: 200 },
  { date: "2024-06-02", sent: 470, denied: 410 },
  { date: "2024-06-03", sent: 103, denied: 160 },
  { date: "2024-06-04", sent: 439, denied: 380 },
  { date: "2024-06-05", sent: 88, denied: 140 },
  { date: "2024-06-06", sent: 294, denied: 250 },
  { date: "2024-06-07", sent: 323, denied: 370 },
  { date: "2024-06-08", sent: 385, denied: 320 },
  { date: "2024-06-09", sent: 438, denied: 480 },
  { date: "2024-06-10", sent: 155, denied: 200 },
  { date: "2024-06-11", sent: 92, denied: 150 },
  { date: "2024-06-12", sent: 492, denied: 420 },
  { date: "2024-06-13", sent: 81, denied: 130 },
  { date: "2024-06-14", sent: 426, denied: 380 },
  { date: "2024-06-15", sent: 307, denied: 350 },
  { date: "2024-06-16", sent: 371, denied: 310 },
  { date: "2024-06-17", sent: 475, denied: 520 },
  { date: "2024-06-18", sent: 107, denied: 170 },
  { date: "2024-06-19", sent: 341, denied: 290 },
  { date: "2024-06-20", sent: 408, denied: 450 },
  { date: "2024-06-21", sent: 169, denied: 210 },
  { date: "2024-06-22", sent: 317, denied: 270 },
  { date: "2024-06-23", sent: 480, denied: 530 },
  { date: "2024-06-24", sent: 132, denied: 180 },
  { date: "2024-06-25", sent: 141, denied: 190 },
  { date: "2024-06-26", sent: 434, denied: 380 },
  { date: "2024-06-27", sent: 448, denied: 490 },
  { date: "2024-06-28", sent: 149, denied: 200 },
  { date: "2024-06-29", sent: 103, denied: 160 },
  { date: "2024-06-30", sent: 446, denied: 400 },
];

export function ProposalsChart({ chartData }: { chartData: sentAnalytics[] }) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("sent");

  const total = React.useMemo(
    () => ({
      sent: chartData.reduce((acc, curr) => acc + +curr.sent, 0),
      accepted: chartDataYearly.reduce((acc, curr) => acc + +curr.accepted, 0),
      denied: chartDataDenied.reduce((acc, curr) => acc + +curr.denied, 0),
    }),
    []
  );

  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>
            {activeChart === "sent"
              ? "Showing total proposals sent in the last year"
              : activeChart === "accepted"
              ? "Showing total proposals accepted in the last year."
              : "Showing total proposals denied in the last year."}
          </CardDescription>
        </div>
        <div className="flex">
          {["sent", "accepted", "denied"].map((key) => {
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
                ? chartData
                : activeChart === "accepted"
                ? chartDataYearly
                : chartDataDenied
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
