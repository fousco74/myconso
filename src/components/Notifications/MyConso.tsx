import Image from "next/image";


      


export default function MyConso(){
  return (
    <div className="rounded-xl w-full md:w-52 h-48 md:py-2 md:h-60 border bg-notif2 flex flex-col p-2 md:p-4 relative">
      <div className="flex flex-col  items-center gap-2">
      <div className="flex justify-between">
                  <div className="flex gap-2">
                    <h2>Ma conso en chiffres</h2>
                    <Image
                      src="/icons/clock.svg"
                      alt="clock"
                      width={15}
                      height={15}
                    />
                  </div>
                </div>
        <span className="text-3xl md:text-4xl">-10%</span>
        <div className="text-xs md:text-[13px] text-center md:text-left mt-5">
                  <p>
                    Youpi ! votre consommation <br />
                    des 6 derniers mois a baissé !{" "}
                  </p>
                  <p>
                    Vous avez économisé <br />
                    92.350 FCFA.
                  </p>
        </div>
      </div>
    </div>
  )
}