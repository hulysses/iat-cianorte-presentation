"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const userSchema = z.object({
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

export type UserFormData = z.infer<typeof userSchema>;

export function useUserForm() {
  return useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      admin: false,
    },
  });
}
