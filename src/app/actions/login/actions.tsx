"use server";

import { loginSchema } from "@/hooks/login/useLoginForm";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

type FormData = z.infer<typeof loginSchema>;

export async function login(formData: FormData) {
  const supabase = await createClient();

  try {
    const { email, password } = formData;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error?.code == "invalid_credentials") {
      return { error: "Credenciais inválidas." };
    }

    if (!error) {
      return {
        success: true,
      };
    }

    return {
      success: false,
      error: "Erro ao autenticar usuário.",
    };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      success: false,
      error: "Erro inesperado ao processar a requisição.",
    };
  }
}
