"use client";

import {
  GoalDialogFormData,
  useGoalDialogForm,
} from "@/hooks/goal/useGoalDialogForm";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { DialogClose, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";

type GoalDialogFormProps = {
  onSubmit: (data: GoalDialogFormData) => void;
  isSubmitting: boolean;
};

export default function GoalDialogForm({
  onSubmit,
  isSubmitting,
}: GoalDialogFormProps) {
  const form = useGoalDialogForm();

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="goal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta</FormLabel>
              <FormControl>
                <Input type="number" min={0} placeholder="Informe a meta" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline" className="text-sm">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" className="text-sm">
            {isSubmitting ? "Adicionando..." : "Adicionar"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
