"use client";

import { getHomeData, insertHomeData } from "@/app/actions/home/actions";
import CardHome from "@/components/card-home";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { HomeData } from "@/types/home-data";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { homeColumns } from "./columns";
import Link from "next/link";

export default function HomePage({
  goalLicensesType,
  licensesIssuedType,
  servicesPerformedType,
  animalsAttendType,
  userIsAdmin,
  initialHomeDataList,
}: HomeData & { userIsAdmin: boolean; initialHomeDataList: any[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [homeDataList, setHomeDataList] = useState<any[]>(
    initialHomeDataList || []
  );
  const isAdmin = userIsAdmin;

  const [goalLicenses, setGoalLicenses] = useState<number>(goalLicensesType);
  const [licensesIssued, setLicensesIssued] =
    useState<number>(licensesIssuedType);
  const [servicesPerformed, setServicesPerformed] = useState<number>(
    servicesPerformedType
  );
  const [animalsAttend, setAnimalsAttend] = useState<number>(animalsAttendType);

  const [originalValues, setOriginalValues] = useState({
    goalLicenses: goalLicensesType,
    licensesIssued: licensesIssuedType,
    servicesPerformed: servicesPerformedType,
    animalsAttend: animalsAttendType,
  });

  useEffect(() => {
    if (homeDataList.length > 0) {
      const last = homeDataList[0];
      const newGoalLicenses = last.goal_licenses ?? 0;
      const newLicensesIssued = last.licenses_issued ?? 0;
      const newServicesPerformed = last.services_performed ?? 0;
      const newAnimalsAttend = last.animals_attend ?? 0;

      setGoalLicenses(newGoalLicenses);
      setLicensesIssued(newLicensesIssued);
      setServicesPerformed(newServicesPerformed);
      setAnimalsAttend(newAnimalsAttend);

      setOriginalValues({
        goalLicenses: newGoalLicenses,
        licensesIssued: newLicensesIssued,
        servicesPerformed: newServicesPerformed,
        animalsAttend: newAnimalsAttend,
      });
    }
  }, [homeDataList]);

  const fetchData = async () => {
    try {
      const response = await getHomeData();
      if (response.success && response.data) {
        setHomeDataList(response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar metas:", error);
      toast.error(
        "Não foi possível carregar os dados. Tente novamente mais tarde."
      );
    }
  };

  const validateData = () => {
    if (goalLicenses == 0) {
      toast.error("Meta de licenças não pode ser 0.");
      return false;
    }
    if (
      goalLicenses < 0 ||
      licensesIssued < 0 ||
      servicesPerformed < 0 ||
      animalsAttend < 0
    ) {
      toast.error("Valores não podem ser menores que 0.");
      return false;
    }

    if (
      goalLicenses === 0 &&
      licensesIssued === 0 &&
      servicesPerformed === 0 &&
      animalsAttend === 0
    ) {
      toast.error("Pelo menos um dos valores deve ser maior que 0.");
      return false;
    }

    const last = homeDataList[0];
    if (
      last &&
      goalLicenses === (last.goal_licenses ?? 0) &&
      licensesIssued === (last.licenses_issued ?? 0) &&
      servicesPerformed === (last.services_performed ?? 0) &&
      animalsAttend === (last.animals_attend ?? 0)
    ) {
      toast.error("Nenhum valor foi alterado.");
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    setIsSubmitting(true);

    if (!validateData()) {
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await insertHomeData({
        goalLicensesType: goalLicenses,
        licensesIssuedType: licensesIssued,
        servicesPerformedType: servicesPerformed,
        animalsAttendType: animalsAttend,
      });

      if (response.success) {
        toast.success("Dados salvos com sucesso!");
        await fetchData();
      } else {
        toast.error(response.error || "Erro ao salvar dados.");
      }
    } catch (error) {
      toast.error("Erro ao salvar dados.");
      console.error("Erro detalhado:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetChanges = () => {
    setGoalLicenses(originalValues.goalLicenses);
    setLicensesIssued(originalValues.licensesIssued);
    setServicesPerformed(originalValues.servicesPerformed);
    setAnimalsAttend(originalValues.animalsAttend);
    toast.info("Alterações descartadas.");
  };

  const hasChanges = () => {
    console.log("ola");
    return (
      goalLicenses !== originalValues.goalLicenses ||
      licensesIssued !== originalValues.licensesIssued ||
      servicesPerformed !== originalValues.servicesPerformed ||
      animalsAttend !== originalValues.animalsAttend
    );
  };

  function groupByDay(data: any[]) {
    const grouped: Record<string, any> = {};
    data.forEach((item) => {
      const day = new Date(item.created_at).toLocaleDateString("pt-BR");
      if (
        !grouped[day] ||
        new Date(item.created_at) > new Date(grouped[day].created_at)
      ) {
        grouped[day] = item;
      }
    });
    return Object.values(grouped).sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  return (
    <div className="w-full px-5 pb-10 space-y-8">
      <div
        className="flex flex-col gap-4 mb-6 sm:flex-row sm:justify-between 
        sm:items-center"
      >
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl text-primary">
            Bem-vindo ao painel informativo
          </h1>
          <h3 className="font-light text-muted-foreground">
            Aqui você pode gerenciar e acompanhar seus dados.
          </h3>
        </div>
        <Button className="gap-2">
          <TrendingUp size={16} />
          <Link href={"/dashboard"} target="_blank">
            Dashboard
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Indicadores de desempenho</CardTitle>
          <CardDescription>
            Acompanhe e atualize os principais indicadores
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2">
            <CardHome
              title="Meta de licenças"
              value={goalLicenses}
              setValue={setGoalLicenses}
              disabled={!isAdmin}
            />
            <CardHome
              title="Licenças emitidas"
              value={licensesIssued}
              setValue={setLicensesIssued}
            />
            <CardHome
              title="Atendimentos realizados"
              value={servicesPerformed}
              setValue={setServicesPerformed}
            />
            <CardHome
              title="Animais silvestres atendidos"
              value={animalsAttend}
              setValue={setAnimalsAttend}
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            {hasChanges() && (
              <Button
                variant="outline"
                onClick={resetChanges}
                disabled={isSubmitting}
              >
                Descartar alterações
              </Button>
            )}
            <Button
              onClick={handleSave}
              disabled={isSubmitting || !hasChanges()}
            >
              {isSubmitting ? "Salvando..." : "Salvar alterações"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* <Card className="mt-8">
        <CardHeader>
          <CardTitle>Histórico de dados</CardTitle>
          <CardDescription>
            Registros agrupados por dia (mostra último registro de cada dia)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={homeColumns()}
            data={groupByDay(homeDataList).map((item) => ({
              createdAtType: new Date(item.created_at).toLocaleDateString(
                "pt-BR"
              ),
              goalLicensesType: item.goal_licenses,
              licensesIssuedType: item.licenses_issued,
              servicesPerformedType: item.services_performed,
              animalsAttendType: item.animals_attend,
            }))}
          />
        </CardContent>
      </Card> */}
    </div>
  );
}
