"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CheckCircle, Users, Goal, Bird } from "lucide-react";
import { getHomeData } from "@/app/actions/home/actions";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [homeData, setHomeData] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getHomeData();
        if (response.success && response.data) {
          setHomeData(response.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  const latestData = homeData.length > 0 ? homeData[0] : null;
  const goalLicenses = latestData?.goal_licenses ?? 0;
  const licensesIssued = latestData?.licenses_issued ?? 0;
  const servicesPerformed = latestData?.services_performed ?? 0;
  const animalsAttend = latestData?.animals_attend ?? 0;

  const licenseCompletionRate =
    goalLicenses > 0 ? (licensesIssued / goalLicenses) * 100 : 0;

  const licenseComparisonData = [
    { name: "Licenças", meta: goalLicenses, realizado: licensesIssued },
  ];

  const servicesData = [
    { name: "Licenças emitidas", value: licensesIssued, color: "#00bc7d" },
    { name: "Atendimentos", value: servicesPerformed, color: "#3b82f6" },
    { name: "Animais atendidos", value: animalsAttend, color: "#f59e0b" },
  ];

  const progressData = [
    { name: "Concluído", value: licensesIssued, color: "#00bc7d" },
    {
      name: "Pendente",
      value: Math.max(0, goalLicenses - licensesIssued),
      color: "#d1d5db",
    },
  ];

  return (
    <div className="p-8 space-y-6 min-h-screen flex flex-col bg-gray-50">
      <div className="flex flex-col gap-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h1 className="font-bold text-5xl text-primary">
          Dashboard IAT Cianorte
        </h1>
        <h2 className="font-semibold text-2xl text-muted-foreground">
          Estatísticas de licenciamentos e serviços prestados pelo IAT - ERCIA
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-none">
        <Card className="!pt-0 overflow-hidden flex flex-col justify-between shadow-md border-2 border-gray-100 transition-all">
          <CardHeader className="bg-primary/10 py-6 flex items-center justify-between">
            <CardTitle className="text-3xl text-primary font-bold flex items-center gap-3">
              <Goal size={32} className="text-primary" />
              Meta de Licenças
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-5xl font-bold text-center py-4">
              {goalLicenses}
            </div>
            <p className="text-xl font-semibold text-muted-foreground text-center">
              Licenças planejadas
            </p>
          </CardContent>
        </Card>

        <Card className="!pt-0 overflow-hidden flex flex-col justify-between shadow-md border-2 border-gray-100 transition-all">
          <CardHeader className="bg-emerald-500/10 py-6 flex items-center justify-between">
            <CardTitle className="text-3xl text-emerald-600 font-bold flex items-center gap-3">
              <CheckCircle size={32} className="text-emerald-600" />
              Licenças Emitidas
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-center gap-4 py-4">
              <div className="text-5xl font-bold">{licensesIssued}</div>
              <div className="text-2xl text-emerald-600 font-bold px-3 py-1 bg-emerald-50 rounded-full">
                {licenseCompletionRate.toFixed(0)}%
              </div>
            </div>
            <p className="text-xl font-semibold text-muted-foreground text-center">
              {licenseCompletionRate >= 100
                ? "Meta atingida!"
                : `Faltam ${Math.max(
                    0,
                    goalLicenses - licensesIssued
                  )} licenças`}
            </p>
          </CardContent>
        </Card>

        <Card className="!pt-0 overflow-hidden flex flex-col justify-between shadow-md border-2 border-gray-100 transition-all">
          <CardHeader className="bg-blue-500/10 py-6 flex items-center justify-between">
            <CardTitle className="text-3xl text-blue-600 font-bold flex items-center gap-3">
              <Users size={32} className="text-blue-600" />
              Atendimentos
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-5xl font-bold text-center py-4">
              {servicesPerformed}
            </div>
            <p className="text-xl font-semibold text-muted-foreground text-center">
              Serviços prestados
            </p>
          </CardContent>
        </Card>

        <Card className="!pt-0 overflow-hidden flex flex-col justify-between shadow-md border-2 border-gray-100 transition-all">
          <CardHeader className="bg-amber-500/10 py-6 flex items-center justify-between">
            <CardTitle className="text-3xl text-amber-600 font-bold flex items-center gap-3">
              <Bird size={32} className="text-amber-600" />
              Animais Silvestres
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-5xl font-bold text-center py-4">
              {animalsAttend}
            </div>
            <p className="text-xl font-semibold text-muted-foreground text-center">
              Animais atendidos
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-grow">
        <Card className="!pt-0 overflow-hidden shadow-md border-2 border-gray-100">
          <CardHeader className="bg-gray-50 border-b border-gray-100">
            <CardTitle className="text-3xl font-bold">
              Comparativo de Licenças
            </CardTitle>
            <CardDescription className="text-xl font-semibold">
              Meta x Licenças emitidas
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 p-6">
            <div className="h-full min-h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={licenseComparisonData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e5e7eb"
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 18, fontWeight: 600 }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 16 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Bar
                    dataKey="meta"
                    name="Meta"
                    fill="#156739"
                    radius={[8, 8, 0, 0]}
                    barSize={100}
                  >
                    <LabelList
                      dataKey="meta"
                      position="top"
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        fill: "#156739",
                      }}
                      offset={10}
                    />
                  </Bar>
                  <Bar
                    dataKey="realizado"
                    name="Realizado"
                    fill="#00bc7d"
                    radius={[8, 8, 0, 0]}
                    barSize={100}
                  >
                    <LabelList
                      dataKey="realizado"
                      position="top"
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        fill: "#00bc7d",
                      }}
                      offset={10}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 border-t border-gray-100 p-4">
            <div className="flex gap-6 justify-center w-full">
              <div className="flex items-center gap-2">
                <div
                  className="w-5 h-5 rounded-md"
                  style={{ backgroundColor: "#156739" }}
                ></div>
                <span className="text-xl font-semibold">Meta</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-5 h-5 rounded-md"
                  style={{ backgroundColor: "#00bc7d" }}
                ></div>
                <span className="text-xl font-semibold">Realizado</span>
              </div>
            </div>
          </CardFooter>
        </Card>

        <Card className="!pt-0 overflow-hidden shadow-md border-2 border-gray-100">
          <CardHeader className="bg-gray-50 border-b border-gray-100">
            <CardTitle className="text-3xl font-bold">
              Distribuição de Serviços
            </CardTitle>
            <CardDescription className="text-xl font-semibold">
              Proporção entre os tipos de serviços
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 p-6">
            <div className="h-full min-h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <Pie
                    data={servicesData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={120}
                    innerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {servicesData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke="#fff"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 border-t border-gray-100 p-4">
            <div className="flex flex-wrap gap-6 justify-center w-full">
              {servicesData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-md"
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="text-xl font-semibold">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardFooter>
        </Card>
      </div>

      <Card className="!pt-0 overflow-hidden flex-none shadow-md border-2 border-gray-100">
        <CardHeader className="bg-gray-50 border-b border-gray-100">
          <CardTitle className="text-3xl font-bold">
            Progresso de Licenciamento
          </CardTitle>
          <CardDescription className="text-xl font-semibold">
            Progresso em relação à meta estabelecida
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-4">
            <div className="h-[min(350px,35vh)] w-[min(350px,35vh)]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={progressData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                    paddingAngle={4}
                  >
                    {progressData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke="#fff"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-7xl font-bold text-primary">
                {licenseCompletionRate.toFixed(0)}%
              </div>
              <div className="text-2xl font-semibold text-muted-foreground mt-2">
                concluído
              </div>
              <div className="flex gap-8 mt-8">
                {progressData.map((entry, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-md"
                      style={{ backgroundColor: entry.color }}
                    ></div>
                    <span className="text-xl font-semibold">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
