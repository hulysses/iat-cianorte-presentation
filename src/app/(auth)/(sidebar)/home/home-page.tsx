"use client";

import { getHomeData, insertHomeData } from "@/app/actions/home/actions";
import CardHome from "@/components/card-home";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
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

  useEffect(() => {
    if (homeDataList.length > 0) {
      const last = homeDataList[0];
      setGoalLicenses(last.goal_licenses ?? 0);
      setLicensesIssued(last.licenses_issued ?? 0);
      setServicesPerformed(last.services_performed ?? 0);
      setAnimalsAttend(last.animals_attend ?? 0);
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
    }
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      if (
        goalLicenses < 0 ||
        licensesIssued < 0 ||
        servicesPerformed < 0 ||
        animalsAttend < 0
      ) {
        toast.error("Valores não podem ser menores que 0.");
        setIsSubmitting(false);
        return;
      }
      if (
        goalLicenses === 0 &&
        licensesIssued === 0 &&
        servicesPerformed === 0 &&
        animalsAttend === 0
      ) {
        toast.error("Valores não podem ser iguais a 0.");
        setIsSubmitting(false);
        return;
      }

      const last = homeDataList[0];
      if (
        last &&
        goalLicenses == (last.goal_licenses ?? 0) &&
        licensesIssued == (last.licenses_issued ?? 0) &&
        servicesPerformed == (last.services_performed ?? 0) &&
        animalsAttend == (last.animals_attend ?? 0)
      ) {
        toast.error("Nenhum valor foi alterado.");
        setIsSubmitting(false);
        return;
      }

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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full px-5">
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
        <Button>
          <Link href={"/dashboard"} target="_blank">
            Dashboard
          </Link>
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <div className="grid gap-4 lg:grid-cols-4">
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
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar alterações"}
          </Button>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="font-bold text-xl text-primary">Histórico de dados</h2>
        <DataTable
          columns={homeColumns()}
          data={homeDataList.map((item) => ({
            createdAtType: new Date(item.created_at).toLocaleDateString(
              "pt-BR"
            ),
            goalLicensesType: item.goal_licenses,
            licensesIssuedType: item.licenses_issued,
            servicesPerformedType: item.services_performed,
            animalsAttendType: item.animals_attend,
          }))}
        />
      </div>
    </div>
  );
}
