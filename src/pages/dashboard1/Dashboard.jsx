import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  LabelList,
  Line,
  LineChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  Rectangle,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Separator } from "@/components/ui/separator"

export const description = "A collection of health charts."

export function Charts() {
  return (
    <div className="chart-wrapper mx-auto flex max-w-screen flex-col flex-wrap items-start justify-center ml-16 gap-24 sm:flex-row sm:p-8">
      <div className="grid w-full gap-16 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-screen">
      <Card className="lg:max-w-xl">
  <CardHeader className="space-y-0 pb-2">
    <CardDescription>Post-Oil Spill Recovery Techniques</CardDescription>
    <CardTitle className="text-2xl tabular-nums">
      $ 157.03 Bn{" "}
      <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
        (2023 Total Market Size)
      </span>
    </CardTitle>
  </CardHeader>
  <CardContent>
    <ChartContainer
      config={{
        recoveryTechnique: {
          label: "Recovery Technique",
          color: "hsl(var(--chart-1))",
        },
      }}
    >
      <BarChart
        accessibilityLayer
        margin={{
          left: -4,
          right: -4,
        }}
        data={[
          {
            technique: "Mech",
            revenue: 60.0,
          },
          {
            technique: "Chemical",
            revenue: 50.0,
          },
          {
            technique: "Biological",
            revenue: 30.0,
          },
          {
            technique: "Others",
            revenue: 17.03,
          },
        ]}
      >
        <Bar
          dataKey="revenue"
          fill="var(--color-recoveryTechnique)"
          radius={5}
          fillOpacity={0.6}
          activeBar={<Rectangle fillOpacity={0.8} />}
        />
        <XAxis
          dataKey="technique"
          tickLine={false}
          axisLine={false}
          tickMargin={4}
        />
        <YAxis
          dataKey="revenue"
          tickLine={false}
          axisLine={false}
          tickMargin={4}
          label={{ value: "Revenue (USD Billion)", angle: -90, position: "middle"}}
        />
        <ChartTooltip
          defaultIndex={0}
          content={
            <ChartTooltipContent
              hideIndicator
              labelFormatter={(value) => {
                return value;
              }}
            />
          }
          cursor={false}
        />
      </BarChart>
    </ChartContainer>
  </CardContent>
  <CardFooter className="flex-col items-start gap-1">
    <CardDescription>
      The mechanical containment segment leads the post-oil spill recovery market
      with a revenue of{" "}
      <span className="font-medium text-foreground">USD 60 billion</span>, followed
      by chemical recovery at USD 50 billion.
    </CardDescription>
  </CardFooter>
</Card>
<Card className="flex flex-col lg:max-w-lg">
  <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
    <div>
      <CardDescription>Market Growth</CardDescription>
      <CardTitle className="flex items-baseline gap-1 text-2xl tabular-nums">
        3.5%
        <span className="text-sm font-normal tracking-normal text-muted-foreground">
          CAGR
        </span>
      </CardTitle>
    </div>
    <div>
      <CardDescription className='text-xs'>Projected CAGR (23-30)</CardDescription>
      <CardTitle className="flex items-baseline gap-1 text-2xl tabular-nums">
        3.9%
        <span className="text-xs font-normal tracking-normal text-muted-foreground">
          (Asia Pacific)
        </span>
      </CardTitle>
    </div>
  </CardHeader>
  <CardContent className="flex flex-1 items-center">
    <ChartContainer
      config={{
        marketGrowth: {
          label: "Global Market Growth % : ",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="w-full"
    >
      <LineChart
        accessibilityLayer
        margin={{
          left: 14,
          right: 14,
          top: 10,
        }}
        data={[
          {
            year: "2022",
            marketGrowth: 125.6,
          },
          {
            year: "2023",
            marketGrowth: 157.03,
          },
          {
            year: "2024",
            marketGrowth: 196.36,
          },
          {
            year: "2025",
            marketGrowth: 205.5,
          },
          {
            year: "2026",
            marketGrowth: 215.0,
          },
          {
            year: "2027",
            marketGrowth: 225.6,
          },
          {
            year: "2028",
            marketGrowth: 235.2,
          },
          {
            year: "2029",
            marketGrowth: 245.3,
          },
          {
            year: "2030",
            marketGrowth: 255.5,
          },
        ]}
      >
        <CartesianGrid
          strokeDasharray="4 4"
          vertical={false}
          stroke="hsl(var(--muted-foreground))"
          strokeOpacity={0.5}
        />
        <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
        <XAxis
          dataKey="year"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <Line
          dataKey="marketGrowth"
          type="natural"
          fill="var(--color-marketGrowth)"
          stroke="var(--color-marketGrowth)"
          strokeWidth={2}
          dot={false}
        //   activeDot={{
        //     fill: "var(--color-marketGrowth)",
        //     stroke: "var(--color-marketGrowth)",
        //     r: 4,
        //   }}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              indicator="line"
              labelFormatter={(value) => {
                return value;
              }}
            />
          }
          cursor={false}
        />
      </LineChart>
    </ChartContainer>
  </CardContent>
</Card>
      </div>
      <div className="grid w-full flex-1 gap-20 lg:max-w-2xl">
      <Card className="flex flex-col lg:max-w-xl">
  <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
    <div>
      <CardDescription>Market Growth</CardDescription>
      <CardTitle className="flex items-baseline gap-3 text-xl tabular-nums">
        Pacific vs Global
        <span className="text-sm font-normal tracking-normal text-muted-foreground">
          Oil Spill Management Market
        </span>
      </CardTitle>
    </div>
  </CardHeader>
  <CardContent className="flex flex-1 items-center">
    <ChartContainer
      config={{
        marketGrowth: {
          label: "Market Growth",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="w-full"
    >
      <LineChart
        accessibilityLayer
        margin={{
          left: 14,
          right: 14,
          top: 10,
        }}
        data={[
          {
            year: "2022",
            asia_pacific_growth: 21.54,
            global_growth: 125.6,
          },
          {
            year: "2023",
            asia_pacific_growth: 22.38,
            global_growth: 129.0,
          },
          {
            year: "2024",
            asia_pacific_growth: 23.25,
            global_growth: 132.5,
          },
          {
            year: "2025",
            asia_pacific_growth: 24.15,
            global_growth: 136.1,
          },
          {
            year: "2026",
            asia_pacific_growth: 25.08,
            global_growth: 139.8,
          },
          {
            year: "2027",
            asia_pacific_growth: 26.02,
            global_growth: 143.5,
          },
          {
            year: "2028",
            asia_pacific_growth: 26.99,
            global_growth: 147.3,
          },
          {
            year: "2029",
            asia_pacific_growth: 27.98,
            global_growth: 151.1,
          },
          {
            year: "2030",
            asia_pacific_growth: 28.99,
            global_growth: 155.0,
          },
        ]}
      >
        <CartesianGrid
          strokeDasharray="4 4"
          vertical={false}
          stroke="hsl(var(--muted-foreground))"
          strokeOpacity={0.5}
        />
        <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
        <XAxis
          dataKey="year"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <Line
          dataKey="asia_pacific_growth"
          type="natural"
          fill="blue"
          stroke="blue"
          strokeWidth={2}
          dot={{ stroke: 'blue', fill: 'blue', r: 4 }}
        />
        <Line
          dataKey="global_growth"
          type="natural"
          fill="green"
          stroke="green"
          strokeWidth={2}
          dot={{ stroke: 'green', fill: 'green', r: 4 }}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              indicator="line"
              labelFormatter={(value) => {
                return value;
              }}
            />
          }
          cursor={false}
        />
      </LineChart>
    </ChartContainer>
  </CardContent>
</Card>

        
        <Card className="max-w-xl" x-chunk="charts-01-chunk-4">
  <CardContent className="flex gap-4 p-4 pb-4">
    <ChartContainer
      config={{
        TAM: {
          label: "TAM",
          color: "hsl(var(--chart-1))",
        },
        SAM: {
          label: "SAM",
          color: "hsl(var(--chart-2))",
        },
        SOM: {
          label: "SOM",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[140px] w-full"
    >
      <BarChart
        margin={{
          left: 0,
          right: 0,
          top: 0,
          bottom: 10,
        }}
        data={[
          {
            market: "TAM",
            value: (16287880000000 / 196360000000) * 100,
            label: "₹16.28T",
            fill: "var(--color-TAM)",
          },
          {
            market: "SAM",
            value: (490240000000 / 5890000000) * 100,
            label: "₹490.24B",
            fill: "var(--color-SAM)",
          },
          {
            market: "SOM",
            value: (4902400000 / 490240000000) * 100,
            label: "₹49.02Cr",
            fill: "var(--color-SOM)",
          },
        ]}
        layout="vertical"
        barSize={32}
        barGap={2}
      >
        <XAxis type="number" dataKey="value" hide />
        <YAxis
          dataKey="market"
          type="category"
          tickLine={false}
          tickMargin={4}
          axisLine={false}
          className="capitalize"
        />
        <Bar dataKey="value" radius={5}>
          <LabelList
            position="insideLeft"
            dataKey="label"
            fill="white"
            offset={8}
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  </CardContent>
  <CardFooter className="flex flex-row border-t p-4">
    <div className="flex w-full items-center gap-2">
      <div className="grid flex-1 auto-rows-min gap-0.5">
        <div className="text-xs text-muted-foreground">TAM (Global)</div>
        <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
          ₹16.28T
          <span className="text-sm font-normal text-muted-foreground"></span>
        </div>
      </div>
      <Separator orientation="vertical" className="mx-2 h-10 w-px" />
      <div className="grid flex-1 auto-rows-min gap-0.5">
        <div className="text-xs text-muted-foreground">SAM (India)</div>
        <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
          ₹490.24B
          <span className="text-sm font-normal text-muted-foreground"></span>
        </div>
      </div>
      <Separator orientation="vertical" className="mx-2 h-10 w-px" />
      <div className="grid flex-1 auto-rows-min gap-0.5">
        <div className="text-xs text-muted-foreground">SOM (India)</div>
        <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
          ₹49.02Cr
          <span className="text-sm font-normal text-muted-foreground"></span>
        </div>
      </div>
    </div>
  </CardFooter>
</Card>

      </div>
      
      <Card className="lg:max-w-xl">
  <CardHeader className="space-y-0 pb-2">
    <CardDescription>Global Oil Spill Management Market (2024-2031)</CardDescription>
    <CardTitle className="text-2xl tabular-nums">
      $ 201.56 Bn{" "}
      <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
        (2031 Market Size)
      </span>
    </CardTitle>
  </CardHeader>
  <CardContent>
    <ChartContainer
      config={{
        regionNorthAmerica: {
          label: "North America",
          color: "hsl(var(--chart-1))",
        },
        regionEurope: {
          label: "Europe",
          color: "hsl(var(--chart-2))",
        },
        regionAsiaPacific: {
          label: "Asia Pacific",
          color: "hsl(var(--chart-3))",
        },
        regionSouthAmerica: {
          label: "South America",
          color: "hsl(var(--chart-4))",
        },
        regionMiddleEastAfrica: {
          label: "Middle East & Africa",
          color: "hsl(var(--chart-5))",
        },
      }}
    >
      <BarChart
        accessibilityLayer
        margin={{
          left: -4,
          right: -4,
        }}
        data={[
          {
            year: "2024",
            NorthAmerica: 20.0,
            Europe: 15.0,
            AsiaPacific: 10.0,
            SouthAmerica: 5.0,
            MiddleEastAfrica: 2.5,
          },
          {
            year: "2025",
            NorthAmerica: 25.0,
            Europe: 20.0,
            AsiaPacific: 15.0,
            SouthAmerica: 7.5,
            MiddleEastAfrica: 5.0,
          },
          {
            year: "2026",
            NorthAmerica: 30.0,
            Europe: 25.0,
            AsiaPacific: 20.0,
            SouthAmerica: 10.0,
            MiddleEastAfrica: 7.5,
          },
          {
            year: "2027",
            NorthAmerica: 40.0,
            Europe: 30.0,
            AsiaPacific: 20.0,
            SouthAmerica: 10.0,
            MiddleEastAfrica: 5.0,
          },
          {
            year: "2028",
            NorthAmerica: 50.0,
            Europe: 40.0,
            AsiaPacific: 30.0,
            SouthAmerica: 20.0,
            MiddleEastAfrica: 10.0,
          },
          {
            year: "2029",
            NorthAmerica: 60.0,
            Europe: 50.0,
            AsiaPacific: 40.0,
            SouthAmerica: 30.0,
            MiddleEastAfrica: 15.0,
          },
          {
            year: "2030",
            NorthAmerica: 70.0,
            Europe: 60.0,
            AsiaPacific: 50.0,
            SouthAmerica: 40.0,
            MiddleEastAfrica: 20.0,
          },
          {
            year: "2031",
            NorthAmerica: 80.0,
            Europe: 70.0,
            AsiaPacific: 60.0,
            SouthAmerica: 50.0,
            MiddleEastAfrica: 25.0,
          },
        ]}
      >
        <Bar
          dataKey="NorthAmerica"
          fill="var(--color-regionNorthAmerica)"
          radius={5}
          fillOpacity={0.6}
          activeBar={<Rectangle fillOpacity={0.8} />}
        />
        <Bar
          dataKey="Europe"
          fill="var(--color-regionEurope)"
          radius={5}
          fillOpacity={0.6}
        />
        <Bar
          dataKey="AsiaPacific"
          fill="var(--color-regionAsiaPacific)"
          radius={5}
          fillOpacity={0.6}
        />
        <Bar
          dataKey="SouthAmerica"
          fill="var(--color-regionSouthAmerica)"
          radius={5}
          fillOpacity={0.6}
        />
        <Bar
          dataKey="MiddleEastAfrica"
          fill="var(--color-regionMiddleEastAfrica)"
          radius={5}
          fillOpacity={0.6}
        />
        <XAxis
          dataKey="year"
          tickLine={false}
          axisLine={false}
          tickMargin={4}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={4}
          label={{ value: "Revenue (USD Billion)", angle: -90, position: "middle" }}
        />
        <ChartTooltip
          defaultIndex={0}
          content={
            <ChartTooltipContent
              hideIndicator
              labelFormatter={(value) => {
                return value;
              }}
            />
          }
          cursor={false}
        />
      </BarChart>
    </ChartContainer>
  </CardContent>
  <CardFooter className="flex-col items-start gap-1">
    <CardDescription>
      North America continues to dominate the market with USD 80 billion in 2031,
      followed by Europe and Asia Pacific. The total global oil spill management market
      is expected to grow to USD 201.56 billion by 2031.
    </CardDescription>
  </CardFooter>
</Card>

<Card className="max-w-xl">
  <CardHeader className="space-y-0 pb-2">
    <CardDescription>Competitor Analysis: Market Focus, Tech Integration, Local Expertise</CardDescription>
    <CardTitle className="text-2xl tabular-nums">
      Industry Competitor Overview{" "}
      <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
        (Rating Scale: 1-5)
      </span>
    </CardTitle>
  </CardHeader>
  <CardContent>
    <ChartContainer
      config={{
        marketFocus: {
          label: "Market Focus",
          color: "hsl(var(--chart-1))",
        },
        techIntegration: {
          label: "Tech Integration",
          color: "hsl(var(--chart-2))",
        },
        localExpertise: {
          label: "Local Expertise",
          color: "hsl(var(--chart-3))",
        },
      }}
    >
      <BarChart
        accessibilityLayer
        margin={{
          left: -4,
          right: -4,
        }}
        data={[
          {
            competitor: "Navyug Engineering Company",
            marketFocus: 3,
            techIntegration: 2,
            localExpertise: 4,
          },
          {
            competitor: "Integrated Marine Services (IMS)",
            marketFocus: 4,
            techIntegration: 3,
            localExpertise: 4,
          },
          {
            competitor: "SpillTech Environmental Solutions",
            marketFocus: 2,
            techIntegration: 2,
            localExpertise: 3,
          },
          {
            competitor: "Chemetex",
            marketFocus: 3,
            techIntegration: 3,
            localExpertise: 3,
          },
          {
            competitor: "Environmental Management and Consultants (EMC)",
            marketFocus: 4,
            techIntegration: 2,
            localExpertise: 3,
          },
          {
            competitor: "Saraswati Oil and Gas Services",
            marketFocus: 3,
            techIntegration: 2,
            localExpertise: 4,
          },
          {
            competitor: "Spill Control India Pvt. Ltd.",
            marketFocus: 2,
            techIntegration: 2,
            localExpertise: 3,
          },
          {
            competitor: "Green Technology Solutions",
            marketFocus: 3,
            techIntegration: 2,
            localExpertise: 2,
          },
          {
            competitor: "Enviro Care India",
            marketFocus: 4,
            techIntegration: 2,
            localExpertise: 4,
          },
          {
            competitor: "Maritime Energy & Oilfield Services (MEOS)",
            marketFocus: 4,
            techIntegration: 3,
            localExpertise: 4,
          },
          {
            competitor: "Oceans Environmental Services",
            marketFocus: 3,
            techIntegration: 2,
            localExpertise: 2,
          },
          {
            competitor: "EcoSpill Solutions Pvt. Ltd.",
            marketFocus: 3,
            techIntegration: 2,
            localExpertise: 4,
          },
        ]}
      >
        <Bar
          dataKey="marketFocus"
          fill="var(--color-marketFocus)"
          radius={5}
          fillOpacity={0.6}
          activeBar={<Rectangle fillOpacity={0.8} />}
        />
        <Bar
          dataKey="techIntegration"
          fill="var(--color-techIntegration)"
          radius={5}
          fillOpacity={0.6}
        />
        <Bar
          dataKey="localExpertise"
          fill="var(--color-localExpertise)"
          radius={5}
          fillOpacity={0.6}
        />
        <XAxis
          dataKey="competitor"
          tickLine={false}
          axisLine={false}
          tickMargin={4}
          interval={0}
          angle={-90}
          textAnchor="end"
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={4}
          label={{ value: "Rating (1-5)", angle: -90, position: "middle" }}
          domain={[1, 5]}
        />
        <ChartTooltip
          defaultIndex={0}
          content={
            <ChartTooltipContent
              hideIndicator
              labelFormatter={(value) => {
                return value;
              }}
            />
          }
          cursor={false}
        />
      </BarChart>
    </ChartContainer>
  </CardContent>
  <CardFooter className="flex-col items-start gap-1">
    <CardDescription>
      Competitor analysis based on key attributes: Market Focus, Tech Integration, and Local Expertise. 
      Ratings are on a scale of 1 to 5, with 5 being the highest.
    </CardDescription>
  </CardFooter>
</Card>


    </div>
  )
}
