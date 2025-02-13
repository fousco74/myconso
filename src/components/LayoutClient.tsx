"use client"; // Ce composant est côté client

import { usePathname } from "next/navigation";
import NavBar from "@/components/NavBar";
import profile from "@/../public/profile/kone.png";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  if (isLoginPage) return <>{children}</>;

  return (
    <div className="flex w-screen h-screen">
      <div className="flex pt-4 flex-col w-full mx-10">
        <NavBar profile={profile} />
        {children}
      </div>
    </div>
  );
}
