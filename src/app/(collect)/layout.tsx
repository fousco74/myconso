"use server";

import { createClient } from "@/app/utils/supabase/server";
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";

export default async function AuthChecker({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const email = data?.user?.email;

  if (!email) {
    console.log("User email not found");
    redirect("/login");
    return null; // Empêche le rendu du contenu
  }

  const userData = await prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      role: true,
      client: true,
    },
  });

  if (error || !data?.user) {
    console.log(error);
    redirect("/login");
    return null;
  }

  if (userData?.role?.nom === "admin" || userData?.role?.nom === "viewer") {
    redirect("/admin/dashboard");
    return null;
  }

  return children;
}
