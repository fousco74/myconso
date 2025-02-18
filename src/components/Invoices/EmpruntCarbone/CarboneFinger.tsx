
import EmpruntCarbone from "@/components/Invoices/EmpruntCarbone/EmpruntCarbone"
import Image from "next/image";
import Link from "next/link";           

export default function carboneFinger(){
    return(
        <div className="w-72 h-28  flex justify-between  bg-white border rounded-lg">
                        <div className="flex flex-col py-2 px-4">
                          <Image
                            src="/icons/carbon-icon.svg"
                            alt="carbon-icon"
                            width={80}
                            height={80}
                            className="relative"
                          />
                          <div className="flex text-green  absolute bottom-10 ">
                            <span className="text-3xl font-extrabold">8.5</span>
                            <span className="text-lg self-end">co2</span>
                          </div>
                        </div>
        
                        <div className="flex flex-col  mt-1 space-y-1 text-midnightblue">
                          <EmpruntCarbone />
                          <div className="flex gap-1">
                            <p className="text-[12px]">
                              Bon ration, continuez ! <br />
                              Merci pour la Planète !
                            </p>
                            <Image
                              src="/icons/info.svg"
                              alt="emprunt-carbon-icone"
                              className="self-start"
                              width={10}
                              height={10}
                            />
                          </div>
                          <div className="mt-3">
                            <Link
                              href="#"
                              className="ml-10  opacity-75 underline text-[10px]"
                            >
                              En savoir plus +
                            </Link>
                          </div>
                        </div>
                      </div>
    )
}