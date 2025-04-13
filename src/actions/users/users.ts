"use server";

import { supabase } from "@/lib/supabase";
import { z } from "zod";

const userSchema = z.object({
  name: z
    .string()
    .nonempty("Nome é obrigatório")
    .min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().nonempty("E-mail é obrigatório").email("E-mail inválido"),
  password: z
    .string()
    .nonempty("Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
  admin: z.boolean(),
});

export async function createUser(formData: any) {
  try {
    const parsed = userSchema.safeParse(formData);

    if (!parsed.success) {
      console.error("Validation error:", parsed.error);
      return { success: false, error: "Dados inválidos" };
    }

    const { name, email, password, admin } = parsed.data;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Auth error:", error);
      return { success: false, error: "Erro ao cadastrar usuário." };
    }

    const { error: insertError } = await supabase.from("users").insert({
      id: data.user?.id,
      name,
      email,
      is_admin: admin,
    });

    if (insertError) {
      console.error("DB error:", insertError);
      return { success: false, error: "Erro ao salvar usuário no banco." };
    }

    return { success: true };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      success: false,
      error: "Erro inesperado ao processar a requisição.",
    };
  }
}
