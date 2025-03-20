"use client";

import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";

export default function ForgotPassword() {
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<{ type: string; content: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    startTransition(async () => {
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });

        if (error) throw error;

        setMessage({
          type: 'success',
          content: 'Un lien de réinitialisation a été envoyé à votre adresse email.'
        });
      } catch (error) {
        setMessage({
          type: 'error',
          content: error instanceof Error ? error.message : 'Une erreur est survenue'
        });
      }
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
          <h2 className="text-2xl font-bold">Réinitialisation du mot de passe</h2>
          <h5 className="text-sm mt-4">Entrez votre email pour recevoir le lien de réinitialisation</h5>

          {message && (
            <div className={`mt-4 text-sm px-4 py-2 rounded-md ${
              message.type === 'error' 
                ? 'bg-red-100 border border-red-400 text-red-500' 
                : 'bg-green-100 border border-green-400 text-green-500'
            }`}>
              {message.content}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-deepBlue text-midnightblue"
                required
              />
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
                  Envoi en cours...
                </span>
              ) : (
                "Envoyer le lien"
              )}
            </button>

            <Link href="/login">
              <span className="text-xs text-center block mt-4 opacity-85 cursor-pointer hover:underline">
                Retour à la connexion
              </span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}