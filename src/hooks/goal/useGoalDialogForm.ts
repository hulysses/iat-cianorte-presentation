"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export type GoalDialogFormData = z.infer<typeof goalDialogSchema>;

export const goalDialogSchema = z.object({
  goal: z.string().min(1, { message: "A meta deve ser maior que 0" }),
});

export function useGoalDialogForm() {
  return useForm<GoalDialogFormData>({
    resolver: zodResolver(goalDialogSchema),
    defaultValues: {
      goal: "0",
    },
  });
}
