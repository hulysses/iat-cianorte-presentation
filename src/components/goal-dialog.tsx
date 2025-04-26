"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import GoalDialogForm from "./goal-dialog-form";
import { GoalDialogFormData } from "@/hooks/goal/useGoalDialogForm";

type UserDialogProps = {
  onSubmit: (data: GoalDialogFormData) => void;
  isSubmitting: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  goalNumber: number;
};

export default function GoalDialog({
  onSubmit,
  isSubmitting,
  open,
  setOpen,
  goalNumber,
}: UserDialogProps) {
  const currentYear = new Date().getFullYear();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          {goalNumber > 0 ? "Nova meta" : "Adicionar meta"}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {goalNumber > 0 ? "Atualizar meta" : "Adicionar meta"}
          </DialogTitle>
          <DialogDescription>
            {goalNumber > 0
              ? "Atualize a meta de licenças para o ano de"
              : "Informe a meta de licenças para o ano de"}{" "}
            <span className="text-primary font-bold">{currentYear}</span>.
          </DialogDescription>
        </DialogHeader>
        <div>
          <GoalDialogForm isSubmitting={isSubmitting} onSubmit={onSubmit} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
