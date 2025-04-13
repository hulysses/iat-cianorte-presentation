"use client";

import { createUser } from "@/actions/users/users";
import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { userSchema, useUserForm } from "@/hooks/users/useUsersForm";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

export default function Users() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useUserForm();

  type FormData = z.infer<typeof userSchema>;

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const result = await createUser(data);

      if (result.success) {
        setOpen(false);
        reset();
        toast.success("Usuário cadastrado com sucesso!");
      } else {
        toast.error("Erro ao cadastrar usuário.");
        console.error(result.error);
      }
    } catch (error) {
      toast.error("Erro ao cadastrar usuário.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="bg-primary rounded-md text-white hover:text-white hover:bg-primary/90 cursor-pointer"
        >
          Cadastrar usuário
        </Button>
      </SheetTrigger>
      <SheetContent style={{ maxWidth: "400px" }}>
        <SheetHeader>
          <SheetTitle>Cadastrar usuário</SheetTitle>
          <SheetDescription>
            Preencha os dados abaixo para cadastrar um novo usuário.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
          <div className="px-4 flex flex-col gap-4 flex-grow ">
            <FormField
              id="name"
              label="Nome"
              placeholder="Insira o nome"
              {...register("name")}
              error={errors.name?.message}
            />
            <FormField
              id="email"
              label="E-mail"
              placeholder="Insira o e-mail"
              {...register("email")}
              error={errors.email?.message}
            />
            <FormField
              id="password"
              type="password"
              label="Senha"
              placeholder="Insira a senha"
              {...register("password")}
              error={errors.password?.message}
            />
            <FormField
              id="admin"
              type="select"
              label="Administrador?"
              value={watch("admin") ? "true" : "false"}
              onChange={(value) => setValue("admin", value === "true")}
              error={errors.admin?.message}
            />
          </div>
          <SheetFooter className="flex flex-row justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white cursor-pointer"
              onClick={() => {
                reset();
                setOpen(false);
              }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="cursor-pointer bg-primary text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
