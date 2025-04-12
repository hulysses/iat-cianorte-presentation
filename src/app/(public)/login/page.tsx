"use client";

import Image from "next/image";
import LoginBackground from "../../../assets/login-background.png";
import Logo from "../../../assets/logo.png";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add authentication logic here
    console.log({ email, password });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
              <div>
                <label
                  htmlFor="email"
                  className="block text-base font-medium text-gray-700"
                >
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Insira seu e-mail"
                  className="mt-1 appearance-none w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:border-green-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="password"
                    className="block text-base font-medium text-gray-700"
                  >
                    Senha
                  </label>
                  {/* <Link
                    href="/forgot-password"
                    className="text-sm text-green-600 hover:text-green-500"
                  >
                    Esqueci a senha
                  </Link> */}
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Insira sua senha"
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:border-green-500"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                  >
                    {showPassword ? (
                      <IconEyeOff size={20} stroke={1.5} />
                    ) : (
                      <IconEye size={20} stroke={1.5} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-base font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer"
              >
                Entrar
              </button>
            </div>
          </form>

          <div className="text-xs text-center text-gray-400 mt-8">
            <a href="https://www.linkedin.com/in/hulysses/" target="_blank">
              Desenvolvido por Hulysses
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
