"use client";

import { getHomeData, insertHomeData } from "@/app/actions/home/actions";
import CardHome from "@/components/card-home";
import { Button } from "@/components/ui/button";
import { HomeData } from "@/types/home-data";
import { useState } from "react";
import { toast } from "sonner";

export default function HomePage({
  goalLicensesType,
  licensesIssuedType,
  servicesPerformedType,
  animalsAttendType,
  userIsAdmin,
}: HomeData & { userIsAdmin: boolean }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [goalLicenses, setGoalLicenses] = useState<number>(goalLicensesType);
  const [licensesIssued, setLicensesIssued] =
    useState<number>(licensesIssuedType);
  const [servicesPerformed, setServicesPerformed] = useState<number>(
    servicesPerformedType
  );
  const [animalsAttend, setAnimalsAttend] = useState<number>(animalsAttendType);
  const isAdmin = userIsAdmin;

  const fetchData = async () => {
    try {
      const response = await getHomeData();

      if (response.success) {
        if (response.data) {
          const {
            goal_licenses,
            licenses_issued,
            services_performed,
            animals_attend,
          } = response.data[0];

          setGoalLicenses(goal_licenses ?? 0);
          setLicensesIssued(licenses_issued ?? 0);
          setServicesPerformed(services_performed ?? 0);
          setAnimalsAttend(animals_attend ?? 0);
        }
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
        return;
      }
      if (
        goalLicenses === 0 &&
        licensesIssued === 0 &&
        servicesPerformed === 0 &&
        animalsAttend === 0
      ) {
        toast.error("Valores não podem ser iguais a 0.");
        return;
      }
      if (
        goalLicenses == goalLicensesType &&
        licensesIssued == licensesIssuedType &&
        servicesPerformed == servicesPerformedType &&
        animalsAttend == animalsAttendType
      ) {
        toast.error("Nenhum valor foi alterado.");
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
        fetchData();
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
        <div>
          <h1 className="font-bold text-2xl text-primary">
            Bem-vindo ao painel informativo
          </h1>
          <h3 className="font-light text-muted-foreground">
            Aqui você pode gerenciar e acompanhar seus dados.
          </h3>
        </div>
        <Button onClick={handleSave} disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar"}
        </Button>
      </div>
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
    </div>
  );
}
