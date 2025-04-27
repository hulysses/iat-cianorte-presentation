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
    const { data, error } = await supabase
      .from("licenses_services")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching goal:", error);
      return { success: false, error: "Erro ao buscar meta." };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching goal:", error);
    return { success: false, error: "Erro ao buscar meta." };
  }
}
