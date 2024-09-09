import React from "react";
import { CartesianGrid, Line, LineChart as RechartsLineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Adjust the import paths as per your project structure
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"; // Adjust the import paths as per your project structure

export const LineChart = () => {
  const chartData = [
    { month: "2024-01", sales: 6200 },
    { month: "2024-02", sales: 7200 },
    { month: "2024-03", sales: 3500 },
    { month: "2024-04", sales: 6200 },
    { month: "2024-05", sales: 5200 },
    { month: "2024-06", sales: 6200 },
    { month: "2024-07", sales: 7000 },
  ];

  return (
    <Card className="flex flex-col lg:max-w-xs">
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
        <div>
          <CardDescription>Total Sales</CardDescription>
          <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
            62K
            <span className="text-sm font-normal tracking-normal text-muted-foreground">
              units
            </span>
          </CardTitle>
        </div>
        <div>
          <CardDescription>Monthly Variability</CardDescription>
          <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
            35%
            <span className="text-sm font-normal tracking-normal text-muted-foreground">
              variation
            </span>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 items-center">
        <ChartContainer
          config={{
            sales: {
              label: "Sales",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="w-full"
        >
          <RechartsLineChart
            data={chartData}
            margin={{
              left: 14,
              right: 14,
              top: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="hsl(var(--muted-foreground))"
              strokeOpacity={0.5}
            />
            <YAxis hide domain={["dataMin - 1000", "dataMax + 1000"]} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                return new Date(value + "-01").toLocaleDateString("en-US", {
                  month: "short",
                });
              }}
            />
            <Line
              dataKey="sales"
              type="natural"
              fill="var(--color-sales)"
              stroke="var(--color-sales)"
              strokeWidth={2}
              dot={false}
              activeDot={{
                fill: "var(--color-sales)",
                stroke: "var(--color-sales)",
                r: 4,
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  indicator="line"
                  labelFormatter={(value) => {
                    return new Date(value + "-01").toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    });
                  }}
                />
              }
              cursor={false}
            />
          </RechartsLineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
