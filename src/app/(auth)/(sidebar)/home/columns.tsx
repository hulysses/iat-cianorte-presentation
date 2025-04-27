"use client";

import { Button } from "@/components/ui/button";
import { HomeData } from "@/types/home-data";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const homeColumns = (): ColumnDef<HomeData>[] => [
  {
    accessorKey: "createdAtType",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-white hover:bg-transparent hover:text-white !px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "goalLicensesType",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-white hover:bg-transparent hover:text-white !px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Meta de licenças
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "licensesIssuedType",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-white hover:bg-transparent hover:text-white !px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Licenças emitidas
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "servicesPerformedType",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-white hover:bg-transparent hover:text-white !px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Atendimentos realizados
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "animalsAttendType",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-white hover:bg-transparent hover:text-white !px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Animais silvestres atendidos
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
