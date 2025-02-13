import Link from "next/link";

export default function invoice(){
    return (
        <div className="bg-invoice w-32 h-40 relative">
            <h1 className="text-[12px] absolute font-semibold text-midnightblue left-10 top-3">Nov-Déc</h1>
            <div className="text-center  text-midnightblue absolute left-6 bottom-16">
                <span className="text-xl">85.250</span>
                <span className="text-[8px]">FCFA</span>
            </div>
            <Link href="" className="text-[10px] text-green border-green border-b bottom-10 left-10 absolute">Voir plus +</Link>
        </div>
    )
}