"use client";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { InputHTMLAttributes, useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value?: any;
  onChange?: (value: any) => void;
  error?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">;

export default function FormField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  ...props
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col gap-1">
      <Label
        htmlFor={id}
        className={`block text-sm font-medium${error ? " text-red-500" : ""}`}
      >
        {label}
      </Label>
      {type === "password" ? (
        <div className="relative">
          <Input
            type={showPassword ? "text" : type}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...props}
            className={error ? "border-red-500" : ""}
          />
          <button
            type="button"
            aria-label="Mostrar ou ocultar senha"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <IconEyeOff size={20} stroke={1.5} />
            ) : (
              <IconEye size={20} stroke={1.5} />
            )}
          </button>
        </div>
      ) : type === "select" ? (
        <Select 
          value={value} 
          onValueChange={onChange}
        >
          <SelectTrigger className={error ? "border-red-500" : ""}>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="true">Sim</SelectItem>
              <SelectItem value="false">Não</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : (
        <Input
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props}
          className={error ? "border-red-500" : ""}
        />
      )}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
