"use client";

import { itemProps } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Button(props: itemProps) {
  const router = useRouter();

  const navigateTo = () => {
    if (props.url) {
      router.push(props.url);
    }
  };

  return (
    <button
      onClick={navigateTo}
      className={`flex rounded-xl text-white justify-center items-center bg-bluegradient py-2 ${
        props.width || "md:w-[254px]"
      }`}
      aria-label={props.name}
    >
      <div className="flex gap-3">
        <span>{props.name ?? "Bouton"}</span>
        {props.icon && (
          <Image
            src={`/icons/${props.icon}.svg`}
            width={20}
            height={20}
            alt={`${props.name || "icon"} icon`}
          />
        )}
      </div>
    </button>
  );
}
