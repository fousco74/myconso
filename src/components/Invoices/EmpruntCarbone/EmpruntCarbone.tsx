import Image from "next/image";

export default function carbon(){
    return(
        <div className="flex w-full gap-1 text-midnightblue">
            <h3 className=" font-semibold text-base">
                Empreinte Carbone
            </h3>
            <Image
                src="/icons/empreinte-carbone.svg"
                alt="empreinte-carbone-icon"
                width={15}
                height={15}
             />
        </div>
    )
}