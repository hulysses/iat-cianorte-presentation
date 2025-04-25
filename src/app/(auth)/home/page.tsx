"use client";

import { createGoal } from "@/app/actions/home/actions";
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
import { useState } from "react";
import { toast } from "sonner";

export default function Dashboard() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const response = await createGoal(data);

      if (response.success) {
        toast.success("Meta criada com sucesso!");
      } else {
        toast.error(response.error || "Erro ao adicionar meta.");
      }
    } catch (error) {
      console.error("Erro ao criar meta:", error);
      toast.error("Erro ao criar meta. Tente novamente mais tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full px-5">
      <div className="flex mb-6 justify-between items-center">
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
    </div>
  );
}
