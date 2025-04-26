"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const goalDialogSchema = z.object({
  goal: z.coerce.number({ invalid_type_error: "Informe um número válido" })
    .min(1, { message: "A meta deve ser maior do que 0" }),
});

export type GoalDialogFormData = z.infer<typeof goalDialogSchema>;

export function useGoalDialogForm() {
  return useForm<GoalDialogFormData>({
    resolver: zodResolver(goalDialogSchema),
    defaultValues: {
      goal: 0,
    },
  });
}
