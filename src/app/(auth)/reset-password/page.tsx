"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useTransition, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<{ type: string; content: string } | null>(null);
  const [Error, setError] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.substring(1); // Supprime le "#"
    const params = new URLSearchParams(hash);

    const hashError = params.get("error");
    console.log("accessToken :", hashError);
    if (hashError) {
      setError(true);
      setMessage({
        type: 'error',
        content: 'Lien de réinitialisation invalide ou expiré'
      })
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage({ type: 'error', content: 'Les mots de passe ne correspondent pas' });
      return;
    }

    startTransition(async () => {
       const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
      
      try {
        const { error } = await supabase.auth.updateUser({
          password,
        });

        if (error) throw error;

        setPassword("");
        setConfirmPassword("")

        setMessage({
          type: 'success',
          content: 'Mot de passe réinitialisé avec succès!'
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
        {!Error || message?.type === "success" ? (
          <>
            <h2 className="text-2xl font-bold ">Réinitialisation du mot de passe</h2>
            <h5 className="text-sm mt-4 text-gray-700">
              Veuillez entrer votre nouveau mot de passe ci-dessous.
            </h5>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold">Une erreur s&apos;est produite</h2>
               
              </>
            )}


          {message && (
            <div className={`mt-4 text-sm px-4 py-2 rounded-md ${
              message.type === 'error' 
                ? 'bg-red-100 border border-red-400 text-red-500' 
                : 'bg-green-100 border border-green-400 text-green-500'
            }`}>
              {message.content}
              
            </div>
          )}

            {message!.type === "error" && <Link href="/login">
              <span className="text-xs text-center block mt-4 opacity-85 cursor-pointer hover:underline">
                Retour à la connexion
              </span>
            </Link>
            }

         {!Error || message?.type=="success" &&  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <input
                type="password"
                name="password"
                placeholder="Nouveau mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-deepBlue text-midnightblue"
                required
              />
            </div>

            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmez le mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                  Réinitialisation...
                </span>
              ) : (
                "Réinitialiser le mot de passe"
              )}
            </button>

            <Link href="/login">
              <span className="text-xs text-center block mt-4 opacity-85 cursor-pointer hover:underline">
                Retour à la connexion
              </span>
            </Link>
          </form>}
        </div>
      </div>
    </div>
  );
}