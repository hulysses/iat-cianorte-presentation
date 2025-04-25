"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { SheetFooter } from "./ui/sheet";
import { Button } from "./ui/button";
import { type UserFormData, useUserForm } from "@/hooks/users/useUsersForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useEffect, useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

type User = {
  id: string;
  name: string;
  email: string;
  is_admin: string;
};

type UserFormProps = {
  onSubmit: (data: UserFormData) => void;
  setOpen: (open: boolean) => void;
  isSubmitting: boolean;
  user?: User | null;
};

export default function UserForm({
  onSubmit,
  setOpen,
  isSubmitting,
  user,
}: UserFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const form = useUserForm(!!user);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        password: "",
        admin: user.is_admin === "Sim",
      });
    } else {
      form.reset({
        name: "",
        email: "",
        password: "",
        admin: false,
      });
    }
  }, [user, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-between h-full"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Informe o nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Informe o e-mail"
                    {...field}
                    disabled={user ? true : false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder={
                        user ? "Nova senha (opcional)" : "Informe a senha"
                      }
                      {...field}
                    />
                    <Button
                      type="button"
                      className="h-full absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer bg-transparent hover:bg-transparent"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <IconEyeOff size={20} stroke={1.5} />
                      ) : (
                        <IconEye size={20} stroke={1.5} />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="admin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Administrador?</FormLabel>
                <FormControl>
                  <Select
                    // Corrige o valor para aceitar boolean ou string
                    onValueChange={(value) => field.onChange(value === "true")}
                    // Garante que o valor seja sempre "true" ou "false" como string
                    value={
                      typeof field.value === "boolean"
                        ? String(field.value)
                        : field.value === "Sim"
                        ? "true"
                        : field.value === "Não"
                        ? "false"
                        : String(!!field.value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Sim</SelectItem>
                      <SelectItem value="false">Não</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <SheetFooter className="flex flex-row justify-end mt-4">
          <Button
            type="button"
            variant="outline"
            className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
            onClick={() => {
              form.reset();
              setOpen(false);
            }}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? user
                ? "Atualizando..."
                : "Cadastrando..."
              : user
              ? "Atualizar"
              : "Cadastrar"}
          </Button>
        </SheetFooter>
      </form>
    </Form>
  );
}
