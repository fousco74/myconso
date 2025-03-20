"use client";

import Image from "next/image";
import { login } from "./action";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";

export default function Login() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      const form = new FormData();
      form.append("email", formData.email);
      form.append("password", formData.password);
      login(form);
    });
  };

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row p-0 m-0">
      {/* Section Gauche */}
      <div className="lg:w-1/2 flex flex-col items-center justify-center text-center p-6 lg:p-16 relative">
        <Image src="/logo/logo.svg" alt="logo" width={200} height={200} className="mb-4" />
        <span className="text-deepBlue text-sm md:text-base">
          L&apos;énergie en toute transparence à portée de clic.<br />
          Prenez le contrôle de votre consommation, un kWh à la fois.
        </span>
        <Image
          src="/icons/Union.svg"
          alt="decoration"
          width={500}
          height={500}
          className="hidden lg:block absolute bottom-10 right-[-20px]"
        />
      </div>

      {/* Section Droite (Formulaire) */}
      <div className="lg:w-1/2 flex items-center justify-center text-center flex-col text-white px-6 py-10 bg-connexion">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold">Connexion</h2>
          <h5 className="text-sm mt-4">Bon retour ! Connectez-vous pour accéder à votre Dashboard.</h5>

          {error && (
            <div className="mt-4 text-red-500 text-sm bg-red-100 border border-red-400 px-4 py-2 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-deepBlue text-midnightblue"
                required
              />
            </div>

            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-deepBlue text-midnightblue"
                required
              />
             <Link href="/forgot-password">
             <span className="text-xs text-right block mt-2 opacity-85 cursor-pointer hover:underline">
                Mot de passe oublié ?
              </span></Link>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 rounded bg-white text-deepBlue flex items-center justify-center font-semibold"
              disabled={isPending}
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-deepBlue"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Connexion en cours...
                </span>
              ) : (
                "Se connecter"
              )}
            </button>

            <Link href="/register">
              <span className="text-xs text-center block mt-4 opacity-85 cursor-pointer hover:underline">
                Je n&apos;ai pas de compte, inscris-toi !
              </span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
