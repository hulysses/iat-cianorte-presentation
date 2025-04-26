"use client";

import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "@/app/actions/users/actions";
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
import type { UserFormData } from "@/hooks/users/useUsersForm";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DataTable } from "../../../components/data-table";
import { userColumns } from "./columns";
import { User } from "@/types/users";
import UserDialog from "@/components/user-dialog";

export default function Users({ initialUsers = [] }: { initialUsers: User[] }) {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUserDelete, setSelectedUserDelete] = useState<User | null>(
    null
  );
  const filters = ["name", "email"];
  const filterLabels = { name: "nome", email: "e-mail" };

  const refreshUsers = async () => {
    const result = await getUsers();
    if (result.success && result.data) {
      setUsers(result.data);
    }
  };

  const onSubmit = async (data: UserFormData) => {
    setIsSubmitting(true);
    try {
      if (selectedUser) {
        const result = await updateUser(data, selectedUser.id);

        if (result.success) {
          setOpen(false);
          toast.success("Usuário atualizado com sucesso!");
          await refreshUsers();
        } else {
          toast.error(result.error || "Erro ao atualizar usuário.");
        }
      } else {
        const result = await createUser(data);

        if (result.success) {
          setOpen(false);
          toast.success("Usuário cadastrado com sucesso!");
          await refreshUsers();
        } else {
          toast.error(result.error || "Erro ao cadastrar usuário.");
        }
      }
    } catch (error) {
      toast.error(
        selectedUser
          ? "Erro ao atualizar usuário."
          : "Erro ao cadastrar usuário."
      );
      console.error(error);
    } finally {
      setIsSubmitting(false);
      setSelectedUser(null);
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    if (selectedUserDelete) {
      try {
        const result = await deleteUser(selectedUserDelete.id);
        if (result.success) {
          setOpenDelete(false);
          toast.success("Usuário excluído com sucesso!");
          await refreshUsers();
        } else {
          toast.error(result.error || "Erro ao excluir usuário.");
        }
      } catch (error) {
        toast.error("Erro ao excluir usuário.");
        console.error(error);
      } finally {
        setSelectedUserDelete(null);
        setIsSubmitting(false);
        setOpenDelete(false);
      }
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setOpen(true);
  };
  const handleDeleteUser = (user: User) => {
    setSelectedUserDelete(user);
    setOpenDelete(true);
  };

  return (
    <div className="w-full px-5">
      <div className="flex mb-6 justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl text-primary">
            Gerenciamento de usuários
          </h1>
          <h3 className="font-light text-muted-foreground">
            Gerencie seus usuários, podendo editar, excluir ou criar novos!
          </h3>
        </div>
        <Sheet
          open={open}
          onOpenChange={(newOpen) => {
            if (!newOpen) {
              setSelectedUser(null);
            }
            setOpen(newOpen);
          }}
        >
          <SheetTrigger asChild>
            <Button>Cadastrar usuário</Button>
          </SheetTrigger>
          <SheetContent className="max-w-[400px]">
            <SheetHeader>
              <SheetTitle>
                {selectedUser ? "Editar usuário" : "Cadastrar usuário"}
              </SheetTitle>
              <SheetDescription>
                {selectedUser
                  ? "Atualize os dados do usuário abaixo."
                  : "Preencha os dados abaixo para cadastrar um novo usuário."}
              </SheetDescription>
            </SheetHeader>
            <div className="p-4 h-full">
              <UserForm
                onSubmit={onSubmit}
                isSubmitting={isSubmitting}
                setOpen={setOpen}
                user={selectedUser}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <DataTable
        columns={userColumns({ handleEditUser, handleDeleteUser })}
        data={users}
        filters={filters}
        filterLabels={filterLabels}
      />

      <UserDialog
        handleDelete={handleDelete}
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        selectedUserDelete={selectedUserDelete}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
