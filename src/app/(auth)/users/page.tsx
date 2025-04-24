"use client";

import { createUser } from "@/app/actions/users/actions";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import UserForm from "@/components/user-form";
import { UserFormData } from "@/hooks/users/useUsersForm";
import { useState } from "react";
import { toast } from "sonner";

export default function Users() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: UserFormData) => {
    setIsSubmitting(true);
    try {
      const result = await createUser(data);

      if (result.success) {
        setOpen(false);
        toast.success("Usuário cadastrado com sucesso!");
      } else {
        toast.error(result.error || "Erro ao cadastrar usuário.");
      }
    } catch (error) {
      toast.error("Erro ao cadastrar usuário.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button>Cadastrar usuário</Button>
        </SheetTrigger>
        <SheetContent className="max-w-[400px]">
          <SheetHeader>
            <SheetTitle>Cadastrar usuário</SheetTitle>
            <SheetDescription>
              Preencha os dados abaixo para cadastrar um novo usuário.
            </SheetDescription>
          </SheetHeader>
          <div className="px-4 flex flex-col gap-4 flex-grow ">
            <UserForm
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
              setOpen={setOpen}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
