"use server";

import { UserFormData } from "@/hooks/users/useUsersForm";
import { createClient } from "@/utils/supabase/server";

export async function createUser(formData: UserFormData) {
  const supabase = await createClient();

  try {
    const { email, password, name, admin } = formData;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      console.error("Auth error:", error);
      if (error.code === "user_already_exists") {
        return {
          success: false,
          error: "Já existe um usuário cadastrado com esse e-mail.",
        };
      }
      if (error.code === "invalid_credentials") {
        return { success: false, error: "E-mail ou senha inválidos." };
      }
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
