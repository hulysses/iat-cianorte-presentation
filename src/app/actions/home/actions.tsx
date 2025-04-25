"use server";

import { GoalDialogFormData } from "@/hooks/goal/useGoalDialogForm";
import { createClient } from "@/utils/supabase/server";

export async function createGoal(formData: GoalDialogFormData) {
  const supabase = await createClient();
  try {
    const { goal } = formData;

    const { data, error } = await supabase.from("goals").insert({
      goal_number: Number(goal),
      year: new Date().getFullYear(),
    });
    if (error) {
      console.error("Insert goal error", error);
      
      return {
        success: false,
        error: "Erro ao adicionar meta.",
      };
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

// export async function getUsers() {
//   const supabase = await createClient();
//   const { data, error } = await supabase.from("users").select("*");

//   if (error) {
//     console.error("Error fetching users:", error);
//     return { success: false, error: "Erro ao buscar usuários." };
//   }

//   if (data.length === 0) {
//     return { success: false, error: "Nenhum usuário encontrado." };
//   }

//   if (data) {
//     data.forEach((user) => {
//       user.is_admin = user.is_admin ? "Sim" : "Não";
//     });
//   }
//   return { success: true, data };
// }

// export async function updateUser(formData: UserFormData, id: string) {
//   const supabase = await createClient();
//   try {
//     const { password, name, admin } = formData;

//     if (!id) {
//       console.error("User ID is missing");
//       return { success: false, error: "ID do usuário não informado." };
//     }

//     if (password) {
//       const { error: authError } = await supabase.auth.admin.updateUserById(
//         id,
//         {
//           password,
//         }
//       );

//       if (authError) {
//         console.error("Auth error:", authError);
//         return { success: false, error: "Erro ao atualizar senha." };
//       }
//     }

//     const { error: updateError } = await supabase
//       .from("users")
//       .update({ name, is_admin: admin })
//       .eq("id", id);

//     if (updateError) {
//       console.error("DB error:", updateError);
//       return { success: false, error: "Erro ao atualizar usuário." };
//     }

//     return { success: true };
//   } catch (error) {
//     console.error("Error updating user:", error);
//     return { success: false, error: "Failed to update user" };
//   }
// }

// export async function deleteUser(id: string) {
//   const supabase = await createClient();
//   try {
//     if (!id) {
//       console.error("User ID is missing");
//       return { success: false, error: "ID do usuário não informado." };
//     }

//     const { error } = await supabase.from("users").delete().eq("id", id);

//     if (error) {
//       console.error("DB error:", error);
//       return { success: false, error: "Erro ao deletar usuário." };
//     }

//     return { success: true };
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     return { success: false, error: "Erro ao deletar usuário." };
//   }
