"use client";

import { getCurrentUser } from "@/app/actions/users/actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/types/users";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

type UserColumns = {
  handleEditUser: (user: User) => void;
  handleDeleteUser: (user: User) => void;
  isAdmin?: boolean;
};
const currentUser = await getCurrentUser();

export const userColumns = ({
  handleEditUser,
  handleDeleteUser,
  isAdmin,
}: UserColumns): ColumnDef<User>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-white hover:bg-transparent hover:text-white !px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-white hover:bg-transparent hover:text-white !px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          E-mail
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "is_admin",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-white hover:bg-transparent hover:text-white !px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Admistrator
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    header: ({}) => {
      return <p className="text-base font-semibold text-white">Ações</p>;
    },
    cell: ({ row }) => {
      const user = row.original;
      const email = currentUser?.data?.user?.email;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            disabled={!isAdmin || email === "iatcianortepresentation@gmail.com"}
          >
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-transparent"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEditUser(user)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDeleteUser(user)}>
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
