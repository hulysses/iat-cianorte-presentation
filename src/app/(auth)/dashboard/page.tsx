"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  LabelList,
  Line,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", desktop: 200, mobile: 50 },
  { month: "February", desktop: 200, mobile: 350 },
  { month: "March", desktop: 200, mobile: 100 },
  { month: "April", desktop: 200, mobile: 130 },
  { month: "May", desktop: 200, mobile: 230 },
  { month: "June", desktop: 200, mobile: 300 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function Dashboard() {
  const year = new Date().getFullYear();
  return (
    <div className="p-5 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-5xl text-primary">IAT Cianorte</h1>
        <h2 className="font-semibold text-xl text-muted-foreground">
          Acompanhe as estatísticas de licenciamento e dos serviços prestados
          pelo IAT - ERCIA.
        </h2>
      </div>
      <div className="flex gap-4 max-w-lg">
        <Card className="w-full max-">
          <CardHeader>
            <CardTitle>Meta x Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ComposedChart data={chartData}>
                <CartesianGrid />
                <XAxis
                  dataKey="month"
                  className="w-full"
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis width={30} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="mobile" fill="#00bc7d" radius={[8, 8, 0, 0]}>
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
                <Line
                  dataKey="desktop"
                  type="monotone"
                  stroke="#156739"
                  strokeWidth={2}
                  dot={false}
                />
              </ComposedChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
