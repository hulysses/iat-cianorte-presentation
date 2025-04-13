"use client";

import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import FormField from "@/components/FormField";
import Logo from "../../../assets/logo.png";
import LoginBackground from "../../../assets/login-background.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error logging in:", error.message);
      return;
    }

    if (data.user) {
      redirect("/users");
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

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <FormField
                id="name"
                label="Nome"
                placeholder="Insira seu nome"
                type="text"
              />
              <FormField
                id="password"
                label="Senha"
                placeholder="Insira sua senha"
                type="password"
              />
              {/* <Link
                  href="/forgot-password"
                  className="text-sm text-green-600 hover:text-green-500"
                >
                  Esqueci a senha
                </Link> */}
            </div>

            <Button type="submit" className="w-full cursor-pointer" size={"lg"}>
              Entrar
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
