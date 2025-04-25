"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FormField from "@/components/form-field";
import Logo from "../../../assets/logo.png";
import LoginBackground from "../../../assets/login-background.png";
import { loginSchema, useLoginForm } from "@/hooks/login/useLoginForm";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { login } from "@/app/actions/login/actions";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useLoginForm();

  type FormData = z.infer<typeof loginSchema>;

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const result = await login(data);
      if (result.error) {
        reset();
        toast.error(result.error);
        return;
      }

      router.push("/home");
    } catch (error) {
      toast.error("Erro ao autenticar usuário.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <div
        className="hidden md:block w-[80%] rounded-3xl m-6"
        style={{
          backgroundImage: `url(${LoginBackground.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="w-full md:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-white">
        <div className="max-w-md w-full">
          <div className="flex gap-2">
            <div className="flex items-center justify-center">
              <Image
                src={Logo}
                alt="IAT CIANORTE Logo"
                width={60}
                height={60}
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              <span className="block">IAT CIANORTE </span>
              <span>PRESENTATION</span>
            </h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                id="name"
                label="E-mail"
                placeholder="Insira seu e-mail"
                {...register("email")}
                error={errors.email?.message}
              />
              <FormField
                id="password"
                label="Senha"
                placeholder="Insira sua senha"
                type="password"
                {...register("password")}
                error={errors.password?.message}
              />
              {/* <Link
                  href="/forgot-password"
                  className="text-sm text-green-600 hover:text-green-500"
                >
                  Esqueci a senha
                </Link> */}
            </div>

            <Button
              type="submit"
              className="w-full cursor-pointer"
              size={"lg"}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="text-xs text-center text-gray-400 mt-8">
            <Link href="https://www.linkedin.com/in/hulysses/" target="_blank">
              Desenvolvido por Hulysses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
