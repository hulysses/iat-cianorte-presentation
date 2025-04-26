"use client";

import { createGoal, getGoal } from "@/app/actions/home/actions";
import CardGoal from "@/components/card-goal";
import GoalDialog from "@/components/goal-dialog";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function HomePage({ goal }: { goal: number }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [goalNumber, setGoalNumber] = useState<number>(goal);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const response = await createGoal(data);

      if (response.success) {
        toast.success("Meta criada com sucesso!");
        const { data: goalData } = await getGoal();
        setGoalNumber(goalData?.[0]?.goal_number ?? 0);
      } else {
        toast.error(response.error || "Erro ao adicionar meta.");
      }
    } catch (error) {
      console.error("Erro ao criar meta:", error);
      toast.error("Erro ao criar meta. Tente novamente mais tarde.");
    } finally {
      setIsSubmitting(false);
      setOpen(false);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="w-full px-5">
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h1 className="font-bold text-2xl text-primary">
            Bem-vindo ao painel de controle
          </h1>
          <h3 className="font-light text-muted-foreground">
            Aqui você pode gerenciar e acompanhar seus dados.
          </h3>
        </div>

        <div className="flex gap-2">
          <GoalDialog
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
            open={open}
            setOpen={setOpen}
            goalNumber={goalNumber}
          />
          <Sheet>
            <SheetTrigger asChild>
              <Button>Adicionar dados</Button>
            </SheetTrigger>
            <SheetContent className="max-w-[400px]">
              <SheetHeader>
                <SheetTitle>Adicionar dados</SheetTitle>
                <SheetDescription>
                  Preencha os dados abaixo para adicionar novos registros.
                </SheetDescription>
              </SheetHeader>
              {/* <div className="p-4 h-full">
              <UserForm
                onSubmit={onSubmit}
                isSubmitting={isSubmitting}
                setOpen={setOpen}
                user={selectedUser}
              />
            </div> */}
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {goalNumber > 0 ? <CardGoal goalNumber={goalNumber} /> : ""}
    </div>
  );
}
