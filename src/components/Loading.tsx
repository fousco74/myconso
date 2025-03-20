import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <div className="flex flex-col gap-2 text-midnightblue italic">
         <span className="font-semibold text-lg ">chargement en cours...</span>
          <span>patientez un instant !</span>
      </div>
      <div className="flex flex-col justify-center items-center">
        <Image src="/icons/spin.svg" alt="loading" width={200} height={200} className="animate-spin"/>
        <Image src="/icons/loading.svg" alt="logo" width={80} height={80} className="absolute" />
      </div>
      
    </div>
  );
}