"use server";

import { HomeData } from "@/types/home-data";
import { createClient } from "@/utils/supabase/server";

export async function insertHomeData(data: HomeData) {
  const supabase = await createClient();

  try {
    const { error } = await supabase.from("licenses_services").insert([
      {
        goal_licenses: data.goalLicensesType,
        licenses_issued: data.licensesIssuedType,
        services_performed: data.servicesPerformedType,
        animals_attend: data.animalsAttendType,
      },
    ]);

    if (error) {
      console.error("Error inserting home data:", error);
      return { success: false, error: "Erro ao salvar dados." };
    }

    return { success: true };
  } catch (error) {
    console.error("Error inserting home data:", error);
    return { success: false, error: "Erro ao salvar dados." };
  }
}

export async function getHomeData() {
  const supabase = await createClient();

  try {
    const { data: historyData, error: historyError } = await supabase
      .from("licenses_services")
      .select("*")
      .order("created_at", { ascending: false });

    if (historyError) {
      console.error("Erro ao buscar histórico:", historyError);
      return { success: false, error: "Erro ao buscar histórico." };
    }

    const { data: totalData, error: sumError } = await supabase
      .from("licenses_services")
      .select(
        `
        goal_licenses,
        licenses_issued,
        services_performed,
        animals_attend
      `
      );

    if (sumError) {
      console.error("Erro ao calcular soma:", sumError);
      return { success: false, error: "Erro ao calcular soma." };
    }

    const totals = totalData?.reduce(
      (acc, item) => ({
        goal_licenses: acc.goal_licenses + (item.goal_licenses ?? 0),
        licenses_issued: acc.licenses_issued + (item.licenses_issued ?? 0),
        services_performed:
          acc.services_performed + (item.services_performed ?? 0),
        animals_attend: acc.animals_attend + (item.animals_attend ?? 0),
      }),
      {
        goal_licenses: 0,
        licenses_issued: 0,
        services_performed: 0,
        animals_attend: 0,
      }
    );

    return {
      success: true,
      data: historyData,
      totals,
    };
  } catch (error) {
    console.error("Erro geral em getHomeData:", error);
    return { success: false, error: "Erro ao buscar dados." };
  }
}
