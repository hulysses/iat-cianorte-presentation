"use server";

import { UserFormData } from "@/hooks/users/useUsersForm";
import { createClient } from "@/utils/supabase/server";

export async function createUser(formData: UserFormData) {
  const supabase = await createClient();
  try {
    const { email, password, name, admin } = formData;

    if (!password) {
      return { success: false, error: "A senha é obrigatória." };
    }
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

export async function getUsers() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    console.error("Error fetching users:", error);
    return { success: false, error: "Erro ao buscar usuários." };
  }

  if (data.length === 0) {
    return { success: false, error: "Nenhum usuário encontrado." };
  }

  if (data) {
    data.forEach((user) => {
      user.is_admin = user.is_admin ? "Sim" : "Não";
    });
  }
  return { success: true, data };
}

export async function updateUser(formData: UserFormData,  id: string ) {
  const supabase = await createClient();
  try {
    const { password, name, admin } = formData;
    console.log("Form data:", formData);

    if (!id) {
      console.error("User ID is missing");
      return { success: false, error: "ID do usuário não informado." };
    }

    if (password) {
      const { error: authError } = await supabase.auth.admin.updateUserById(
        id,
        {
          password,
        }
      );

      if (authError) {
        console.error("Auth error:", authError);
        return { success: false, error: "Erro ao atualizar senha." };
      }
    }

    const { error: updateError } = await supabase
      .from("users")
      .update({ name, is_admin: admin })
      .eq("id", id);

    if (updateError) {
      console.error("DB error:", updateError);
      return { success: false, error: "Erro ao atualizar usuário." };
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, error: "Failed to update user" };
  }
}
