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
import { UserFormData, useUserForm } from "@/hooks/users/useUsersForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

type UserFormProps = {
  onSubmit: (data: UserFormData) => void;
  setOpen: (open: boolean) => void;
  isSubmitting: boolean;
};

export default function UserForm({
  onSubmit,
  setOpen,
  isSubmitting,
}: UserFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const form = useUserForm();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                <Input placeholder="Informe o e-mail" {...field} />
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
                {/* <Input
                  placeholder="Informe a senha"
                  type="password"
                  {...field}
                /> */}
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Informe a senha"
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
                  onValueChange={(value) => field.onChange(value === "true")}
                  value={String(field.value)}
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

        <SheetFooter className="flex flex-row justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white cursor-pointer"
            onClick={() => {
              form.reset();
              setOpen(false);
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </SheetFooter>
      </form>
    </Form>
  );
}
