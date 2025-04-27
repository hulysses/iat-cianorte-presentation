"use server";

import { UserFormData } from "@/hooks/users/useUsersForm";
import { createClient } from "@/utils/supabase/server";

export async function createUser(formData: UserFormData) {
  const supabase = await createClient(true);
  try {
    const { email, password, name, admin } = formData;

    if (!password) {
      return { success: false, error: "A senha é obrigatória." };
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email_confirm: true,
      email,
      password,
    });
    if (error) {
      console.error("Auth error:", error);
      if (error.code === "email_exists") {
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

    console.log("User created:", data);

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

export async function updateUser(formData: UserFormData, id: string) {
  const supabase = await createClient(true);
  try {
    const { password, name, admin } = formData;

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

export async function deleteUser(id: string) {
  const supabase = await createClient(true);
  try {
    if (!id) {
      console.error("User ID is missing");
      return { success: false, error: "ID do usuário não informado." };
    }

    const { error } = await supabase.from("users").delete().eq("id", id);
    const { error: authError } = await supabase.auth.admin.deleteUser(id);

    if (error) {
      console.error("DB error:", error);
      return { success: false, error: "Erro ao deletar usuário." };
    }
    if (authError) {
      console.error("Auth error:", authError);
      return { success: false, error: "Erro ao deletar usuário." };
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: "Erro ao deletar usuário." };
  }
}

export async function userIsAdmin() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error("Error fetching user:", error);
      return { success: false, error: "Erro ao buscar usuário." };
    }

    if (data.user) {
      const { data: dataUser, error: errorUser } = await supabase
        .from("users")
        .select("is_admin")
        .eq("id", data.user.id)
        .single();

      if (errorUser) {
        console.error("Error fetching user data:", errorUser);
        return { success: false, error: "Erro ao buscar dados do usuário." };
      }
      return { success: dataUser.is_admin, data: dataUser };
    }
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: "Usuário não encontrado." };
  }
}
