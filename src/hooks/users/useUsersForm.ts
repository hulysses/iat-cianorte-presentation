"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export type UserFormData = z.infer<typeof userSchema>;

export const userSchema = z.object({
  name: z
    .string()
    .nonempty("Nome é obrigatório")
    .min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().nonempty("E-mail é obrigatório").email("E-mail inválido"),
  password: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine(
      (password: string | undefined) => {
        if (password !== undefined) {
          return password.length >= 6;
        }
        return true;
      },
      {
        message: "Senha deve ter pelo menos 6 caracteres",
      }
    ),
  admin: z.boolean(),
});

export function useUserForm(isEdit = false) {
  return useForm<UserFormData>({
    resolver: zodResolver(
      isEdit
        ? userSchema
        : userSchema.refine(
            (data) => data.password !== undefined,
            {
              message: "Senha é obrigatória",
              path: ["password"],
            }
          )
    ),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      admin: false,
    },
  });
}
