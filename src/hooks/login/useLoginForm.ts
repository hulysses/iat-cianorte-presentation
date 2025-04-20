import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const loginSchema = z.object({
  email: z.string().nonempty("E-mail é obrigatório").email("E-mail inválido"),
  password: z.string().nonempty("Senha é obrigatória"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export function useLoginForm() {
  return useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
}
